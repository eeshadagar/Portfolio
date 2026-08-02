type Props = {
  onClose: () => void;
  onMinimize: () => void;
  onZoom: () => void;
  title: string;
};

/**
 * The three traffic lights. All three are real buttons that do the real thing —
 * people try the red one first, and a decorative one is a small betrayal.
 * Glyphs appear on hover, exactly like macOS.
 */
export default function TrafficLights({ onClose, onMinimize, onZoom, title }: Props) {
  const base =
    'group/light relative flex h-3 w-3 items-center justify-center rounded-full transition ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-slate focus-visible:ring-offset-1';

  return (
    <div className="group/lights flex items-center gap-2">
      <button
        onClick={onClose}
        aria-label={`Close ${title}`}
        title="Close"
        className={`${base} bg-[#FF5F57] hover:bg-[#ff4136]`}
      >
        <svg viewBox="0 0 10 10" className="h-2 w-2 opacity-0 transition group-hover/lights:opacity-70">
          <path d="M2.5 2.5l5 5M7.5 2.5l-5 5" stroke="#7d0000" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </button>

      <button
        onClick={onMinimize}
        aria-label={`Minimise ${title}`}
        title="Minimise"
        className={`${base} bg-[#FEBC2E] hover:bg-[#f5a623]`}
      >
        <svg viewBox="0 0 10 10" className="h-2 w-2 opacity-0 transition group-hover/lights:opacity-70">
          <path d="M2 5h6" stroke="#7a4b00" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </button>

      <button
        onClick={onZoom}
        aria-label={`Zoom ${title}`}
        title="Zoom"
        className={`${base} bg-[#28C840] hover:bg-[#1eb936]`}
      >
        <svg viewBox="0 0 10 10" className="h-2 w-2 opacity-0 transition group-hover/lights:opacity-70">
          <path d="M2.2 2.2h3.2L2.2 5.4zM7.8 7.8H4.6L7.8 4.6z" fill="#0b5c17" />
        </svg>
      </button>
    </div>
  );
}
