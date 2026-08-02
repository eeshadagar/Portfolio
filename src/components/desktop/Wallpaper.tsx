const WALLPAPER: string | null = '/images/wallpaper.webp';
const SCRIM = 0.28;

export default function Wallpaper() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Palette gradient — the base layer, and the fallback */}
      <div className="absolute inset-0 bg-gradient-to-br from-paper via-stone/45 to-mist/70" />
      <div className="absolute -left-[12%] -top-[18%] h-[58vw] w-[58vw] rounded-full bg-mist/45 blur-[120px]" />
      <div className="absolute -right-[10%] top-[6%] h-[44vw] w-[44vw] rounded-full bg-paper/80 blur-[110px]" />
      <div className="absolute -bottom-[20%] left-[24%] h-[50vw] w-[50vw] rounded-full bg-slate/25 blur-[130px]" />
      <div className="absolute bottom-[14%] right-[16%] h-[28vw] w-[28vw] rounded-full bg-stone/40 blur-[95px]" />

      {WALLPAPER && (
        <>
          {/*
            An <img> rather than a CSS background: it gets `onError`, so a
            missing file falls back to the gradient instead of showing nothing,
            and the browser can prioritise it as a real resource.
          */}
          <img
            src={WALLPAPER}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />

          {/* Scrim, tinted navy so the image sits inside the palette */}
          <div
            className="absolute inset-0 bg-navy"
            style={{ opacity: SCRIM }}
          />
          {/* Warm the highlights back up so it doesn't read as a grey photo */}
          <div className="absolute inset-0 bg-paper/12 mix-blend-overlay" />
        </>
      )}

      {/* Vignette — gives the frosted widgets an edge to sit against */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(3,32,50,0.18)_100%)]" />

      {/* Grain — stops gradients banding on wide displays */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.14] mix-blend-overlay">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}