import { motion } from 'framer-motion';
import Widget from './Widget';
import { useLeetCode } from '../../hooks/useLeetCode';
import { difficultyMeta } from '../../data/leetcode';

const R = 34;
const CIRCUMFERENCE = 2 * Math.PI * R;

/**
 * LeetCode progress. The ring segments are proportional to solved counts per
 * difficulty, using LeetCode's own colours so the mapping reads instantly.
 */
export default function LeetCodeWidget({ onOpen }: { onOpen: () => void }) {
  const { stats, source, loading } = useLeetCode();

  const segments = [
    { ...difficultyMeta[0], solved: stats.easySolved },
    { ...difficultyMeta[1], solved: stats.mediumSolved },
    { ...difficultyMeta[2], solved: stats.hardSolved },
  ];

  // Segment lengths are shares of solved problems, not of the whole catalogue —
  // 32 of 4013 would otherwise render as an invisible sliver.
  const solvedTotal = Math.max(stats.totalSolved, 1);
  let offsetAccumulator = 0;

  return (
    <Widget onClick={onOpen} label="Open LeetCode stats" delay={1} className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-navy">
            <svg viewBox="0 0 48 48" className="h-4 w-4">
              <path
                d="M28.5 8.5l-13.7 14.7a5.6 5.6 0 000 7.6l9.6 10.3a5.1 5.1 0 007.3.2l4.4-4.2"
                stroke="#8AA5C0"
                strokeWidth="4.5"
                strokeLinecap="round"
                fill="none"
              />
              <path d="M20 27h17.5" stroke="white" strokeWidth="4.5" strokeLinecap="round" />
            </svg>
          </span>
          <h2 className="text-sm font-semibold text-navy">LeetCode</h2>
        </div>

        <span
          className="flex items-center gap-1.5 text-[10px] font-medium text-stone"
          title={
            source === 'live'
              ? 'Fetched live just now'
              : source === 'cache'
                ? `Synced ${stats.updatedAt}`
                : 'Showing bundled snapshot'
          }
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              loading
                ? 'animate-pulse bg-mist'
                : source === 'snapshot'
                  ? 'bg-stone'
                  : 'bg-slate'
            }`}
          />
          {loading ? 'Syncing' : source === 'live' ? 'Live' : 'Synced'}
        </span>
      </div>

      <div className="flex items-center gap-5">
        {/* Progress ring */}
        <div className="relative flex-shrink-0">
          <svg width="86" height="86" viewBox="0 0 86 86" role="img" aria-label={`${stats.totalSolved} problems solved`}>
            <circle cx="43" cy="43" r={R} fill="none" stroke="rgba(11,21,51,0.09)" strokeWidth="8" />

            {segments.map((seg) => {
              const fraction = seg.solved / solvedTotal;
              const length = fraction * CIRCUMFERENCE;
              const dashOffset = -offsetAccumulator;
              offsetAccumulator += length;

              return (
                <motion.circle
                  key={seg.key}
                  cx="43"
                  cy="43"
                  r={R}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth="8"
                  strokeLinecap="round"
                  transform="rotate(-90 43 43)"
                  initial={{ strokeDasharray: `0 ${CIRCUMFERENCE}` }}
                  animate={{ strokeDasharray: `${Math.max(length - 3, 0)} ${CIRCUMFERENCE}` }}
                  style={{ strokeDashoffset: dashOffset }}
                  transition={{ duration: 0.9, ease: 'easeOut', delay: 0.3 }}
                />
              );
            })}
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold leading-none text-navy tabular-nums">
              {stats.totalSolved}
            </span>
            <span className="text-[10px] text-stone">solved</span>
          </div>
        </div>

        {/* Difficulty breakdown */}
        <dl className="min-w-0 flex-1 space-y-2">
          {segments.map((seg) => {
            const total =
              seg.key === 'easy'
                ? stats.totalEasy
                : seg.key === 'medium'
                  ? stats.totalMedium
                  : stats.totalHard;

            return (
              <div key={seg.key}>
                <div className="flex items-baseline justify-between text-xs">
                  {/* Colour lives in the swatch, not the label. The palette's
                      lightest blue on a light panel is ~2.3:1 — fine as a solid
                      block, unreadable as 12px text. */}
                  <dt className="flex items-center gap-1.5 font-medium text-navy">
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 flex-shrink-0 rounded-sm"
                      style={{ backgroundColor: seg.color }}
                    />
                    {seg.label}
                  </dt>
                  <dd className="tabular-nums text-graphite">
                    <span className="font-semibold text-navy">{seg.solved}</span>
                    <span className="text-stone">/{total}</span>
                  </dd>
                </div>
                <div className="mt-1 h-1 overflow-hidden rounded-full bg-navy/8">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: seg.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((seg.solved / total) * 100 * 12, 100)}%` }}
                    transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                  />
                </div>
              </div>
            );
          })}
        </dl>
      </div>

      <p className="mt-4 border-t border-navy/8 pt-3 text-[11px] text-stone">
        Rank <span className="font-semibold text-slate tabular-nums">{stats.ranking.toLocaleString('en-IN')}</span>
        {stats.maxStreak > 0 && <> · Max streak {stats.maxStreak}d</>}
      </p>
    </Widget>
  );
}
