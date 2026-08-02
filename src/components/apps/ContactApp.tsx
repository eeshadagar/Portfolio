import { useState } from 'react';
import { AlertCircle, CheckCircle2, Copy, Github, Linkedin, Loader2, Mail, Send } from 'lucide-react';
import { profile } from '../../data/profile';

type Status = 'idle' | 'sending' | 'sent' | 'error';

/**
 * Contact form.
 *
 * Posts to Formspree if VITE_FORMSPREE_ID is set; otherwise the form is hidden
 * and the email link stands alone — better than a form that silently does
 * nothing, which is what an unconfigured integration usually becomes.
 */
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID as string | undefined;

export default function ContactApp() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // bot

    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`${res.status}`);
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
      setError('That did not send. Email me directly and it will reach me.');
    }
  };

  const field =
    'w-full rounded-xl border border-paper/70 bg-paper/70 px-3 py-2 text-sm text-navy ' +
    'placeholder:text-stone focus:outline-none focus-visible:ring-2 focus-visible:ring-slate';

  return (
    <div className="p-7">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-navy">Get in touch</h1>
        <p className="mt-1 text-sm text-graphite">
          Open to roles, collaborations and questions about anything here. I reply to everything.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-3">
          <div className="rounded-2xl border border-paper/60 bg-paper/60 p-4">
            <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-stone">
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              Email
            </p>
            <p className="mb-3 break-all text-sm font-medium text-navy">{profile.email}</p>
            <div className="flex gap-2">
              <a
                href={`mailto:${profile.email}`}
                className="flex-1 rounded-lg bg-slate px-3 py-1.5 text-center text-xs font-semibold text-paper transition hover:bg-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-slate"
              >
                Compose
              </a>
              <button
                onClick={copyEmail}
                aria-label="Copy email address"
                className="rounded-lg border border-navy/15 bg-paper/70 px-3 py-1.5 text-xs font-semibold text-navy transition hover:bg-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-slate"
              >
                {copied ? <CheckCircle2 className="h-3.5 w-3.5 text-slate" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl border border-paper/60 bg-paper/60 p-4 transition hover:bg-paper/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate"
          >
            <Linkedin className="h-5 w-5 text-[#425870]" aria-hidden="true" />
            <span>
              <span className="block text-sm font-semibold text-navy">LinkedIn</span>
              <span className="block text-xs text-graphite">/in/eeshadagar</span>
            </span>
          </a>

          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl border border-paper/60 bg-paper/60 p-4 transition hover:bg-paper/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate"
          >
            <Github className="h-5 w-5 text-navy" aria-hidden="true" />
            <span>
              <span className="block text-sm font-semibold text-navy">GitHub</span>
              <span className="block text-xs text-graphite">@eeshadagar</span>
            </span>
          </a>
        </div>

        {FORMSPREE_ID ? (
          <form onSubmit={submit} className="rounded-2xl border border-paper/60 bg-paper/60 p-5" noValidate>
            <div className="mb-3">
              <label htmlFor="name" className="mb-1 block text-xs font-semibold text-slate">
                Name
              </label>
              <input
                id="name"
                required
                autoComplete="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={field}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="mb-1 block text-xs font-semibold text-slate">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={field}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="mb-1 block text-xs font-semibold text-slate">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${field} resize-y`}
              />
            </div>

            {/* Honeypot — invisible to people, irresistible to bots */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input
                id="company"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate py-2.5 text-sm font-semibold text-paper transition hover:bg-navy disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate"
            >
              {status === 'sending' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Send message
                </>
              )}
            </button>

            <div aria-live="polite" className="mt-3 min-h-[1.25rem]">
              {status === 'sent' && (
                <p className="flex items-center gap-1.5 text-xs font-medium text-slate">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  Sent — I will get back to you soon.
                </p>
              )}
              {status === 'error' && (
                <p className="flex items-center gap-1.5 text-xs font-medium text-navy">
                  <AlertCircle className="h-4 w-4" aria-hidden="true" />
                  {error}
                </p>
              )}
            </div>
          </form>
        ) : (
          <div className="flex flex-col justify-center rounded-2xl border border-dashed border-navy/20 bg-paper/40 p-6 text-center">
            <p className="text-sm font-medium text-slate">Email is the fastest way to reach me.</p>
            <p className="mt-2 text-xs leading-relaxed text-stone">
              To enable the contact form, create a free form at formspree.io and set{' '}
              <code className="rounded bg-navy/10 px-1 py-0.5 font-mono text-[11px]">
                VITE_FORMSPREE_ID
              </code>{' '}
              in your <code className="rounded bg-navy/10 px-1 py-0.5 font-mono text-[11px]">.env</code>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
