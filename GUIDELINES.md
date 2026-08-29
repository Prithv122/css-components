# css-components — B2

**Tier:** 1 · **Category:** B — Web dev HTML/CSS · **Wave:** 1

Root rules in `../GUIDELINES.md` apply, **except** the `uv`/Python conventions — this project has
zero Python and zero JS. Static-site pattern carried over from B1 (`../07-portfolio-site/`):
`public/` is the deployable HTML/CSS, repo root holds docs and npm-based CI tooling only.

## What this is

A CSS-only component library — buttons, cards, forms, and a modal — demonstrated on a single
showcase page with zero JavaScript. Proves real CSS depth (custom properties, `:has()`,
`:target`/checkbox-hack modal patterns, layered specificity) rather than framework reliance.

## Stack

Vanilla HTML5 / CSS3, no framework, no JS, no build step. npm used only for two dev-only CI
gates: `html-validate` and `@lhci/cli` (Lighthouse CI), both version-pinned in `package.json`.

## Acceptance criteria

- [x] Buttons, cards, forms, and a modal — all built in pure CSS, zero `<script>`
- [x] Semantic HTML, proper landmarks/heading hierarchy
- [x] Dark mode via `prefers-color-scheme` + CSS custom properties
- [x] Lighthouse Performance/Accessibility/Best Practices/SEO all ≥ 95, CI-gated — currently 100/100/100/100
- [x] Deployed and live on GitHub Pages — https://prithv122.github.io/css-components/
- [ ] Ship gate passes (`/ship`)

## Project-specific notes

- `public/` is the GitHub Pages deploy root (`.github/workflows/deploy.yml`).
- `npm install` before `npm run validate` / `npm run lhci` locally.
- No `.env` — nothing here reads environment variables.
- The zero-JS modal is the interesting CSS problem in this project — decide and document the
  mechanism (`:target` anchor vs. checkbox/`:checked` + `~` sibling combinator) in `NOTES.md`
  before building it, since it drives the HTML structure.
