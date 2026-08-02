import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  /** Stagger index — widgets fade up in sequence on first paint. */
  delay?: number;
  onClick?: () => void;
  label?: string;
};

/**
 * The frosted tile every widget sits on. Interactive widgets render as a
 * button so they're keyboard-reachable; static ones stay a div rather than
 * advertising a click that does nothing.
 */
export default function Widget({ children, className = '', delay = 0, onClick, label }: Props) {
  const shell =
    'rounded-3xl border border-paper/60 bg-paper/50 shadow-widget backdrop-blur-2xl backdrop-saturate-150 ' +
    className;

  const animation = {
    initial: { opacity: 0, y: 14, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { delay: 0.1 + delay * 0.07, type: 'spring' as const, stiffness: 260, damping: 24 },
  };

  if (onClick) {
    return (
      <motion.button
        {...animation}
        onClick={onClick}
        aria-label={label}
        whileHover={{ y: -3, scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        className={`${shell} text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-slate focus-visible:ring-offset-2 focus-visible:ring-offset-transparent`}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <motion.div {...animation} className={shell}>
      {children}
    </motion.div>
  );
}
