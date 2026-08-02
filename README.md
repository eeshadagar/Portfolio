# eesha.codes — portfolio

A macOS desktop in the browser. Magnifying dock, draggable windows with working
traffic lights, ⌘K search, and a LeetCode widget that updates itself.

Built with React 18, TypeScript, Vite, Tailwind and Framer Motion.
Verified: `tsc --noEmit` clean under `strict` + `noUnusedLocals`, `vite build` clean.

---

## Run it

```bash
npm install
npm run dev
```

## Before you deploy — 5 things

### 1. Add your images to `public/images/`

| File | Used by | Notes |
|---|---|---|
| `me.webp` | Profile widget, About | Square crop, ~300×300 |
| `og-cover.png` | Link previews | 1200×630 — this is what shows in WhatsApp/LinkedIn/Slack |

Project thumbnails are referenced in `src/data/projects.ts` but the cards fall back
to a coloured gradient if the file is missing, so they're optional.

### 2. Add your résumé

Drop it at `public/Eesha_Dagar_Resume.pdf`. I'd use the **full-stack version**
(`resume.pdf`) — it matches the "ML engineer who ships" framing the site now uses.

### 3. Add the three missing repo links

In `src/data/projects.ts`, search for `TODO`. Three of your best projects —
Code Explainer, Fake News Detector, Mental Health Trends — have live demos but no
repo URL. For an ML role this is the biggest remaining gap: reviewers want the notebook.

### 4. Turn on the LeetCode sync

`.github/workflows/leetcode.yml` is ready to go. It runs nightly, fetches your
stats server-side, and commits `public/leetcode.json`.

To enable: push to GitHub, then **Settings → Actions → General → Workflow permissions
→ Read and write permissions**. Run it once by hand from the Actions tab to confirm.

Test locally first:

```bash
npm run leetcode
```

### 5. Contact form (optional)

The form only renders if `VITE_FORMSPREE_ID` is set — otherwise you get a clean
"email me" panel instead of a form that silently swallows messages. To enable:

```bash
echo "VITE_FORMSPREE_ID=your_id" > .env
```

Free form at [formspree.io](https://formspree.io).

---

## How the LeetCode widget works

LeetCode has no public API, and its GraphQL endpoint rejects cross-origin browser
requests. So a static site can't just fetch it. Three tiers, in order of speed:

1. **`/leetcode.json`** — committed nightly by GitHub Actions. Same origin, so it
   resolves in milliseconds with no CORS involved. This is the one that normally wins.
2. **Public proxy APIs** — raced in the background to catch problems you solved today.
   Free-tier services, so they're treated as best-effort.
3. **Bundled snapshot** in `src/data/leetcode.ts` — already on screen from first paint.

The widget therefore never shows a spinner-of-death or an empty state. The dot in
its corner tells you which tier is live.

---

## Structure

```
src/
  data/          profile, projects, certificates, notes, leetcode  ← edit here
  hooks/         useWindowManager, useLeetCode, useMediaQuery
  lib/apps.tsx   app registry — id, icon, window size, lazy component
  components/
    desktop/     Wallpaper, MenuBar, Dock, Spotlight, Desktop
    window/      Window (draggable), TrafficLights
    widgets/     Profile, Clock, LeetCode, Projects, Experience, Certificates, Notes
    apps/        About, Projects, LeetCode, Resume, Notes, Contact, Certificates
```

**To change content, you only ever touch `src/data/`.** Everything else reads from
there. That's deliberate — the old site had three different project lists that
disagreed with each other.

**To add an app:** write the component in `components/apps/`, add one entry to
`lib/apps.tsx`. The dock, window manager and ⌘K search all pick it up automatically.

---

## Layout

Widgets sit in two rails hugging the left and right edges. The centre stays
clear on purpose — that's where windows open, so nothing you were reading gets
buried the moment you click something. Each rail scrolls independently on short
viewports, with the scrollbar hidden.

There are no desktop icons. Every app is reachable from the dock, the ⌘K search,
or a widget, so a third copy of the same seven launchers was just noise on the
wallpaper.

To move a widget between rails, edit the two `<aside>` blocks in
`components/desktop/Desktop.tsx` — they're plain flex columns.

---

## Interactions worth knowing

| Action | Result |
|---|---|
| `⌘K` / `Ctrl+K` | Spotlight search over apps, projects and notes |
| `⌘W` | Close front window |
| Drag title bar | Move window |
| Double-click title bar | Zoom |
| Click dock icon of front window | Minimise it |
| `↑` `↓` `↵` in Spotlight | Navigate and open |
| `←` `→` on project carousel | Previous / next |

---

## Notes on the build

- **Bundle:** 201 kB shell + 124 kB motion (65 + 41 kB gzipped), 31 kB CSS (6.5 kB gzipped).
  Every app window is lazy — opening Projects downloads 4 kB.
- **Dock magnification** is the real algorithm: each tile measures its own centre,
  takes the horizontal distance to the cursor, and maps it through a spring. Neighbours
  scale proportionally, which is what produces the fisheye. Scaling only the hovered
  icon doesn't look right and never will.
- **Reduced motion** is respected — magnification switches off and animations collapse
  to instant when the OS asks for it.
- **The wallpaper is CSS**, not an image. No request, sharp at any resolution.

---

## Colour

Six colours, sampled from your palette. Nothing else:

| | Hex | Used for |
|---|---|---|
| paper | `#EAE9E4` | widget and window surfaces, text on dark |
| mist | `#8AA5C0` | accents, easy-difficulty swatch, wallpaper pools |
| stone | `#A5A4A0` | faint text, dividers, muted tiles |
| slate | `#425870` | secondary text, primary buttons, focus rings |
| graphite | `#5A5B5D` | muted text, neutral tiles |
| navy | `#032032` | primary text, dark surfaces, shadows |

Every other tone is one of these six at reduced opacity (`text-navy/60`,
`bg-paper/45`) rather than a new hue — so the whole UI is provably inside the
palette. Tailwind is configured with only these names; there is no `blue-500`
to reach for by accident.

**Two deliberate exceptions:**

1. **The traffic lights stay red/amber/green.** They're the one piece of macOS
   iconography people recognise instantly, and recolouring them to palette blues
   would make three identical dots. If you'd rather they matched, it's one file
   — `components/window/TrafficLights.tsx`.

2. **LeetCode difficulty uses palette, not LeetCode's brand colours.** Easy →
   mist, Medium → slate, Hard → navy, which keeps the light-to-dark ordering
   intact. The colour sits in a small swatch rather than the label text, because
   the palette's lightest blue on a light panel is about 2.3:1 — fine as a solid
   block, unreadable as 12px type.

---

## One thing to verify

`src/data/certificates.ts` lists the **Google Data Analytics Professional Certificate**,
per your answer. The verification URL currently points at *Analyze Data to Answer
Questions* — one course from the program. Grab the Professional Certificate credential
URL from your Coursera Accomplishments page so the link matches the title. A recruiter
who clicks through should land on the thing you claimed.
