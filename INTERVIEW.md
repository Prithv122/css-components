# Interview Prep — css-components

**Five questions, five answers.** An unanswered question means this project is not shipped.

If you can't answer one, you don't understand that part of your own project yet — go back and understand it. This file is the difference between a portfolio that survives a technical screen and one that collapses in it.

---

### Q1. Walk me through the architecture in 90 seconds.

_A:_ It's a static page, `public/index.html`, linking six separate stylesheets:
`tokens.css` holds every color/spacing/radius/shadow value as CSS custom properties, with a
`prefers-color-scheme: dark` block overriding only the values that change. `base.css` is resets
and page layout. Then one file per component — `buttons.css`, `cards.css`, `forms.css`,
`modal.css` — each reading from the token layer, none of them referencing each other. There's no
build step: six `<link>` tags, fetched in parallel by the browser. GitHub Actions runs
`html-validate` and Lighthouse CI on every push, then deploys `public/` straight to GitHub Pages.
Nothing here is generated or bundled — what's in the repo is what ships.

### Q2. Why did you choose the checkbox-hack for the modal over `:target`?

_A:_ Both are zero-JS ways to toggle visibility from a click, but `:target` works by writing to
the URL fragment. That means opening the modal changes the address bar and pushes a browser
history entry, and — more concretely — if someone bookmarks or shares a link with `#demo-modal`
already in it, the modal pops open the instant the page loads, which is not what a "modal" should
do. A checkbox's `:checked` state doesn't touch the URL at all; it's local DOM state, which is
what a modal's open/closed flag actually is. The cost is that the checkbox needs to stay in the
DOM as a real, focusable element (visually hidden via a clip technique, not `display: none`,
which removes it from the tab order) so keyboard users can still reach and toggle it.

### Q3. What's the weakest part of this, and what would break first under load?

_A:_ There's no "load" in the traditional sense — it's static assets on GitHub Pages, that
doesn't fail under traffic. The actual weak point is the modal's accessibility ceiling. A
checkbox-driven dialog can't trap focus, can't close on Escape, and can't reliably prevent a
screen-reader user from tabbing into content behind it — all things a real `role="dialog"`
implementation needs JS to do (managing `aria-hidden` on siblings, listening for `keydown`).
I documented this explicitly rather than pretending the pattern is equivalent to a real modal;
see README §7 for what I'd swap in (the native `<dialog>` element) if this needed to be
production-grade.

### Q4. How do you know it works? What did you measure, and against what baseline?

_A:_ Two objective gates, both CI-enforced, not eyeballed: `html-validate` against
`html-validate:recommended` (two purely stylistic rules disabled, documented in `GUIDELINES.md`) —
zero errors. And Lighthouse CI with a ≥95 assertion on all four categories, run three times per
push with the median scored; the actual measured result is 100/100/100/100
(Performance/Accessibility/Best Practices/SEO), pulled from the CI run's own report, not a local
guess. I also manually reasoned through the modal's accessible-name computation (see Q5) rather
than trusting the linter to catch every accessibility issue — `html-validate` and Lighthouse's
axe-core audits don't check multi-label accessible-name ambiguity.

### Q5. Walk me through the accessible-name bug you found in the modal, and why the fix works.

_A:_ The modal needs four different clickable things — an "Open modal" button, a "×" close
button, "Cancel", and "Confirm" — and every one of them has to be able to toggle the *same*
checkbox, because with zero JS only a `<label for>` or the checkbox itself can change a
checkbox's state. So all four are `<label for="demo-modal">` elements. The problem: the
accessible name of a form control is computed from the text content of *every* label associated
with it, concatenated in DOM order. Without a fix, a screen reader would announce the one real
interactive element on the page as something like "Open modal Close Cancel Confirm, checkbox" —
which tells a screen-reader user nothing about what it does. The fix is `aria-label="Confirm
action dialog"` directly on the `<input>`. Per the accessible-name computation algorithm
(ARIA's `aria-label` step comes before the `<label>`-association step), an explicit `aria-label`
wins outright — the four labels stay purely visual, mouse-oriented affordances, and a
keyboard/screen-reader user operates one clearly-named checkbox with Tab and Space instead.

---

## 30-second pitch

Most "CSS component library" projects stop at buttons and cards, where zero JS is trivial. This
one pushes into the case where it actually gets hard — a functioning modal — using the checkbox
hack plus 2024-era CSS (`@starting-style`, `:has()`, `:user-invalid`) for the parts that need
state or a transition, and it's honest in the README and here about exactly where that pattern's
ceiling is and what a production version would need instead.
