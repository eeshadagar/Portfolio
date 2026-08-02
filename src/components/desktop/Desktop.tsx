import { Suspense, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import Wallpaper from './Wallpaper';
import MenuBar from './MenuBar';
import Dock, { MobileDock } from './Dock';
import Spotlight from './Spotlight';
import Window from '../window/Window';

import ProfileWidget from '../widgets/ProfileWidget';
import ClockWidget from '../widgets/ClockWidget';
import LeetCodeWidget from '../widgets/LeetCodeWidget';
import ProjectsWidget from '../widgets/ProjectsWidget';
import ExperienceWidget from '../widgets/ExperienceWidget';
import CertificatesWidget from '../widgets/CertificatesWidget';
import NotesWidget from '../widgets/NotesWidget';

import { useWindowManager } from '../../hooks/useWindowManager';
import { useIsCompact } from '../../hooks/useMediaQuery';
import { getApp, type AppId } from '../../lib/apps';

function WindowFallback() {
  return (
    <div className="flex h-full items-center justify-center">
      <div
        role="status"
        aria-label="Loading"
        className="h-6 w-6 animate-spin rounded-full border-2 border-navy/15 border-t-slate"
      />
    </div>
  );
}

export default function Desktop() {
  const wm = useWindowManager();
  const isCompact = useIsCompact();
  const [spotlightOpen, setSpotlightOpen] = useState(false);

  // ⌘K / Ctrl+K opens search from anywhere.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSpotlightOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const frontAppName = wm.frontWindow ? getApp(wm.frontWindow.id).label : 'Finder';

  /* ---------------- Compact: single scrolling column ---------------- */
  if (isCompact) {
    return (
      <div className="relative min-h-screen overflow-y-auto bg-paper">
        <Wallpaper />
        <MenuBar frontAppName="Portfolio" onOpenSpotlight={() => setSpotlightOpen(true)} />

        <main className="relative z-10 grid grid-cols-1 gap-4 px-4 pb-28 pt-11">
          <ProfileWidget onOpen={() => wm.open('about')} />
          <LeetCodeWidget onOpen={() => wm.open('leetcode')} />
          <ProjectsWidget onOpen={() => wm.open('projects')} />
          <ExperienceWidget />
          <CertificatesWidget onOpen={() => wm.open('certificates')} />
          <NotesWidget onOpen={() => wm.open('notes')} />
          <ClockWidget />
        </main>

        <MobileDock openIds={wm.openIds} onOpen={wm.open} />

        {/* On phones a window fills the screen instead of floating. */}
        {wm.frontWindow && (
          <div className="fixed inset-0 z-[150] overflow-y-auto bg-paper/95 backdrop-blur-xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-navy/10 bg-paper/85 px-4 py-3 backdrop-blur-xl">
              <h2 className="font-semibold text-navy">{frontAppName}</h2>
              <button
                onClick={() => wm.close(wm.frontWindow!.id)}
                className="rounded-lg bg-navy/8 px-3 py-1 text-sm font-medium text-navy"
              >
                Done
              </button>
            </div>
            <Suspense fallback={<WindowFallback />}>
              {(() => {
                const Body = getApp(wm.frontWindow.id).component;
                return <Body />;
              })()}
            </Suspense>
          </div>
        )}

        <Spotlight
          open={spotlightOpen}
          onClose={() => setSpotlightOpen(false)}
          onOpenApp={(id: AppId) => wm.open(id)}
        />
      </div>
    );
  }

  /* ---------------- Desktop ----------------
   *
   * Widgets live in two fixed rails hugging the left and right edges. The
   * centre stays clear on purpose: it's where windows open, so nothing you
   * were reading gets buried the moment you click something.
   *
   * Each rail scrolls independently if the viewport is short, with its
   * scrollbar hidden — a visible bar on a floating widget stack reads as a bug.
   */
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-paper">
      <Wallpaper />

      <MenuBar frontAppName={frontAppName} onOpenSpotlight={() => setSpotlightOpen(true)} />

      <h1 className="sr-only">Eesha Dagar — ML engineer and full stack developer portfolio</h1>

      {/* Left rail */}
      <aside
        aria-label="Profile and work"
        className="rail-scroll absolute bottom-28 left-5 top-10 z-10 flex w-[318px] flex-col gap-4 overflow-y-auto pb-2"
      >
        <ProfileWidget onOpen={() => wm.open('about')} />
        <ProjectsWidget onOpen={() => wm.open('projects')} />
        <NotesWidget onOpen={() => wm.open('notes')} />
      </aside>

      {/* Right rail */}
      <aside
        aria-label="Stats and credentials"
        className="rail-scroll absolute bottom-28 right-5 top-10 z-10 flex w-[300px] flex-col gap-4 overflow-y-auto pb-2"
      >
        <ClockWidget />
        <LeetCodeWidget onOpen={() => wm.open('leetcode')} />
        <ExperienceWidget />
        <CertificatesWidget onOpen={() => wm.open('certificates')} />
      </aside>

      {/* Windows open into the clear centre channel */}
      <div className="pointer-events-none absolute inset-0 z-50">
        <AnimatePresence>
          {wm.windows.map((state) => {
            const app = getApp(state.id);
            const Body = app.component;

            return (
              <div key={state.id} className="pointer-events-auto">
                <Window
                  state={state}
                  title={app.label}
                  isFront={wm.frontWindow?.id === state.id}
                  onClose={wm.close}
                  onMinimize={wm.minimize}
                  onZoom={wm.toggleMaximize}
                  onFocus={wm.focus}
                  onMove={wm.move}
                >
                  <Suspense fallback={<WindowFallback />}>
                    <Body />
                  </Suspense>
                </Window>
              </div>
            );
          })}
        </AnimatePresence>
      </div>

      <Dock openIds={wm.openIds} onOpen={wm.toggle} />

      <Spotlight
        open={spotlightOpen}
        onClose={() => setSpotlightOpen(false)}
        onOpenApp={(id: AppId) => wm.open(id)}
      />

      {/* Discoverability hint for the search shortcut */}
      <p className="pointer-events-none absolute bottom-[86px] left-1/2 z-40 -translate-x-1/2 text-[11px] font-medium text-navy/35">
        Press ⌘K to search
      </p>
    </div>
  );
}
