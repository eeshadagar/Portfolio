import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BadgeCheck } from 'lucide-react';
import Widget from './Widget';
import { certificates } from '../../data/certificates';

/** Rotating certificates. Pauses on hover so the target doesn't move mid-click. */
export default function CertificatesWidget({ onOpen }: { onOpen: () => void }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % certificates.length), 4500);
    return () => clearInterval(id);
  }, [paused]);

  const cert = certificates[index];

  return (
    <Widget onClick={onOpen} label="Open certificates" delay={4} className="overflow-hidden p-4">
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="mb-3 flex items-center gap-2">
          <BadgeCheck className="h-4 w-4 text-slate" aria-hidden="true" />
          <h2 className="text-sm font-semibold text-navy">Certifications</h2>
          <span className="ml-auto text-[10px] font-medium text-stone">{certificates.length}</span>
        </div>

        <div className="relative h-[70px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <p className="line-clamp-2 text-[13px] font-semibold leading-tight text-navy">
                {cert.title}
              </p>
              <p className="mt-1 text-[11px] text-graphite">{cert.issuer}</p>
              <p className="text-[10px] text-stone">
                {cert.date}
                {cert.detail && ` · ${cert.detail}`}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-2 flex gap-1">
          {certificates.map((c, i) => (
            <span
              key={c.id}
              aria-hidden="true"
              className={`h-1 flex-1 rounded-full transition-colors ${
                i === index ? 'bg-slate' : 'bg-navy/15'
              }`}
            />
          ))}
        </div>
      </div>
    </Widget>
  );
}
