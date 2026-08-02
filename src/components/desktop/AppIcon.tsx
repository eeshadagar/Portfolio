/**
 * Hand-drawn app icons.
 *
 * Inline SVG rather than image files: they stay crisp at any dock
 * magnification, cost no extra requests, and can inherit colour.
 */
export default function AppIcon({ name, className = '' }: { name: string; className?: string }) {
  const common = { className, viewBox: '0 0 48 48', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' };

  switch (name) {
    case 'user':
      return (
        <svg {...common}>
          <circle cx="24" cy="18" r="7.5" fill="white" fillOpacity="0.95" />
          <path
            d="M10 40c0-7.2 6.3-12 14-12s14 4.8 14 12"
            fill="white"
            fillOpacity="0.95"
          />
        </svg>
      );

    case 'folder':
      return (
        <svg {...common}>
          <path
            d="M7 14a3 3 0 013-3h7.6a3 3 0 012.1.9l2.2 2.1H38a3 3 0 013 3v18a3 3 0 01-3 3H10a3 3 0 01-3-3V14z"
            fill="white"
            fillOpacity="0.35"
          />
          <path
            d="M7 20a3 3 0 013-3h28a3 3 0 013 3v15a3 3 0 01-3 3H10a3 3 0 01-3-3V20z"
            fill="white"
            fillOpacity="0.95"
          />
        </svg>
      );

    case 'leetcode':
      /* LeetCode's mark: the angular bracket path plus the horizontal bar. */
      return (
        <svg {...common}>
          <path
            d="M28.5 8.5l-4.1 4.4-9.6 10.3a5.6 5.6 0 000 7.6l9.6 10.3a5.1 5.1 0 007.3.2l4.4-4.2"
            stroke="#8AA5C0"
            strokeWidth="4.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M20 27h17.5" stroke="white" strokeWidth="4.2" strokeLinecap="round" />
          <path
            d="M28.5 8.5L35 15"
            stroke="#A5A4A0"
            strokeWidth="4.2"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'document':
      return (
        <svg {...common}>
          <path
            d="M12 8a3 3 0 013-3h13l9 9v26a3 3 0 01-3 3H15a3 3 0 01-3-3V8z"
            fill="white"
            fillOpacity="0.97"
          />
          <path d="M28 5l9 9h-6a3 3 0 01-3-3V5z" fill="#8AA5C0" />
          <path
            d="M18 22h12M18 28h12M18 34h8"
            stroke="#425870"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'notes':
      return (
        <svg {...common}>
          <rect x="9" y="7" width="30" height="34" rx="3" fill="white" fillOpacity="0.97" />
          <rect x="9" y="7" width="30" height="7" rx="3" fill="#8AA5C0" />
          <path
            d="M16 22h16M16 28h16M16 34h10"
            stroke="#425870"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'mail':
      return (
        <svg {...common}>
          <rect x="7" y="12" width="34" height="24" rx="4" fill="white" fillOpacity="0.97" />
          <path
            d="M8.5 15l13.7 10.4a3 3 0 003.6 0L39.5 15"
            stroke="#425870"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'award':
      return (
        <svg {...common}>
          <circle cx="24" cy="19" r="11" fill="white" fillOpacity="0.97" />
          <path d="M24 13.5l1.9 3.9 4.3.6-3.1 3 .7 4.3-3.8-2-3.8 2 .7-4.3-3.1-3 4.3-.6L24 13.5z" fill="#8AA5C0" />
          <path d="M17 30l-3 12 10-4.5L34 42l-3-12" fill="white" fillOpacity="0.85" />
        </svg>
      );

    case 'github':
      return (
        <svg {...common}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24 5C13.5 5 5 13.5 5 24c0 8.4 5.4 15.5 13 18 .95.17 1.3-.4 1.3-.9v-3.2c-5.3 1.15-6.4-2.55-6.4-2.55-.86-2.2-2.1-2.78-2.1-2.78-1.72-1.18.13-1.15.13-1.15 1.9.13 2.9 1.96 2.9 1.96 1.7 2.9 4.45 2.06 5.53 1.58.17-1.23.66-2.07 1.2-2.54-4.23-.48-8.68-2.12-8.68-9.42 0-2.08.74-3.78 1.96-5.11-.2-.48-.85-2.42.19-5.05 0 0 1.6-.51 5.25 1.96a18.2 18.2 0 019.55 0C34.4 12.3 36 12.81 36 12.81c1.04 2.63.39 4.57.19 5.05a7.35 7.35 0 011.96 5.11c0 7.32-4.46 8.93-8.71 9.4.69.59 1.3 1.75 1.3 3.53v5.23c0 .51.34 1.1 1.31.91C37.62 39.48 43 32.39 43 24 43 13.5 34.5 5 24 5z"
            fill="white"
            fillOpacity="0.97"
          />
        </svg>
      );

    case 'linkedin':
      return (
        <svg {...common}>
          <rect x="6" y="6" width="36" height="36" rx="6" fill="white" fillOpacity="0.97" />
          <circle cx="15.5" cy="15.5" r="3.2" fill="#425870" />
          <rect x="12.7" y="21" width="5.6" height="15" rx="1" fill="#425870" />
          <path
            d="M22.5 21h5.3v2.1c.8-1.4 2.5-2.5 4.8-2.5 4 0 5.9 2.4 5.9 7v8.4h-5.6v-7.6c0-2.1-.8-3.3-2.6-3.3-1.6 0-2.5 1.1-2.5 3.3V36h-5.3V21z"
            fill="#425870"
          />
        </svg>
      );

    case 'finder':
      return (
        <svg {...common}>
          <rect x="6" y="6" width="36" height="36" rx="8" fill="white" fillOpacity="0.97" />
          <path d="M24 6h18v36H24V6z" fill="#8AA5C0" fillOpacity="0.35" />
          <circle cx="17" cy="20" r="1.8" fill="#032032" />
          <circle cx="31" cy="20" r="1.8" fill="#032032" />
          <path d="M17 30c2 2.4 12 2.4 14 0" stroke="#032032" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );

    default:
      return (
        <svg {...common}>
          <rect x="8" y="8" width="32" height="32" rx="8" fill="white" fillOpacity="0.9" />
        </svg>
      );
  }
}
