# Service pages — image placeholders

Each page under `services/` includes:

1. **Hero image** — uses existing asset (`service-hvac.png`, etc.). Replace with a high-quality project photo; keep descriptive `alt` text with "Dubai" and service name.

2. **Project photo placeholder** — single block in the content split. To replace:

```html
<div class="svc-media">
  <img src="../assets/your-ac-project.jpg" alt="AC repair completed in Dubai Marina — FPLUS">
</div>
```

3. **Before/after gallery** — four placeholders per page. Replace each:

```html
<figure class="svc-gallery-item">
  <img src="../assets/gallery/ac-before-1.jpg" alt="Before AC repair Dubai apartment">
  <figcaption class="svc-gallery-cap">Before — not cooling</figcaption>
</figure>
```

## Recommended filenames

| Page | Suggested assets |
|------|------------------|
| ac-repair-dubai | `gallery/ac-hero.jpg`, `gallery/ac-before-1.jpg`, `gallery/ac-after-1.jpg` |
| hvac-maintenance-dubai | `gallery/hvac-*.jpg` |
| plumbing-dubai | `gallery/plumbing-*.jpg` |
| electrical-dubai | `gallery/electrical-*.jpg` |
| home-renovation-fit-out-dubai | `gallery/fitout-*.jpg` |
| project-management-consultancy-dubai | `gallery/consultancy-*.jpg` |

Compress images to under 200 KB each for PageSpeed.
