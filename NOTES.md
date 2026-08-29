# Build Notes — css-components

Working notes: what broke, what you tried, why you chose X over Y.
Not for recruiters — for you, six months from now, in an interview.

Keep it rough. Rough is the point.

---

## Log

### 2026-08-29
- **Scaffolded** the static-site structure directly (no `_template` Python copy), following
  B1's precedent: `public/` deploy root, npm dev-only tooling (`html-validate` + `@lhci/cli` +
  `puppeteer`), same `deploy.yml`/`ci.yml` pair.
- **Decided the modal mechanism**: checkbox `:checked` + `~` sibling combinator, over `:target`.
  `:target` changes the URL fragment (messes with browser history/back button and means loading
  the page with `#modal-id` already in the address bar opens it unintentionally); the checkbox
  hack keeps all state local to the DOM and the checkbox stays a real, native, keyboard-operable
  control (Tab + Space toggles it with zero extra work).
- **Built all six component files** (tokens/base/buttons/cards/forms/modal.css) and the showcase
  page. `html-validate` caught two real mistakes immediately: an inline `style=""` on a spacing
  hack (`no-inline-style` — fixed with `.example-row + .example-row` in base.css instead) and two
  checkboxes sharing `name="notify"` (`form-dup-name` — each independent boolean field needs its
  own name; only radio groups should share one).
- **Caught a real accessibility bug by reasoning through the pattern, not by a linter**: the
  modal's open/close/cancel/confirm controls are four separate `<label for="demo-modal">`
  elements, all pointing at the same one checkbox (necessary — only a `<label>` or the checkbox
  itself can toggle a checkbox with zero JS). But a form control's accessible name is computed
  from *every* associated `<label>`'s text concatenated together, so without a fix a screen
  reader would announce the single real control as something like "Open modal Close Cancel
  Confirm" — nonsense. Fixed with `aria-label="Confirm action dialog"` directly on the checkbox,
  which takes precedence over label-based name computation in the accessible-name algorithm. The
  four labels stay purely visual/mouse affordances; a screen-reader or keyboard-only user
  actually operates one clearly-named checkbox. This is a real, load-bearing limitation of the
  checkbox-hack pattern, not a nitpick — worth stating plainly in INTERVIEW.md.
- Ran `npm run lhci` locally: hit the same sandbox `%TEMP%` `EPERM` cleanup error documented in
  B1's NOTES (Chrome's own tmp-dir cleanup, not a bug in this project). Same resolution as
  B1 — trust the GitHub Actions run, not the local one, and pull the real numbers from there.

---

## Rejected approaches

| Approach | Why rejected |
|---|---|
| `:target`-based modal | Pollutes browser history and URL; a shared/bookmarked link with `#demo-modal` would open the modal unintentionally on load. |
| Backdrop click closes the modal | Only achievable zero-JS by making the whole backdrop a `<label>`, but then clicking *inside* the modal content (which is nested inside that label) also closes it — worse than not having the affordance. Chose "explicit close controls only" over that false affordance. |

## Open questions

- [x] Modal mechanism — decided: checkbox `:checked` + sibling combinator.
- [ ] None open — see README §7 for what would change at scale (real dialog semantics need JS).
