import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, Search } from 'lucide-react';
import { notesByDate, type Note } from '../../data/notes';

export default function NotesApp() {
  const [selected, setSelected] = useState<Note | null>(null);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notesByDate;
    return notesByDate.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.preview.toLowerCase().includes(q) ||
        n.tag.toLowerCase().includes(q) ||
        n.sections.some((s) => s.body.toLowerCase().includes(q))
    );
  }, [query]);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  if (selected) {
    return (
      <motion.article
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        className="mx-auto max-w-2xl p-8"
      >
        <button
          onClick={() => setSelected(null)}
          className="mb-6 inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-medium text-slate transition hover:bg-navy/5 hover:text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-slate"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All notes
        </button>

        <span className="mb-3 inline-block rounded-md bg-mist/30 px-2 py-0.5 text-xs font-semibold text-slate">
          {selected.tag}
        </span>

        <h1 className="text-3xl font-bold leading-tight text-navy">{selected.title}</h1>
        <p className="mb-8 mt-2 text-sm text-stone">
          <time dateTime={selected.date}>{formatDate(selected.date)}</time> · {selected.readingTime}
        </p>

        <div className="space-y-6">
          {selected.sections.map((section, i) => (
            <section key={i}>
              {section.heading && (
                <h2 className="mb-2 text-lg font-semibold text-navy">{section.heading}</h2>
              )}
              <p className="leading-relaxed text-slate">{section.body}</p>
            </section>
          ))}
        </div>
      </motion.article>
    );
  }

  return (
    <div className="p-7">
      <header className="mb-5">
        <h1 className="text-2xl font-bold text-navy">Notes</h1>
        <p className="mt-1 text-sm text-graphite">
          Things I learned the hard way, mostly.
        </p>
      </header>

      <div className="relative mb-5">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search notes"
          aria-label="Search notes"
          className="w-full rounded-xl border border-paper/70 bg-paper/70 py-2.5 pl-9 pr-3 text-sm text-navy placeholder:text-stone focus:outline-none focus-visible:ring-2 focus-visible:ring-slate"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-sm text-stone">No notes match “{query}”.</p>
      ) : (
        <ul className="space-y-2.5">
          {filtered.map((note, i) => (
            <motion.li
              key={note.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <button
                onClick={() => setSelected(note)}
                className="flex w-full items-start gap-4 rounded-2xl border border-paper/60 bg-paper/60 p-4 text-left transition hover:bg-paper/85 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate"
              >
                <span className="min-w-0 flex-1">
                  <span className="mb-1.5 inline-block rounded-md bg-mist/30 px-1.5 py-0.5 text-[10px] font-semibold text-slate">
                    {note.tag}
                  </span>
                  <span className="block font-semibold text-navy">{note.title}</span>
                  <span className="mt-1 block line-clamp-2 text-sm text-slate">{note.preview}</span>
                  <span className="mt-2 block text-xs text-stone">
                    <time dateTime={note.date}>{formatDate(note.date)}</time> · {note.readingTime}
                  </span>
                </span>

                <ChevronRight className="mt-1 h-5 w-5 flex-shrink-0 text-stone" aria-hidden="true" />
              </button>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
}
