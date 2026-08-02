/**
 * LeetCode types and the cached snapshot.
 *
 * LeetCode has no official public API and its GraphQL endpoint blocks
 * cross-origin browser requests, so a static site can't query it directly.
 * The strategy here is:
 *
 *   1. `scripts/fetch-leetcode.mjs` runs nightly in GitHub Actions and writes
 *      `public/leetcode.json` — server-side, so no CORS problem.
 *   2. At runtime `useLeetCode` loads that file instantly, then tries a public
 *      proxy API in the background to catch same-day solves.
 *   3. If both fail, the snapshot below still renders. The widget never breaks.
 */

export type LeetCodeStats = {
  username: string;
  ranking: number;
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  submissionsLastYear: number;
  activeDays: number;
  maxStreak: number;
  /** ISO date string of when this data was captured. */
  updatedAt: string;
  recentSolved: { title: string; when: string }[];
  languages: { name: string; solved: number }[];
  skills: { name: string; count: number }[];
};

/** Captured from the profile on 2 Aug 2026. Only ever used as a last resort. */
export const leetcodeSnapshot: LeetCodeStats = {
  username: 'eeshadagar',
  ranking: 3419405,
  totalSolved: 32,
  totalQuestions: 4013,
  easySolved: 22,
  totalEasy: 958,
  mediumSolved: 8,
  totalMedium: 2095,
  hardSolved: 2,
  totalHard: 960,
  submissionsLastYear: 20,
  activeDays: 6,
  maxStreak: 2,
  updatedAt: '2026-08-02',
  recentSolved: [
    { title: 'Two Sum', when: '2 months ago' },
    { title: 'Climbing Stairs', when: '5 months ago' },
    { title: 'Single Number', when: '5 months ago' },
    { title: 'Find All Numbers Disappeared in an Array', when: '6 months ago' },
    { title: 'Missing Number', when: '6 months ago' },
  ],
  languages: [
    { name: 'Python3', solved: 32 },
    { name: 'Python', solved: 1 },
  ],
  skills: [
    { name: 'Backtracking', count: 2 },
    { name: 'Quickselect', count: 1 },
  ],
};

export const difficultyMeta = [
  { key: 'easy', label: 'Easy', color: '#8AA5C0' },
  { key: 'medium', label: 'Medium', color: '#425870' },
  { key: 'hard', label: 'Hard', color: '#032032' },
] as const;
