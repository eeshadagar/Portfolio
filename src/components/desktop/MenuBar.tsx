import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Battery, Search, Wifi } from 'lucide-react';
import { profile } from '../../data/profile';

function AppleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
      <path d="M17.05 12.54c-.02-2.4 1.96-3.55 2.05-3.61-1.12-1.63-2.86-1.86-3.48-1.88-1.48-.15-2.89.87-3.64.87s-1.91-.85-3.14-.83c-1.61.02-3.1.94-3.93 2.38-1.68 2.91-.43 7.22 1.2 9.58.8 1.16 1.75 2.45 3 2.4 1.21-.05 1.67-.78 3.13-.78s1.87.78 3.15.75c1.3-.02 2.12-1.17 2.92-2.33.92-1.34 1.3-2.64 1.32-2.7-.03-.01-2.53-.97-2.56-3.85M14.7 5.05c.66-.8 1.11-1.92.99-3.03-.95.04-2.11.63-2.8 1.43-.61.71-1.15 1.85-1.01 2.94 1.06.08 2.15-.54 2.82-1.34" />
    </svg>
  );
}

type Props = {
  frontAppName: string;
  onOpenSpotlight: () => void;
};

export default function MenuBar({ frontAppName, onOpenSpotlight }: Props) {
  const [now, setNow] = useState(() => new Date());
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const date = now.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  const menuItem =
    'rounded px-2 py-0.5 transition hover:bg-navy/10 focus:outline-none focus-visible:bg-navy/10';

  return (
    <header className="fixed inset-x-0 top-0 z-[110] flex h-7 items-center justify-between border-b border-paper/25 bg-paper/45 px-3 text-[13px] font-medium text-navy backdrop-blur-2xl backdrop-saturate-150">
      <div className="flex items-center gap-1" ref={menuRef}>
        <div className="relative">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            className={menuItem}
          >
            <AppleMark />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.14 }}
                className="absolute left-0 top-8 w-60 overflow-hidden rounded-lg border border-paper/50 bg-paper/85 p-1 shadow-window backdrop-blur-2xl"
              >
                <p className="px-3 py-1.5 text-xs text-graphite">{profile.availability}</p>
                <div className="my-1 h-px bg-navy/10" />
                <a
                  href={profile.resumePdf}
                  download
                  className="block rounded px-3 py-1.5 text-[13px] hover:bg-slate hover:text-paper"
                >
                  Download résumé…
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="block rounded px-3 py-1.5 text-[13px] hover:bg-slate hover:text-paper"
                >
                  Send an email…
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded px-3 py-1.5 text-[13px] hover:bg-slate hover:text-paper"
                >
                  GitHub
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <span className="px-2 font-semibold">{frontAppName}</span>
        <span className="hidden px-1 text-navy/70 sm:inline">File</span>
        <span className="hidden px-1 text-navy/70 sm:inline">Edit</span>
        <span className="hidden px-1 text-navy/70 sm:inline">View</span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSpotlight}
          aria-label="Search (Command K)"
          title="Search  ⌘K"
          className={menuItem}
        >
          <Search className="h-3.5 w-3.5" />
        </button>
        <Wifi className="h-3.5 w-3.5" aria-hidden="true" />
        <Battery className="h-4 w-4" aria-hidden="true" />
        <span className="hidden tabular-nums sm:inline">{date}</span>
        <time dateTime={now.toISOString()} className="tabular-nums">
          {time}
        </time>
      </div>
    </header>
  );
}
