import { useCallback, useRef, useState } from 'react';
import { getApp, type AppId } from '../lib/apps';

export type WindowState = {
  id: AppId;
  x: number;
  y: number;
  width: number;
  height: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
  /** Geometry to restore to when un-maximising. */
  restore?: { x: number; y: number; width: number; height: number };
};

const MENU_BAR = 28;
const DOCK_SPACE = 96;

/**
 * Owns every open window: stacking order, position, minimise and zoom.
 *
 * The z-index counter lives in a ref rather than state. State updaters must be
 * pure — calling another setState inside one means StrictMode's double
 * invocation increments it twice, and windows start fighting over the top slot.
 * A ref sidesteps that, and nothing renders off the counter directly.
 */
export function useWindowManager() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const zCounter = useRef(10);

  const nextZ = () => {
    zCounter.current += 1;
    return zCounter.current;
  };

  /** Cascade new windows so they don't land exactly on top of each other. */
  const geometryFor = useCallback((width: number, height: number, openCount: number) => {
    const vw = typeof window === 'undefined' ? 1440 : window.innerWidth;
    const vh = typeof window === 'undefined' ? 900 : window.innerHeight;

    const w = Math.min(width, vw - 48);
    const h = Math.min(height, vh - MENU_BAR - DOCK_SPACE);
    const offset = (openCount % 5) * 28;

    return {
      width: w,
      height: h,
      x: Math.max(24, (vw - w) / 2 + offset - 56),
      y: Math.max(MENU_BAR + 12, (vh - DOCK_SPACE - h) / 2 + offset - 40),
    };
  }, []);

  const focus = useCallback((id: AppId) => {
    const z = nextZ();
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, z, minimized: false } : w)));
  }, []);

  const open = useCallback(
    (id: AppId) => {
      const z = nextZ();
      setWindows((ws) => {
        const existing = ws.find((w) => w.id === id);
        if (existing) {
          return ws.map((w) => (w.id === id ? { ...w, z, minimized: false } : w));
        }

        const { defaultSize } = getApp(id);
        const geometry = geometryFor(defaultSize.width, defaultSize.height, ws.length);
        return [...ws, { id, ...geometry, z, minimized: false, maximized: false }];
      });
    },
    [geometryFor]
  );

  const close = useCallback((id: AppId) => {
    setWindows((ws) => ws.filter((w) => w.id !== id));
  }, []);

  const minimize = useCallback((id: AppId) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
  }, []);

  /** Green traffic light — zoom to fill, or restore previous geometry. */
  const toggleMaximize = useCallback((id: AppId) => {
    setWindows((ws) =>
      ws.map((w) => {
        if (w.id !== id) return w;

        if (w.maximized && w.restore) {
          return { ...w, ...w.restore, maximized: false, restore: undefined };
        }

        return {
          ...w,
          restore: { x: w.x, y: w.y, width: w.width, height: w.height },
          x: 12,
          y: MENU_BAR + 8,
          width: window.innerWidth - 24,
          height: window.innerHeight - MENU_BAR - DOCK_SPACE - 8,
          maximized: true,
        };
      })
    );
  }, []);

  const move = useCallback((id: AppId, x: number, y: number) => {
    setWindows((ws) =>
      ws.map((w) =>
        w.id === id
          ? {
              // Keep at least a strip of the title bar reachable.
              ...w,
              x: Math.min(Math.max(x, -w.width + 120), window.innerWidth - 120),
              y: Math.min(Math.max(y, MENU_BAR), window.innerHeight - 80),
            }
          : w
      )
    );
  }, []);

  const frontWindow = windows
    .filter((w) => !w.minimized)
    .reduce<WindowState | null>((top, w) => (!top || w.z > top.z ? w : top), null);

  /** Dock click: open, raise, or minimise if it's already front-most. */
  const toggle = useCallback(
    (id: AppId) => {
      const existing = windows.find((w) => w.id === id);
      if (!existing) return open(id);
      if (existing.minimized) return focus(id);
      if (frontWindow?.id === id) return minimize(id);
      return focus(id);
    },
    [windows, frontWindow, open, focus, minimize]
  );

  return {
    windows,
    frontWindow,
    open,
    close,
    focus,
    minimize,
    toggleMaximize,
    move,
    toggle,
    openIds: windows.map((w) => w.id),
  };
}
