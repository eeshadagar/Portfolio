import { MapPin } from 'lucide-react';
import Widget from './Widget';
import { profile } from '../../data/profile';

/** Identity card. The first thing a visitor should read. */
export default function ProfileWidget({ onOpen }: { onOpen: () => void }) {
  return (
    <Widget onClick={onOpen} label="Open About Me" delay={0} className="p-5">
      <div className="flex items-start gap-4">
        <img
          src={profile.avatar}
          alt={`Portrait of ${profile.name}`}
          width={64}
          height={64}
          className="h-16 w-16 flex-shrink-0 rounded-2xl object-cover shadow-md ring-1 ring-paper/60"
        />

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-bold leading-tight text-navy">{profile.name}</h1>
          <p className="text-[13px] font-medium text-slate">{profile.role}</p>
          <p className="mt-0.5 flex items-center gap-1 text-[11px] text-stone">
            <MapPin className="h-3 w-3" aria-hidden="true" />
            Gurugram, India
          </p>
        </div>
      </div>

      <p className="mt-3 text-[13px] leading-relaxed text-slate">{profile.tagline}</p>

      <p className="mt-3 flex items-center gap-1.5 border-t border-navy/8 pt-2.5 text-[11px] font-medium text-slate">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mist opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-slate" />
        </span>
        {profile.availability}
      </p>
    </Widget>
  );
}
