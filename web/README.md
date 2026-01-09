# Fluorite Design Web

[Live examples](https://fluorite-design.sassylark8.chatgpt.site/) · [Design rules](../DESIGN.md)

React · Radix UI · Lucide · Recharts · Vite.

## Run

```sh
npm ci
npm run dev
npm run build
npm run preview
```

Run in `web/`. Development port: 5173; preview: 4173. Occupied ports increment automatically. Deployment configuration: `.openai/hosting.json`; output: `dist/`.

## Structure

| Path | Purpose |
| --- | --- |
| `src/App.tsx` | Navigation, preferences and dashboard state |
| `src/pages/` | Overview, foundations, components and layouts |
| `src/components/` | Controls, editors, previews, charts and feedback |
| `src/data.ts` | Pages and sample data |
| `src/styles/` | Tokens, layouts, controls and motion |
| `public/fonts/` | Fonts and licenses |
| `scripts/sync-docs.mjs` | Generate downloadable guidelines |

## State and maintenance

- Demos connect to no devices. Dashboard state survives page navigation and resets on reload; cancel discards drafts.
- The initial theme follows the system. Theme and reduced-motion preferences are stored in the browser.
- After editing root `DESIGN.md` / `REVIEW.md`, run `npm run docs:sync`. Commit generated `public/Fluorite-Design.md`; do not edit it manually.
- Store screenshots in `../docs/screenshots/`. Validate delivery against [REVIEW.md](../REVIEW.md).
