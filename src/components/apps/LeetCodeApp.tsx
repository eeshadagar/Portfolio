import { motion } from 'framer-motion';
import { ExternalLink, Flame, RefreshCw, Trophy } from 'lucide-react';
import { useLeetCode } from '../../hooks/useLeetCode';
import { difficultyMeta } from '../../data/leetcode';
import { profile } from '../../data/profile';

export default function LeetCodeApp() {
  const { stats, source, loading } = useLeetCode();

  const rows = [
    { ...difficultyMeta[0], solved: stats.easySolved, total: stats.totalEasy },
    { ...difficultyMeta[1], solved: stats.mediumSolved, total: stats.totalMedium },
    { ...difficultyMeta[2], solved: stats.hardSolved, total: stats.totalHard },
  ];

  const overall = (stats.totalSolved / stats.totalQuestions) * 100;

  return (
    <div className="p-7">
      <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-navy">
            LeetCode
            <span className="rounded-md bg-navy px-2 py-0.5 text-xs font-medium text-[#8AA5C0]">
              @{stats.username}
            </span>
          </h1>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-graphite">
            <RefreshCw
              className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`}
              aria-hidden="true"
            />
            {loading
              ? 'Syncing…'
              : source === 'live'
                ? 'Fetched live'
                : source === 'cache'
                  ? `Synced ${stats.updatedAt}`
                  : `Snapshot from ${stats.updatedAt}`}
          </p>
        </div>

        <a
          href={profile.leetcode}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-navy px-3 py-2 text-xs font-semibold text-paper transition hover:bg-slate focus:outline-none focus-visible:ring-2 focus-visible:ring-slate"
        >
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          Open profile
        </a>
      </header>

      {/* Headline numbers */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Solved', value: stats.totalSolved.toString(), icon: null },
          { label: 'Global rank', value: stats.ranking.toLocaleString('en-IN'), icon: Trophy },
          { label: 'Max streak', value: `${stats.maxStreak}d`, icon: Flame },
          { label: 'Active days', value: stats.activeDays.toString(), icon: null },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-xl border border-paper/60 bg-paper/60 p-4"
          >
            <p className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-wide text-stone">
              {s.icon && <s.icon className="h-3 w-3" aria-hidden="true" />}
              {s.label}
            </p>
            <p className="mt-1 text-2xl font-bold tabular-nums text-navy">{s.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Difficulty breakdown */}
      <section className="mb-6 rounded-2xl border border-paper/60 bg-paper/60 p-5">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wide text-graphite">By difficulty</h2>
          <span className="text-xs tabular-nums text-stone">
            {stats.totalSolved} of {stats.totalQuestions.toLocaleString()} ({overall.toFixed(1)}%)
          </span>
        </div>

        <div className="space-y-4">
          {rows.map((row, i) => (
            <div key={row.key}>
              <div className="mb-1.5 flex items-baseline justify-between text-sm">
                {/* Swatch carries the colour; the label stays navy so it's legible. */}
                <span className="flex items-center gap-2 font-semibold text-navy">
                  <span
                    aria-hidden="true"
                    className="h-2.5 w-2.5 rounded-sm"
                    style={{ backgroundColor: row.color }}
                  />
                  {row.label}
                </span>
                <span className="tabular-nums text-graphite">
                  <span className="font-bold text-navy">{row.solved}</span> / {row.total}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-navy/8">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: row.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(row.solved / row.total) * 100}%` }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.1, ease: 'easeOut' }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Recent */}
        <section className="rounded-2xl border border-paper/60 bg-paper/60 p-5">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-graphite">
            Recently solved
          </h2>
          {stats.recentSolved.length === 0 ? (
            <p className="text-sm text-stone">Nothing recent to show.</p>
          ) : (
            <ul className="space-y-2">
              {stats.recentSolved.map((s) => (
                <li key={s.title} className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="min-w-0 truncate text-navy">{s.title}</span>
                  <span className="flex-shrink-0 text-xs text-stone">{s.when}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Languages and tags */}
        <section className="rounded-2xl border border-paper/60 bg-paper/60 p-5">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-graphite">Languages</h2>
          <ul className="mb-5 space-y-2">
            {stats.languages.map((l) => (
              <li key={l.name} className="flex items-baseline justify-between text-sm">
                <span className="text-navy">{l.name}</span>
                <span className="tabular-nums text-xs text-stone">{l.solved} solved</span>
              </li>
            ))}
          </ul>

          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-graphite">Topics</h2>
          <div className="flex flex-wrap gap-1.5">
            {stats.skills.map((s) => (
              <span
                key={s.name}
                className="rounded-lg border border-paper/70 bg-paper/80 px-2 py-1 text-xs font-medium text-slate"
              >
                {s.name}
                <span className="ml-1 text-stone">×{s.count}</span>
              </span>
            ))}
          </div>
        </section>
      </div>

      <p className="mt-6 text-center text-xs text-stone">
        Stats refresh nightly via GitHub Actions, with a live fetch on load.
      </p>
    </div>
  );
}
