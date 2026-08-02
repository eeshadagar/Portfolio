import { GraduationCap, Mail, MapPin } from 'lucide-react';
import { education, interests, profile, skillGroups } from '../../data/profile';

export default function AboutApp() {
  return (
    <div className="p-7">
      <header className="mb-7 flex flex-col items-start gap-5 sm:flex-row">
        <img
          src={profile.avatar}
          alt={`Portrait of ${profile.name}`}
          width={112}
          height={112}
          className="h-28 w-28 flex-shrink-0 rounded-3xl object-cover shadow-lg ring-1 ring-paper/60"
        />

        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-navy">{profile.name}</h1>
          <p className="text-base font-medium text-slate">{profile.title}</p>

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-graphite">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {profile.location}
            </span>
            <a href={`mailto:${profile.email}`} className="flex items-center gap-1 hover:text-navy hover:underline">
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              {profile.email}
            </a>
          </div>
        </div>
      </header>

      <section className="mb-7 rounded-2xl border border-paper/60 bg-paper/60 p-5">
        <p className="text-[15px] font-semibold text-navy">{profile.tagline}</p>
        <p className="mt-3 leading-relaxed text-slate">{profile.summary}</p>
        {profile.bio.map((para) => (
          <p key={para.slice(0, 20)} className="mt-3 leading-relaxed text-slate">
            {para}
          </p>
        ))}
      </section>

      <section className="mb-7">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-graphite">
          <GraduationCap className="h-4 w-4" aria-hidden="true" />
          Education
        </h2>

        <div className="space-y-3">
          {education.map((e) => (
            <div key={e.short} className="rounded-xl border border-paper/60 bg-paper/50 p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-semibold text-navy">{e.degree}</h3>
                <span className="text-xs font-medium text-graphite">{e.period}</span>
              </div>
              <p className="text-sm text-slate">
                {e.institution}, {e.location} · <span className="font-medium">{e.grade}</span>
              </p>
              <p className="mt-2 text-xs leading-relaxed text-stone">
                {e.coursework.join(' · ')}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-7">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-graphite">
          What I work with
        </h2>

        <dl className="space-y-3">
          {skillGroups.map((group) => (
            <div key={group.label} className="sm:flex sm:items-baseline sm:gap-4">
              <dt className="mb-1.5 w-32 flex-shrink-0 text-xs font-bold uppercase tracking-wide text-stone sm:mb-0">
                {group.label}
              </dt>
              <dd className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-paper/70 bg-paper/70 px-2 py-1 text-xs font-medium text-slate"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-graphite">
          Currently interested in
        </h2>
        <div className="flex flex-wrap gap-2">
          {interests.map((i) => (
            <span
              key={i}
              className="rounded-full bg-slate/10 px-3 py-1 text-xs font-medium text-slate"
            >
              {i}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
