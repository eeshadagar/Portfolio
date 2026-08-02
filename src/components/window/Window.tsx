import { useEffect, useRef, type ReactNode } from 'react';
import { motion, useDragControls } from 'framer-motion';
import TrafficLights from './TrafficLights';
import type { WindowState } from '../../hooks/useWindowManager';
import type { AppId } from '../../lib/apps';

type Props = {
  state: WindowState;
  title: string;
  isFront: boolean;
  children: ReactNode;
  onClose: (id: AppId) => void;
  onMinimize: (id: AppId) => void;
  onZoom: (id: AppId) => void;
  onFocus: (id: AppId) => void;
  onMove: (id: AppId, x: number, y: number) => void;
  /** Optional controls rendered on the right of the title bar. */
  toolbar?: ReactNode;
};

/**
 * A draggable macOS window.
 *
 * Dragging is bound to the title bar only (via `dragControls`), so selecting
 * text inside the window doesn't drag it — the mistake almost every web
 * "desktop" makes.
 */
export default function Window({
  state,
  title,
  isFront,
  children,
  onClose,
  onMinimize,
  onZoom,
  onFocus,
  onMove,
  toolbar,
}: Props) {
  const dragControls = useDragControls();
  const panelRef = useRef<HTMLDivElement>(null);

  // ⌘W closes the front window, matching the real shortcut.
  useEffect(() => {
    if (!isFront) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'w') {
        e.preventDefault();
        onClose(state.id);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isFront, onClose, state.id]);

  useEffect(() => {
    if (isFront) panelRef.current?.focus({ preventScroll: true });
  }, [isFront]);

  return (
    <motion.div
      ref={panelRef}
      role="dialog"
      aria-label={title}
      aria-modal={false}
      tabIndex={-1}
      drag
      dragListener={false}
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0}
      onPointerDown={() => onFocus(state.id)}
      onDragEnd={(_, info) => onMove(state.id, state.x + info.offset.x, state.y + info.offset.y)}
      /* Scale-from-slightly-small on open reads as "the window came from the dock". */
      initial={{ opacity: 0, scale: 0.92, y: 16 }}
      animate={{
        opacity: state.minimized ? 0 : 1,
        scale: state.minimized ? 0.75 : 1,
        y: state.minimized ? 220 : 0,
        pointerEvents: state.minimized ? 'none' : 'auto',
      }}
      exit={{ opacity: 0, scale: 0.9, y: 24 }}
      transition={{ type: 'spring', stiffness: 420, damping: 34, mass: 0.8 }}
      style={{
        position: 'absolute',
        top: state.y,
        left: state.x,
        width: state.width,
        height: state.height,
        zIndex: state.z,
      }}
      className="flex flex-col overflow-hidden rounded-xl border border-paper/40 bg-paper/80 shadow-window outline-none backdrop-blur-2xl backdrop-saturate-150"
    >
      {/* Title bar — the only drag handle */}
      <div
        onPointerDown={(e) => {
          onFocus(state.id);
          dragControls.start(e);
        }}
        onDoubleClick={() => onZoom(state.id)}
        className={`flex flex-shrink-0 cursor-grab select-none items-center gap-3 border-b px-4 py-2.5 active:cursor-grabbing ${
          isFront ? 'border-navy/10 bg-paper/70' : 'border-navy/5 bg-paper/40'
        }`}
      >
        <TrafficLights
          title={title}
          onClose={() => onClose(state.id)}
          onMinimize={() => onMinimize(state.id)}
          onZoom={() => onZoom(state.id)}
        />

        <span
          className={`flex-1 truncate text-center text-[13px] font-semibold ${
            isFront ? 'text-navy' : 'text-navy/45'
          }`}
        >
          {title}
        </span>

        {/* Balances the traffic lights so the title stays optically centred. */}
        <div className="flex min-w-[54px] items-center justify-end gap-1">{toolbar}</div>
      </div>

      <div className="scrollbar-mac flex-1 overflow-y-auto overscroll-contain">{children}</div>
    </motion.div>
  );
}
