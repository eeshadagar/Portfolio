import { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import AppIcon from './AppIcon';
import { apps, dockLinks, type AppId } from '../../lib/apps';
import { useReducedMotion } from '../../hooks/useMediaQuery';

const BASE_SIZE = 46;
const MAX_SIZE = 82;
/** How far either side of the cursor the magnification reaches, in px. */
const INFLUENCE = 130;

type DockItemProps = {
  mouseX: MotionValue<number>;
  label: string;
  icon: string;
  tint: string;
  isOpen?: boolean;
  onClick: () => void;
  href?: string;
  magnify: boolean;
};

/**
 * One dock tile.
 *
 * The magnification is the real macOS behaviour: each tile measures its own
 * centre, takes the horizontal distance to the cursor, and maps that distance
 * onto a size curve. Neighbours scale proportionally, which is what produces
 * the fisheye sweep — you can't get it by scaling only the hovered item.
 */
function DockItem({ mouseX, label, icon, tint, isOpen, onClick, href, magnify }: DockItemProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [bouncing, setBouncing] = useState(false);

  const distance = useTransform(mouseX, (x) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds || x === Infinity) return INFLUENCE;
    return Math.abs(x - (bounds.left + bounds.width / 2));
  });

  const targetSize = useTransform(distance, [0, INFLUENCE], [MAX_SIZE, BASE_SIZE], {
    clamp: true,
  });

  // Spring so the sweep has weight instead of snapping to the cursor.
  const size = useSpring(targetSize, { stiffness: 320, damping: 26, mass: 0.35 });
  const width = magnify ? size : BASE_SIZE;

  const handleClick = () => {
    setBouncing(true);
    window.setTimeout(() => setBouncing(false), 650);
    onClick();
  };

  const Tile = (
    <motion.button
      ref={ref}
      onClick={handleClick}
      style={{ width, height: width }}
      aria-label={href ? `${label} (opens in a new tab)` : label}
      className="group relative flex items-end justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-paper/90 rounded-2xl"
    >
      <span
        className={`flex h-full w-full items-center justify-center rounded-[22%] bg-gradient-to-br ${tint} shadow-lg ring-1 ring-navy/10 ${
          bouncing ? 'animate-dock-bounce' : ''
        }`}
      >
        <AppIcon name={icon} className="h-[62%] w-[62%] drop-shadow-sm" />
      </span>

      {/* Tooltip — an icon-only dock is otherwise a memory test */}
      <span className="pointer-events-none absolute -top-11 whitespace-nowrap rounded-lg bg-navy/85 px-2.5 py-1 text-xs font-medium text-paper opacity-0 shadow-lg backdrop-blur-sm transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
        {label}
      </span>

      {/* Running indicator */}
      <span
        aria-hidden="true"
        className={`absolute -bottom-[7px] h-[3px] w-[3px] rounded-full bg-navy/70 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </motion.button>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-end">
        {Tile}
      </a>
    );
  }
  return Tile;
}

type DockProps = {
  openIds: AppId[];
  onOpen: (id: AppId) => void;
};

export default function Dock({ openIds, onOpen }: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const reduced = useReducedMotion();
  const dockApps = apps.filter((a) => a.inDock);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] flex justify-center pb-3">
      <motion.nav
        aria-label="Dock"
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        initial={{ y: 90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35, type: 'spring', stiffness: 260, damping: 26 }}
        className="pointer-events-auto flex items-end gap-2.5 rounded-[22px] border border-paper/50 bg-paper/35 px-3 pb-2 pt-2.5 shadow-dock backdrop-blur-2xl backdrop-saturate-150"
      >
        {dockApps.map((app) => (
          <DockItem
            key={app.id}
            mouseX={mouseX}
            label={app.label}
            icon={app.icon}
            tint={app.tint}
            isOpen={openIds.includes(app.id)}
            onClick={() => onOpen(app.id)}
            magnify={!reduced}
          />
        ))}

        <span aria-hidden="true" className="mx-1 mb-1 h-11 w-px self-center bg-navy/15" />

        {dockLinks.map((link) => (
          <DockItem
            key={link.id}
            mouseX={mouseX}
            label={link.label}
            icon={link.icon}
            tint={link.tint}
            href={link.href}
            onClick={() => undefined}
            magnify={!reduced}
          />
        ))}
      </motion.nav>
    </div>
  );
}

/** Compact bottom bar used instead of the dock on phones. */
export function MobileDock({ openIds, onOpen }: DockProps) {
  const dockApps = apps.filter((a) => a.inDock);

  return (
    <nav
      aria-label="App bar"
      className="fixed inset-x-0 bottom-0 z-[100] flex items-center justify-around border-t border-paper/40 bg-paper/70 px-2 py-2 backdrop-blur-2xl"
    >
      {dockApps.map((app) => (
        <button
          key={app.id}
          onClick={() => onOpen(app.id)}
          aria-label={app.label}
          className="flex flex-col items-center gap-1 rounded-xl px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate"
        >
          <span
            className={`flex h-10 w-10 items-center justify-center rounded-[22%] bg-gradient-to-br ${app.tint} shadow ring-1 ring-navy/10`}
          >
            <AppIcon name={app.icon} className="h-6 w-6" />
          </span>
          <span className="text-[9px] font-medium text-navy">{app.label}</span>
          <AnimatePresence>
            {openIds.includes(app.id) && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="h-1 w-1 rounded-full bg-slate"
              />
            )}
          </AnimatePresence>
        </button>
      ))}
    </nav>
  );
}
