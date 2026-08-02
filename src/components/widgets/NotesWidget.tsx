import { ArrowUpRight } from 'lucide-react';
import Widget from './Widget';
import { notesByDate } from '../../data/notes';

/** Preview of the most recent note. */
export default function NotesWidget({ onOpen }: { onOpen: () => void }) {
  const latest = notesByDate[0];

  return (
    <Widget onClick={onOpen} label={`Open notes. Latest: ${latest.title}`} delay={5} className="p-4">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-navy">Notes</h2>
        <ArrowUpRight className="h-3.5 w-3.5 text-stone" aria-hidden="true" />
      </div>

      <span className="mb-2 inline-block rounded-md bg-mist/30 px-1.5 py-0.5 text-[10px] font-semibold text-slate">
        {latest.tag}
      </span>

      <h3 className="line-clamp-2 text-[13px] font-bold leading-snug text-navy">{latest.title}</h3>
      <p className="mt-1 line-clamp-3 text-[11px] leading-snug text-graphite">{latest.preview}</p>

      <p className="mt-3 border-t border-navy/8 pt-2 text-[10px] text-stone">
        {latest.readingTime} · {notesByDate.length} posts
      </p>
    </Widget>
  );
}
