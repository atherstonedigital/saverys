# Saverys Design System

## Colour Palette

All colours are defined as CSS custom properties on `:root`.

| Token                    | Value     | Usage                          |
| ------------------------ | --------- | ------------------------------ |
| `--saverys-charcoal`     | `#2C2C2C` | Primary text, headings         |
| `--saverys-stone`        | `#8A8275` | Secondary text, captions       |
| `--saverys-clay`         | `#A0896C` | Accent, links, focus states    |
| `--saverys-cream`        | `#F5F0EB` | Page background                |
| `--saverys-linen`        | `#EDE8E1` | Section alternate background   |
| `--saverys-white`        | `#FAFAF8` | Card / overlay background      |
| `--saverys-ink`          | `#1A1A1A` | Nav bar, footer background     |

Never use raw hex values in components — always reference these tokens.

## Typography

### Font Families

| Token                  | Font               | Usage                    |
| ---------------------- | ------------------ | ------------------------ |
| `--font-display`       | Cormorant Garamond | Headings, display text   |
| `--font-body`          | Jost               | Body copy, UI elements   |

### Type Scale

| Name     | Size (desktop) | Size (mobile) | Weight | Tracking (desktop) | Tracking (mobile) |
| -------- | -------------- | ------------- | ------ | ------------------- | ------------------ |
| `h1`     | 4rem / 64px    | 2.5rem / 40px | 300    | 0.08em              | 0.064em            |
| `h2`     | 2.5rem / 40px  | 1.75rem / 28px| 300    | 0.06em              | 0.048em            |
| `h3`     | 1.5rem / 24px  | 1.25rem / 20px| 400    | 0.04em              | 0.032em            |
| `body`   | 1rem / 16px    | 1rem / 16px   | 300    | 0.02em              | 0.02em             |
| `small`  | 0.875rem / 14px| 0.875rem      | 300    | 0.03em              | 0.03em             |
| `caption`| 0.75rem / 12px | 0.75rem       | 400    | 0.06em              | 0.06em             |

### Rules

- Headings never exceed `font-weight: 400`.
- Body text uses `font-weight: 300`.
- All uppercase text uses `caption` size with wide tracking.
- Line height: headings `1.2`, body `1.7`.

## Spacing

Based on a 4px grid. Use Tailwind spacing scale mapped to these values:

| Token  | Value  |
| ------ | ------ |
| `xs`   | 4px    |
| `sm`   | 8px    |
| `md`   | 16px   |
| `lg`   | 32px   |
| `xl`   | 64px   |
| `2xl`  | 96px   |
| `3xl`  | 128px  |
| `4xl`  | 192px  |

Section vertical padding: `3xl` (128px) desktop, `xl` (64px) mobile.

## Animation

### Easing

| Name         | Value                           | Usage                |
| ------------ | ------------------------------- | -------------------- |
| `ease-saverys` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | Default for all transitions |

### Durations

| Name     | Value  | Usage                        |
| -------- | ------ | ---------------------------- |
| `slow`   | 1.2s   | Hero reveals, page transitions |
| `medium` | 0.8s   | Section reveals, image fades   |
| `fast`   | 0.5s   | Hover states, micro-interactions |

### Reveal Animations

All section reveals use Framer Motion `motion.div` with:

```ts
const revealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};
```

Always wrap animations in `useReducedMotion()` check — if true, render without animation.

## Borders & Decorative Elements

- Border colour: `var(--saverys-stone)` at 30% opacity.
- Border width: always `1px`.
- No border-radius on cards or containers (sharp corners).
- No drop shadows anywhere.
- Dividers: `1px solid` using stone at 20% opacity. Use sparingly.

## Buttons

Two variants only:

### Ghost Button
- Border: `1px solid var(--saverys-charcoal)`
- Background: transparent
- Text: `var(--saverys-charcoal)`, uppercase, caption size, wide tracking
- Hover: background fills to `var(--saverys-charcoal)`, text becomes `var(--saverys-cream)`
- Transition: `0.5s ease-saverys`
- Padding: `12px 32px`

### Text Button
- No border, no background
- Text: `var(--saverys-charcoal)` with underline offset `4px`
- Hover: colour shifts to `var(--saverys-clay)`
- Transition: `0.5s ease-saverys`

## Images

- All images use `next/image` with explicit `width`, `height`, and `sizes` prop.
- Format: WebP only.
- Max file size: 2MB for hero images.
- Alt text: always descriptive of the room, material, or context shown.
- No border-radius on images.
- No overlay gradients unless required for text legibility.

## Focus States

- All interactive elements: `outline: 1px solid var(--saverys-clay)`
- Outline offset: `2px`
- Never remove focus styles entirely.
