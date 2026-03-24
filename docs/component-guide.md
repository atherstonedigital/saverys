# Saverys Component Guide

## Layout Components

### Nav (`/components/layout/Nav.tsx`)

- Fixed position, transparent background that fills to `var(--saverys-ink)` on scroll.
- Logo: "SAVERYS" in display font, uppercase, tracked wide.
- Desktop: horizontal links, caption style, uppercase.
- Mobile: hamburger icon (two thin horizontal lines, not chunky), slides out full-screen overlay.
- Links: Home, About, Projects, Services, Contact.
- Transition: background fill `0.5s ease-saverys`.

### Footer (`/components/layout/Footer.tsx`)

- Background: `var(--saverys-ink)`.
- Text: `var(--saverys-cream)` at reduced opacity.
- Simple layout: logo left, minimal contact info right. Two columns maximum.
- No multi-column link grids.
- Bottom line: copyright in caption size.

## UI Components

### Button (`/components/ui/Button.tsx`)

Two variants: `ghost` and `text`. See design-system.md for full specs.

Props:
- `variant`: `"ghost" | "text"` (default: `"ghost"`)
- `href`: optional — renders as `<a>` if provided, `<button>` otherwise
- `children`: React node
- Standard button/anchor attributes

### Text (`/components/ui/Text.tsx`)

Semantic text component with design system typography.

Props:
- `as`: `"h1" | "h2" | "h3" | "p" | "span"` (default: `"p"`)
- `variant`: `"h1" | "h2" | "h3" | "body" | "small" | "caption"` (inferred from `as` if not provided)
- `children`: React node

### SectionReveal (`/components/ui/SectionReveal.tsx`)

Framer Motion wrapper for viewport-triggered reveal animations.

Props:
- `children`: React node
- `className`: optional
- `delay`: optional number (seconds)

Behaviour:
- Uses `whileInView` with `once: true`.
- Respects `useReducedMotion()`.
- Default animation: fade up from 30px, 0.8s duration.

## Section Components

### Hero (`/components/sections/Hero.tsx`)

- Full viewport height (100vh).
- Single background image via `next/image` with `fill` and `priority`.
- Overlay text: h1 + optional subtitle, positioned bottom-left.
- Text has subtle text-shadow for legibility only if needed.
- Reveal: slow fade in (1.2s).

### ProjectGrid (`/components/sections/ProjectGrid.tsx`)

- Asymmetric grid layout (not uniform cards).
- Each item: image + project name (caption, uppercase) + brief description.
- Desktop: 2-column with varying row heights.
- Mobile: single column.
- No card borders, no shadows. Images do the visual work.

### ServicesOverview (`/components/sections/ServicesOverview.tsx`)

- Clean list or minimal grid of service categories.
- Each service: h3 title + short paragraph.
- Dividers between items: thin stone-coloured lines.

### ContactSection (`/components/sections/ContactSection.tsx`)

- Simple two-column layout: contact info left, minimal form right.
- Form fields: name, email, message.
- Input styling: bottom-border only, no box borders. Stone colour.
- Submit button: ghost variant.

## Naming Conventions

- All components use PascalCase.
- All files use PascalCase matching the component name.
- Props interfaces: `ComponentNameProps`.
- CSS classes: use Tailwind utilities only — no custom CSS classes.
