import { BadgeCheck, ExternalLink } from 'lucide-react';
import { certificates } from '../../data/certificates';

export default function CertificatesApp() {
  return (
    <div className="p-7">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-navy">Certifications</h1>
        <p className="mt-1 text-sm text-graphite">
          {certificates.length} credentials — every one links to its verification page.
        </p>
      </header>

      <ul className="space-y-3">
        {certificates.map((cert) => (
          <li key={cert.id}>
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-paper/60 bg-paper/60 p-4 transition hover:bg-paper/85 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate"
            >
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-mist/25">
                <BadgeCheck className="h-6 w-6 text-slate" aria-hidden="true" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-navy">{cert.title}</span>
                <span className="block text-sm text-slate">{cert.issuer}</span>
                <span className="block text-xs text-stone">
                  {cert.date}
                  {cert.detail && ` · ${cert.detail}`}
                </span>
              </span>

              <ExternalLink className="h-4 w-4 flex-shrink-0 text-stone" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
