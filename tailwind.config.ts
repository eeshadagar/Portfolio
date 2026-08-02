import type { Config } from 'tailwindcss';

/**
 * Six colours, sampled from the supplied palette. Nothing else.
 *
 *   paper    #EAE9E4   warm off-white
 *   mist     #8AA5C0   muted blue
 *   stone    #A5A4A0   warm grey
 *   slate    #425870   deep blue-grey
 *   graphite #5A5B5D   neutral dark grey
 *   navy     #032032   near-black blue
 *
 * Every other tone in the UI is one of these six at reduced opacity
 * (e.g. `text-navy/60`, `bg-paper/45`) rather than a new hue. That keeps the
 * whole interface provably inside the palette.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#EAE9E4',
        mist: '#8AA5C0',
        stone: '#A5A4A0',
        slate: '#425870',
        graphite: '#5A5B5D',
        navy: '#032032',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"SF Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        window: '0 25px 70px -12px rgba(3, 32, 50, 0.45), 0 0 0 0.5px rgba(234, 233, 228, 0.3)',
        dock: '0 10px 40px -8px rgba(3, 32, 50, 0.35), inset 0 0 0 0.5px rgba(234, 233, 228, 0.45)',
        widget: '0 8px 32px -8px rgba(3, 32, 50, 0.22), inset 0 0 0 0.5px rgba(234, 233, 228, 0.5)',
      },
      keyframes: {
        'dock-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-22px)' },
          '70%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'dock-bounce': 'dock-bounce 0.65s ease-in-out',
      },
    },
  },
  plugins: [],
} satisfies Config;
