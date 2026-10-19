# PingPod App

The PingPod booking web app (pingpod.blog), built with React and Vite and deployed on Netlify.

## Run locally

```bash
npm install
npm run dev       # dev server at http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the production build
```

Netlify reads `netlify.toml`: it runs `npm run build`, publishes `dist/`, and rewrites every route to `index.html`.

## Project layout

```
src/
  main.jsx               entry point
  App.jsx                app state, actions, and the screen router
  context/AppContext.jsx useApp(): screens and components read app state from here
  theme.js               brand colors
  styles/appStyles.js    shared inline-style tokens (S)
  screens/               one file per screen (Region, Locations, Booking, Crews, Pop-ups, ...)
  components/
    layout/              NavBar, Toast
    locations/           LocRow, RegionHeader
    overlays/            loading, boot intro, celebrations
    crews/               CrewSheet
    tutorial/            CrewPass tutorial
    coaching/            CoachAvatar
    popups/              PopupDurhamMap, PopupTruckVisual
    ui/                  XPBar, LvBadge, Divider, SecSep
    icons.jsx            SVG icon set
  data/                  locations, coaches, programs, crews, schedule, images
  utils/                 pricing, crew tiers
  assets/                location and region photos
public/                  static files served as-is (logo goes here)
```

Adding a screen: create `src/screens/FooScreen.jsx`, read what it needs with `useApp()`,
and add a `screen === "foo"` line to `renderScreen()` in `App.jsx`.

## Missing from the repo

These files were referenced by the original code but were never committed. Copy them in from the local project:

- `public/pingpod-logo.png` (and/or `public/pingpod-logo.webp`)
- `src/components/popups/PopupDurhamMap.jsx` and `PopupTruckVisual.jsx` are temporary placeholders; replace them with the real components.
