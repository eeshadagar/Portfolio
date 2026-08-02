import { useEffect, useMemo, useState } from 'react';
import Widget from './Widget';

/** Analogue clock with a live second hand, plus the date beneath. */
export default function ClockWidget() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // 60 tick marks never change — no reason to rebuild them every second.
  const ticks = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => {
        const isHour = i % 5 === 0;
        return (
          <line
            key={i}
            x1="50"
            y1={isHour ? 9 : 11}
            x2="50"
            y2={isHour ? 16 : 13.5}
            stroke="currentColor"
            strokeWidth={isHour ? 2 : 1}
            strokeLinecap="round"
            opacity={isHour ? 0.75 : 0.35}
            transform={`rotate(${i * 6} 50 50)`}
          />
        );
      }),
    []
  );

  const seconds = now.getSeconds();
  const minutes = now.getMinutes() + seconds / 60;
  const hours = (now.getHours() % 12) + minutes / 60;

  const label = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  return (
    <Widget delay={0} className="flex flex-col items-center justify-center p-4">
      <svg
        viewBox="0 0 100 100"
        className="h-[104px] w-[104px] text-navy"
        role="img"
        aria-label={`Analogue clock showing ${label}`}
      >
        <circle cx="50" cy="50" r="47" fill="rgba(255,255,255,0.5)" />
        {ticks}

        {/* Hour */}
        <line
          x1="50" y1="54" x2="50" y2="28"
          stroke="currentColor" strokeWidth="3.6" strokeLinecap="round"
          transform={`rotate(${hours * 30} 50 50)`}
        />
        {/* Minute */}
        <line
          x1="50" y1="55" x2="50" y2="19"
          stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"
          transform={`rotate(${minutes * 6} 50 50)`}
        />
        {/* Second */}
        <line
          x1="50" y1="58" x2="50" y2="16"
          stroke="#8AA5C0" strokeWidth="1.2" strokeLinecap="round"
          transform={`rotate(${seconds * 6} 50 50)`}
        />
        <circle cx="50" cy="50" r="2.6" fill="currentColor" />
        <circle cx="50" cy="50" r="1.1" fill="#8AA5C0" />
      </svg>

      <p className="mt-2 text-xs font-medium text-graphite">
        {now.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
      </p>
    </Widget>
  );
}
