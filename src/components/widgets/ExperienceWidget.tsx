import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Pause, Play, SkipForward } from 'lucide-react';
import Widget from './Widget';
import { experience } from '../../data/profile';

const TICK = 120;
const STEP = 0.55; // ≈ 22s per role

/**
 * Work history presented as a player. Auto-advance pauses on hover so a slow
 * reader doesn't lose the role they were on — and there's no fake volume
 * slider or like button, because nothing here plays audio.
 */
export default function ExperienceWidget() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const role = experience[index];
  const running = playing && !hovered;

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setProgress((p) => Math.min(p + STEP, 100)), TICK);
    return () => clearInterval(id);
  }, [running, index]);

  // Advance in response to progress completing — not from inside setProgress.
  useEffect(() => {
    if (progress < 100) return;
    setIndex((i) => (i + 1) % experience.length);
    setProgress(0);
  }, [progress]);

  const next = () => {
    setIndex((i) => (i + 1) % experience.length);
    setProgress(0);
  };

  return (
    <Widget
      delay={3}
      className="p-4"
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocusCapture={() => setHovered(true)}
        onBlurCapture={() => setHovered(false)}
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-navy">Experience</h2>
          <span className="text-[10px] font-medium uppercase tracking-wide text-stone">
            {index + 1} / {experience.length}
          </span>
        </div>

        <div className="relative h-[92px]" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="truncate text-[15px] font-bold leading-tight text-navy">
                {role.title}
              </h3>
              <p className="text-xs font-medium text-slate">{role.company}</p>
              <p className="mb-2 text-[11px] text-stone">
                {role.period} · {role.type}
              </p>
              <div className="flex flex-wrap gap-1">
                {role.skills.slice(0, 4).map((s) => (
                  <span
                    key={s}
                    className="rounded-md bg-navy/8 px-1.5 py-0.5 text-[10px] font-medium text-slate"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div
          className="mb-2 mt-3 h-[3px] overflow-hidden rounded-full bg-navy/10"
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Time until next role"
        >
          <div
            className="h-full rounded-full bg-slate transition-[width] duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? 'Pause auto-advance' : 'Resume auto-advance'}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-paper text-navy shadow transition hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate"
          >
            {playing ? <Pause className="h-3 w-3" /> : <Play className="ml-0.5 h-3 w-3" />}
          </button>
          <button
            onClick={next}
            aria-label="Next role"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-paper/70 text-navy transition hover:scale-110 hover:bg-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-slate"
          >
            <SkipForward className="h-3 w-3" />
          </button>
        </div>
      </div>
    </Widget>
  );
}
