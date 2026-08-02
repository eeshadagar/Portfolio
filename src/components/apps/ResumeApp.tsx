import { Calendar, Download, Github, Globe, Linkedin, Mail, MapPin } from 'lucide-react';
import { education, experience, profile, skillGroups } from '../../data/profile';
import { projects } from '../../data/projects';
import { certificates } from '../../data/certificates';

export default function ResumeApp() {
  return (
    <div className="mx-auto max-w-3xl p-8">
      <div className="mb-6 flex justify-end">
        <a
          href={profile.resumePdf}
          download
          className="inline-flex items-center gap-1.5 rounded-lg bg-slate px-3 py-2 text-xs font-semibold text-paper transition hover:bg-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-slate"
        >
          <Download className="h-3.5 w-3.5" aria-hidden="true" />
          Download PDF
        </a>
      </div>

      <header className="mb-8 border-b-2 border-navy/15 pb-6 text-center">
        <h1 className="text-3xl font-bold text-navy">{profile.name}</h1>
        <p className="mt-1 font-medium text-slate">{profile.title}</p>

        <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-graphite">
          <a href={`mailto:${profile.email}`} className="flex items-center gap-1 hover:underline">
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            {profile.email}
          </a>
          <a href={profile.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
            <Globe className="h-3.5 w-3.5" aria-hidden="true" />
            eesha.codes
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
            <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
            /in/eeshadagar
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
            <Github className="h-3.5 w-3.5" aria-hidden="true" />
            @eeshadagar
          </a>
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            Gurugram
          </span>
        </div>
      </header>

      <Section title="Summary">
        <p className="text-sm leading-relaxed text-slate">{profile.summary}</p>
      </Section>

      <Section title="Experience">
        {experience.map((role) => (
          <div key={role.id} className="mb-5 last:mb-0">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold text-navy">
                {role.title}, <span className="font-normal">{role.company}</span>
              </h3>
              <span className="flex items-center gap-1 text-xs text-graphite">
                <Calendar className="h-3 w-3" aria-hidden="true" />
                {role.period}
              </span>
            </div>
            <ul className="ml-5 mt-2 list-disc space-y-1 text-sm text-slate marker:text-stone">
              {role.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </Section>

      <Section title="Projects">
        {projects.slice(0, 4).map((p) => (
          <div key={p.id} className="mb-4 last:mb-0">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold text-navy">{p.title}</h3>
              <span className="flex gap-2 text-xs">
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noopener noreferrer" className="font-medium text-slate underline">
                    demo
                  </a>
                )}
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="font-medium text-slate underline">
                    code
                  </a>
                )}
              </span>
            </div>
            <p className="text-xs font-medium text-graphite">{p.tech.join(' · ')}</p>
            <ul className="ml-5 mt-1 list-disc space-y-0.5 text-sm text-slate marker:text-stone">
              {p.highlights.slice(0, 2).map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
        ))}
      </Section>

      <Section title="Education">
        {education.map((e) => (
          <div key={e.short} className="mb-3 last:mb-0">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold text-navy">
                {e.institution}, {e.location} — {e.short} ({e.grade})
              </h3>
              <span className="text-xs text-graphite">{e.period}</span>
            </div>
            <p className="mt-0.5 text-xs text-graphite">
              <span className="font-medium">Coursework:</span> {e.coursework.join(', ')}
            </p>
          </div>
        ))}
      </Section>

      <Section title="Technologies">
        <dl className="space-y-1.5 text-sm text-slate">
          {skillGroups.map((g) => (
            <div key={g.label}>
              <dt className="inline font-semibold text-navy">{g.label}: </dt>
              <dd className="inline">{g.items.join(', ')}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Certifications" last>
        <ul className="space-y-1.5 text-sm">
          {certificates.map((c) => (
            <li key={c.id}>
              <a
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-navy hover:underline"
              >
                {c.title}
              </a>
              <span className="text-graphite"> — {c.issuer}, {c.date}</span>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
  last,
}: {
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <section className={last ? '' : 'mb-7'}>
      <h2 className="mb-3 border-b border-navy/15 pb-1.5 text-lg font-bold text-navy">
        {title}
      </h2>
      {children}
    </section>
  );
}
