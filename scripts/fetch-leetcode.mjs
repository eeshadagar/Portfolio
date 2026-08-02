#!/usr/bin/env node
/**
 * Fetches LeetCode stats and writes public/leetcode.json.
 *
 * Runs in GitHub Actions, i.e. server-side — which is the whole point. LeetCode's
 * GraphQL endpoint refuses cross-origin browser requests, but has no problem with
 * a plain server request. Committing the result means the site loads stats from
 * its own origin, instantly, with no third-party uptime risk at page load.
 *
 *   npm run leetcode
 */

import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const USERNAME = process.env.LEETCODE_USERNAME ?? 'eeshadagar';
const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '../public/leetcode.json');

const QUERY = `
  query userProfile($username: String!) {
    allQuestionsCount { difficulty count }
    matchedUser(username: $username) {
      username
      profile { ranking }
      submitStats {
        acSubmissionNum { difficulty count }
      }
      languageProblemCount { languageName problemsSolved }
      tagProblemCounts {
        advanced { tagName problemsSolved }
        intermediate { tagName problemsSolved }
        fundamental { tagName problemsSolved }
      }
    }
    recentAcSubmissionList(username: $username, limit: 5) {
      title
      timestamp
    }
  }
`;

function relativeTime(unixSeconds) {
  const diff = Date.now() / 1000 - Number(unixSeconds);
  const days = Math.floor(diff / 86400);
  if (days < 1) return 'today';
  if (days < 2) return 'yesterday';
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years > 1 ? 's' : ''} ago`;
}

const pick = (list, difficulty) => list.find((d) => d.difficulty === difficulty)?.count ?? 0;

async function main() {
  const res = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Referer: `https://leetcode.com/u/${USERNAME}/`,
      'User-Agent': 'Mozilla/5.0 (portfolio-stats-sync)',
    },
    body: JSON.stringify({ query: QUERY, variables: { username: USERNAME } }),
  });

  if (!res.ok) throw new Error(`LeetCode responded ${res.status}`);

  const { data, errors } = await res.json();
  if (errors?.length) throw new Error(errors.map((e) => e.message).join('; '));
  if (!data?.matchedUser) throw new Error(`No such user: ${USERNAME}`);

  const { matchedUser, allQuestionsCount, recentAcSubmissionList } = data;
  const solved = matchedUser.submitStats.acSubmissionNum;

  const tags = [
    ...(matchedUser.tagProblemCounts?.advanced ?? []),
    ...(matchedUser.tagProblemCounts?.intermediate ?? []),
    ...(matchedUser.tagProblemCounts?.fundamental ?? []),
  ]
    .filter((t) => t.problemsSolved > 0)
    .sort((a, b) => b.problemsSolved - a.problemsSolved)
    .slice(0, 6)
    .map((t) => ({ name: t.tagName, count: t.problemsSolved }));

  const payload = {
    username: matchedUser.username,
    ranking: matchedUser.profile?.ranking ?? 0,
    totalSolved: pick(solved, 'All'),
    totalQuestions: pick(allQuestionsCount, 'All'),
    easySolved: pick(solved, 'Easy'),
    totalEasy: pick(allQuestionsCount, 'Easy'),
    mediumSolved: pick(solved, 'Medium'),
    totalMedium: pick(allQuestionsCount, 'Medium'),
    hardSolved: pick(solved, 'Hard'),
    totalHard: pick(allQuestionsCount, 'Hard'),
    // These two aren't exposed by this query; the widget keeps its previous
    // values for them rather than showing zeros.
    submissionsLastYear: 0,
    activeDays: 0,
    maxStreak: 0,
    updatedAt: new Date().toISOString().slice(0, 10),
    recentSolved: (recentAcSubmissionList ?? []).map((s) => ({
      title: s.title,
      when: relativeTime(s.timestamp),
    })),
    languages: (matchedUser.languageProblemCount ?? [])
      .sort((a, b) => b.problemsSolved - a.problemsSolved)
      .slice(0, 5)
      .map((l) => ({ name: l.languageName, solved: l.problemsSolved })),
    skills: tags,
  };

  await mkdir(dirname(OUT), { recursive: true });
  await writeFile(OUT, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');

  console.log(`✓ ${payload.totalSolved} solved · rank ${payload.ranking.toLocaleString()}`);
  console.log(`  written to ${OUT}`);
}

main().catch((err) => {
  console.error(`✗ ${err.message}`);
  // Exit 0 on purpose: a transient LeetCode failure shouldn't fail the build.
  // The previously committed JSON stays in place and the site keeps working.
  process.exit(0);
});
