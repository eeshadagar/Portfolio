import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

/**
 * The app registry. Everything that can appear in the dock or a window is
 * declared once here — id, label, icon, tint, default window size — and the
 * dock, window manager and Spotlight all read from this list.
 *
 * Tints are pairs drawn from the six-colour palette. With only six hues the
 * tiles can't be wildly distinct, so the glyph and the dock tooltip carry the
 * identification; colour just groups them.
 */

export type AppId =
  | 'about'
  | 'projects'
  | 'leetcode'
  | 'resume'
  | 'notes'
  | 'contact'
  | 'certificates';

export type AppDefinition = {
  id: AppId;
  label: string;
  icon: string;
  /** Tailwind gradient stops, palette-only. */
  tint: string;
  component: LazyExoticComponent<ComponentType>;
  defaultSize: { width: number; height: number };
  inDock: boolean;
};

const AboutApp = lazy(() => import('../components/apps/AboutApp'));
const ProjectsApp = lazy(() => import('../components/apps/ProjectsApp'));
const LeetCodeApp = lazy(() => import('../components/apps/LeetCodeApp'));
const ResumeApp = lazy(() => import('../components/apps/ResumeApp'));
const NotesApp = lazy(() => import('../components/apps/NotesApp'));
const ContactApp = lazy(() => import('../components/apps/ContactApp'));
const CertificatesApp = lazy(() => import('../components/apps/CertificatesApp'));

export const apps: AppDefinition[] = [
  {
    id: 'about',
    label: 'About Me',
    icon: 'user',
    tint: 'from-mist to-slate',
    component: AboutApp,
    defaultSize: { width: 780, height: 580 },
    inDock: true,
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: 'folder',
    tint: 'from-slate to-navy',
    component: ProjectsApp,
    defaultSize: { width: 980, height: 640 },
    inDock: true,
  },
  {
    id: 'leetcode',
    label: 'LeetCode',
    icon: 'leetcode',
    tint: 'from-graphite to-navy',
    component: LeetCodeApp,
    defaultSize: { width: 880, height: 640 },
    inDock: true,
  },
  {
    id: 'resume',
    label: 'Resume',
    icon: 'document',
    tint: 'from-stone to-graphite',
    component: ResumeApp,
    defaultSize: { width: 800, height: 660 },
    inDock: true,
  },
  {
    id: 'notes',
    label: 'Notes',
    icon: 'notes',
    tint: 'from-stone to-slate',
    component: NotesApp,
    defaultSize: { width: 860, height: 620 },
    inDock: true,
  },
  {
    id: 'certificates',
    label: 'Certificates',
    icon: 'award',
    tint: 'from-slate to-graphite',
    component: CertificatesApp,
    defaultSize: { width: 820, height: 600 },
    inDock: true,
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: 'mail',
    tint: 'from-mist to-navy',
    component: ContactApp,
    defaultSize: { width: 720, height: 560 },
    inDock: true,
  },
];

export const appMap = new Map(apps.map((a) => [a.id, a]));

export function getApp(id: AppId): AppDefinition {
  const app = appMap.get(id);
  if (!app) throw new Error(`Unknown app: ${id}`);
  return app;
}

/** External links — these live in the dock but open a new tab. */
export type DockLink = {
  id: string;
  label: string;
  icon: string;
  tint: string;
  href: string;
};

export const dockLinks: DockLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    icon: 'github',
    tint: 'from-graphite to-navy',
    href: 'https://github.com/eeshadagar',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: 'linkedin',
    tint: 'from-mist to-slate',
    href: 'https://www.linkedin.com/in/eeshadagar/',
  },
];
