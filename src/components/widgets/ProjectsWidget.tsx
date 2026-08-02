import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import Widget from './Widget';
import { featuredProjects } from '../../data/projects';

/** Auto-advancing project carousel. Pauses on hover and supports arrow keys. */
export default function ProjectsWidget({ onOpen }: { onOpen: () => void }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const count = featuredProjects.length;
  const project = featuredProjects[index];

  const go = useCallback(
    (delta: number) => {
      setDirection(delta);
      setIndex((i) => (i + delta + count) % count);
    },
    [count]
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(1), 5000);
    return () => clearInterval(id);
  }, [paused, go]);

  return (
    <Widget
      delay={2}
      className="overflow-hidden"
    >
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <header className="flex items-center justify-between px-4 pb-2 pt-3.5">
          <h2 className="text-sm font-semibold text-navy">Featured work</h2>
          <button
            onClick={onOpen}
            className="rounded px-1.5 py-0.5 text-xs font-medium text-graphite transition hover:bg-navy/5 hover:text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-slate"
          >
            See all {count > 0 && `(${count})`}
          </button>
        </header>

        <div
          tabIndex={0}
          role="group"
          aria-roledescription="carousel"
          aria-label={`Project ${index + 1} of ${count}: ${project.title}`}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
            if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
          }}
          className="relative mx-3 h-40 overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-slate"
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={project.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={`absolute inset-0 bg-gradient-to-br ${project.accent}`}
            >
              <div className="flex h-full flex-col justify-end p-4">
                <span className="mb-1 w-fit rounded-full bg-navy/25 px-2 py-0.5 text-[10px] font-medium text-paper backdrop-blur-sm">
                  {project.dateLabel}
                </span>
                <h3 className="text-base font-bold leading-tight text-paper drop-shadow-sm">
                  {project.title}
                </h3>
                <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-paper/85">
                  {project.blurb}
                </p>

                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex w-fit items-center gap-1 rounded-full bg-paper/95 px-2.5 py-1 text-[11px] font-semibold text-navy transition hover:bg-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-paper"
                  >
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    Live demo
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={() => go(-1)}
            aria-label="Previous project"
            className="absolute left-1.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-navy/25 text-paper opacity-0 backdrop-blur-sm transition hover:bg-navy/45 focus:opacity-100 focus:outline-none group-hover:opacity-100 [div:hover>&]:opacity-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next project"
            className="absolute right-1.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-navy/25 text-paper opacity-0 backdrop-blur-sm transition hover:bg-navy/45 focus:opacity-100 focus:outline-none [div:hover>&]:opacity-100"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-1.5 py-3">
          {featuredProjects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
              aria-label={`Show ${p.title}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-slate ${
                i === index ? 'w-5 bg-slate' : 'w-1.5 bg-navy/25 hover:bg-navy/45'
              }`}
            />
          ))}
        </div>
      </div>
    </Widget>
  );
}
