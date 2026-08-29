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

---

## Rejected approaches

| Approach | Why rejected |
|---|---|
| | |

## Open questions

- [ ] Modal mechanism: `:target` anchor vs. checkbox `:checked` + sibling combinator — decide
      before building, since it drives the HTML structure.
