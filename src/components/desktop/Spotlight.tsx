import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CornerDownLeft, Search } from 'lucide-react';
import AppIcon from './AppIcon';
import { apps, type AppId } from '../../lib/apps';
import { projects } from '../../data/projects';
import { notes } from '../../data/notes';

type Result =
  | { kind: 'app'; id: AppId; label: string; icon: string; tint: string; sub: string }
  | { kind: 'link'; label: string; sub: string; href: string };

type Props = {
  open: boolean;
  onClose: () => void;
  onOpenApp: (id: AppId) => void;
};

/**
 * ⌘K search over apps, projects and notes.
 * A nice touch on its own, and genuinely the fastest way to reach anything here.
 */
export default function Spotlight({ open, onClose, onOpenApp }: Props) {
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      setCursor(0);
      // Wait a frame so the input exists before focusing.
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const results = useMemo<Result[]>(() => {
    const q = query.trim().toLowerCase();

    const appResults: Result[] = apps
      .filter((a) => !q || a.label.toLowerCase().includes(q))
      .map((a) => ({ kind: 'app', id: a.id, label: a.label, icon: a.icon, tint: a.tint, sub: 'Application' }));

    if (!q) return appResults;

    const projectResults: Result[] = projects
      .filter((p) => p.title.toLowerCase().includes(q) || p.tech.some((t) => t.toLowerCase().includes(q)))
      .map((p) => ({
        kind: 'link' as const,
        label: p.title,
        sub: `Project · ${p.tech.slice(0, 3).join(', ')}`,
        href: p.demo ?? p.github ?? '#',
      }));

    const noteResults: Result[] = notes
      .filter((n) => n.title.toLowerCase().includes(q) || n.preview.toLowerCase().includes(q))
      .map((n) => ({ kind: 'link' as const, label: n.title, sub: `Note · ${n.tag}`, href: '#notes' }));

    return [...appResults, ...projectResults, ...noteResults].slice(0, 8);
  }, [query]);

  const run = (r: Result) => {
    if (r.kind === 'app') onOpenApp(r.id);
    else if (r.href === '#notes') onOpenApp('notes');
    else if (r.href !== '#') window.open(r.href, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === 'Enter' && results[cursor]) {
      e.preventDefault();
      run(results[cursor]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
          className="fixed inset-0 z-[200] flex items-start justify-center bg-navy/25 px-4 pt-[18vh] backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.96, y: -8 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: -8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            role="dialog"
            aria-label="Search"
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-paper/50 bg-paper/85 shadow-window backdrop-blur-2xl"
          >
            <div className="flex items-center gap-3 border-b border-navy/10 px-4">
              <Search className="h-5 w-5 flex-shrink-0 text-stone" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setCursor(0);
                }}
                onKeyDown={onKeyDown}
                placeholder="Search apps, projects, notes…"
                aria-label="Search"
                className="w-full bg-transparent py-4 text-lg text-navy placeholder:text-stone focus:outline-none"
              />
            </div>

            {results.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-stone">No results for “{query}”</p>
            ) : (
              <ul className="max-h-80 overflow-y-auto p-2 scrollbar-mac">
                {results.map((r, i) => (
                  <li key={`${r.kind}-${r.label}`}>
                    <button
                      onClick={() => run(r)}
                      onMouseEnter={() => setCursor(i)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition ${
                        i === cursor ? 'bg-slate text-paper' : 'text-navy hover:bg-navy/5'
                      }`}
                    >
                      {r.kind === 'app' ? (
                        <span
                          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${r.tint}`}
                        >
                          <AppIcon name={r.icon} className="h-5 w-5" />
                        </span>
                      ) : (
                        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-paper">
                          <Search className="h-4 w-4 text-graphite" aria-hidden="true" />
                        </span>
                      )}

                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">{r.label}</span>
                        <span
                          className={`block truncate text-xs ${
                            i === cursor ? 'text-paper/70' : 'text-stone'
                          }`}
                        >
                          {r.sub}
                        </span>
                      </span>

                      {i === cursor && <CornerDownLeft className="h-4 w-4 opacity-60" aria-hidden="true" />}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
