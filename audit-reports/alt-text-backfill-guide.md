# Alt text backfill guide

_Last updated: 2026-04-28 — backfill complete._

## Status

`npm run audit:alt` reports **0 issues**. The placeholder `heroImageAlt`
values previously applied to `saverys-1`..`4` have been replaced with
descriptive copy derived from each project's body and gallery context.

## Final hero alts on the four legacy projects

| File | `heroImageAlt` |
|------|----------------|
| `content/projects/saverys-1.md` | Saverys 1 interior — restored Cotswold mill in Broadway with hand-finished English linen and original stone |
| `content/projects/saverys-2.md` | Saverys 2 interior — drawing room with green velvet sofa and golden botanical drapes in a Cotswolds country house |
| `content/projects/saverys-3.md` | Saverys 3 interior — entrance hall with blue chair and painted chest in a Chipping Campden farmhouse, Gloucestershire |
| `content/projects/saverys-4.md` | Saverys 4 interior — drawing room with pale sofa, botanical cushions, and a garden view in a Georgian dower house, Moreton-in-Marsh |

Each follows the suggested format:

```
"[Project name] interior — [room type / subject] in [location / setting]"
```

If Gary wants to tighten any of these against the actual photograph,
edit via Decap CMS at `/admin` → Projects → choose project → Hero Image
Alt Text → Publish. The change ships via the editorial workflow.
