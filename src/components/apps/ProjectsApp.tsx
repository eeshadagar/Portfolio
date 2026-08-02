import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { projects, projectStats } from '../../data/projects';
import { profile } from '../../data/profile';

export default function ProjectsApp() {
  const [filter, setFilter] = useState<string>('All');

  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    projects.forEach((p) => p.tech.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)));
    return ['All', ...Array.from(counts.entries()).filter(([, n]) => n > 1).sort((a, b) => b[1] - a[1]).map(([t]) => t)];
  }, []);

  const visible = filter === 'All' ? projects : projects.filter((p) => p.tech.includes(filter));

  return (
    <div className="p-7">
      <header className="mb-5">
        <h1 className="text-2xl font-bold text-navy">Projects</h1>
        <p className="mt-1 text-sm text-graphite">
          {projectStats.total} projects · {projectStats.live} with live demos ·{' '}
          {projectStats.technologies} technologies
        </p>
      </header>

      {/* Filter chips */}
      <div className="mb-6 flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            aria-pressed={filter === tag}
            className={`rounded-full px-3 py-1 text-xs font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate ${
              filter === tag
                ? 'bg-slate text-paper'
                : 'border border-paper/70 bg-paper/60 text-slate hover:bg-paper'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {visible.map((project, i) => (
          <motion.article
            key={project.id}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="flex flex-col overflow-hidden rounded-2xl border border-paper/60 bg-paper/60 shadow-sm transition hover:shadow-lg"
          >
            <div className={`flex h-24 items-end bg-gradient-to-br ${project.accent} p-4`}>
              <h2 className="text-lg font-bold text-paper drop-shadow-sm">{project.title}</h2>
            </div>

            <div className="flex flex-1 flex-col p-4">
              <p className="text-xs font-medium text-stone">{project.dateLabel}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate">{project.description}</p>

              <ul className="mt-3 space-y-1.5">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-2 text-xs leading-relaxed text-slate">
                    <span aria-hidden="true" className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-stone" />
                    {h}
                  </li>
                ))}
              </ul>

              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
                {project.tech.map((t) => (
                  <li
                    key={t}
                    className="rounded-md border border-paper/70 bg-paper/80 px-1.5 py-0.5 text-[11px] font-medium text-slate"
                  >
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex gap-2 pt-4">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-slate px-3 py-1.5 text-xs font-semibold text-paper transition hover:bg-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-slate"
                  >
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    Live demo
                  </a>
                )}
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-navy/15 bg-paper/70 px-3 py-1.5 text-xs font-semibold text-navy transition hover:bg-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-slate"
                  >
                    <Github className="h-3.5 w-3.5" aria-hidden="true" />
                    Source
                  </a>
                ) : (
                  <span className="inline-flex items-center rounded-lg border border-dashed border-navy/20 px-3 py-1.5 text-xs text-stone">
                    Repo coming soon
                  </span>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-7 rounded-2xl border border-paper/60 bg-paper/50 p-6 text-center">
        <h2 className="text-lg font-bold text-navy">More on GitHub</h2>
        <p className="mb-4 mt-1 text-sm text-slate">Experiments, coursework and things in progress.</p>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-slate px-5 py-2 text-sm font-semibold text-paper transition hover:bg-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-slate"
        >
          <Github className="h-4 w-4" aria-hidden="true" />
          @eeshadagar
        </a>
      </div>
    </div>
  );
}
