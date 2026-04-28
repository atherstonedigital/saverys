# Alt text backfill guide — placeholders to replace

_Last updated: 2026-04-27_

## Status

`npm run audit:alt` reports **0 issues** because every image now has alt text.
However, four project hero images carry **temporary placeholder alt text**
that should be replaced with descriptive copy before launch / once Gary
provides photography context.

## Files with placeholders pending Gary backfill

| File | Placeholder applied | Status |
|------|---------------------|--------|
| `content/projects/saverys-1.md` (`heroImageAlt`) | `Saverys 1 project — interior photography` | placeholder applied — pending Gary backfill |
| `content/projects/saverys-2.md` (`heroImageAlt`) | `Saverys 2 project — interior photography` | placeholder applied — pending Gary backfill |
| `content/projects/saverys-3.md` (`heroImageAlt`) | `Saverys 3 project — interior photography` | placeholder applied — pending Gary backfill |
| `content/projects/saverys-4.md` (`heroImageAlt`) | `Saverys 4 project — interior photography` | placeholder applied — pending Gary backfill |

## Suggested format

```
"[Project name] interior — [room type] in [location]"
```

Example:

```
"Saverys 1 interior — drawing room in a Cotswold country house"
```

## How to backfill

1. Open Decap CMS at `/admin`
2. **Projects** → choose the project (e.g. _Saverys 1_)
3. Replace the **Hero Image Alt Text** field with the descriptive version
4. **Publish**

The change is committed via the editorial workflow PR and deploys on merge.
