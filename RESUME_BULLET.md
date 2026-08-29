# Resume Bullets — css-components

Form: **action → technical specifics → measured outcome.** Numbers or it doesn't go on the resume.

---

## Bullets

- Built a zero-JavaScript CSS component library (buttons, cards, forms, modal) using only the
  checkbox-hack pattern, `:has()`, `:user-invalid`, and `@starting-style` transitions; found and
  fixed a real accessible-name collision on the modal's four label-driven controls via a
  precedence-based `aria-label` fix.
- Shipped with a CI-enforced Lighthouse gate (≥95 on all four categories, 3-run median) and
  `html-validate`; measured result 100/100/100/100 (Performance/Accessibility/Best
  Practices/SEO), deployed to GitHub Pages via GitHub Actions.

## Which roles this supports

- [ ] Data Scientist / ML
- [ ] AI Engineer (LLM/NLP/CV)
- [ ] Data Engineer
- [x] Data Analyst / Python Developer

## Keywords this project earns

CSS custom properties, `:has()`, `:user-invalid`, `@starting-style`, `transition-behavior:
allow-discrete`, accessible-name computation / ARIA precedence, Lighthouse CI, `html-validate`,
GitHub Actions, GitHub Pages.

---

### Bad vs good

❌ "Built a machine learning model to predict customer churn using Python."
✅ "Built a churn classifier on 240k accounts (LightGBM, 1:40 class imbalance) with isotonic calibration and cost-sensitive thresholding, lifting precision@10% from 0.31 to 0.58 over the business's existing rules baseline."

The second one is answerable in an interview. The first invites the question you can't answer.
