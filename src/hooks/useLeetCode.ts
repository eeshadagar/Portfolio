import { useEffect, useState } from 'react';
import { leetcodeSnapshot, type LeetCodeStats } from '../data/leetcode';

export type LeetCodeSource = 'cache' | 'live' | 'snapshot';

export type LeetCodeResult = {
  stats: LeetCodeStats;
  source: LeetCodeSource;
  loading: boolean;
};

/** Public proxies. Both are free-tier and go down; that's why there are two. */
const LIVE_ENDPOINTS = [
  `https://leetcode-stats-api.herokuapp.com/${leetcodeSnapshot.username}`,
  `https://alfa-leetcode-api.onrender.com/userProfile/${leetcodeSnapshot.username}`,
];

const TIMEOUT_MS = 6000;

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

function num(v: unknown, fallback: number): number {
  return typeof v === 'number' && Number.isFinite(v) ? v : fallback;
}

/**
 * Both proxies return roughly the same shape with slightly different key names,
 * so normalise defensively and fall back field-by-field. A partial response
 * still improves on the snapshot.
 */
function normalise(raw: unknown, base: LeetCodeStats): LeetCodeStats | null {
  if (!isRecord(raw)) return null;
  if (raw.status === 'error') return null;

  const totalSolved = num(raw.totalSolved, NaN);
  if (!Number.isFinite(totalSolved)) return null;

  return {
    ...base,
    totalSolved,
    totalQuestions: num(raw.totalQuestions, base.totalQuestions),
    easySolved: num(raw.easySolved, base.easySolved),
    totalEasy: num(raw.totalEasy, base.totalEasy),
    mediumSolved: num(raw.mediumSolved, base.mediumSolved),
    totalMedium: num(raw.totalMedium, base.totalMedium),
    hardSolved: num(raw.hardSolved, base.hardSolved),
    totalHard: num(raw.totalHard, base.totalHard),
    ranking: num(raw.ranking, base.ranking),
    updatedAt: new Date().toISOString().slice(0, 10),
  };
}

async function fetchJson(url: string): Promise<unknown> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Three-tier strategy, in order of how fast each can paint:
 *
 *   1. `/leetcode.json` — refreshed nightly by GitHub Actions, same origin,
 *      so it resolves in milliseconds with no CORS involved.
 *   2. A public proxy API, raced in the background to catch same-day solves.
 *   3. The bundled snapshot, which is already on screen from the first render.
 *
 * The widget therefore never shows a spinner-of-death or an empty state.
 */
export function useLeetCode(): LeetCodeResult {
  const [stats, setStats] = useState<LeetCodeStats>(leetcodeSnapshot);
  const [source, setSource] = useState<LeetCodeSource>('snapshot');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      // Tier 1 — the nightly cache.
      try {
        const cached = await fetchJson(`${import.meta.env.BASE_URL}leetcode.json`);
        if (!cancelled) {
          const merged = normalise(cached, leetcodeSnapshot);
          if (merged) {
            setStats({ ...merged, updatedAt: (cached as LeetCodeStats).updatedAt ?? merged.updatedAt });
            setSource('cache');
          }
        }
      } catch {
        /* No cache committed yet — the snapshot is still on screen. */
      }

      // Tier 2 — live, best effort.
      for (const url of LIVE_ENDPOINTS) {
        if (cancelled) return;
        try {
          const live = await fetchJson(url);
          const merged = normalise(live, leetcodeSnapshot);
          if (merged && !cancelled) {
            setStats(merged);
            setSource('live');
            break;
          }
        } catch {
          /* Try the next endpoint. */
        }
      }

      if (!cancelled) setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { stats, source, loading };
}
