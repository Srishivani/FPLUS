# FPLUS SEO implementation kit

Phase 1 (off-site + tracking) and Phase 2 (service pages + technical SEO) deliverables for **fplus.ae**.

## Start here — 90-day checklist

| Week | Action | Guide |
|------|--------|--------|
| 1 | Google Business Profile | [01-google-business-profile-setup.md](./01-google-business-profile-setup.md) |
| 2 | Search Console + sitemap | [02-search-console-setup.md](./02-search-console-setup.md) |
| 3 | NAP citations | [03-nap-citations.md](./03-nap-citations.md) |
| 4+ | Reviews + weekly tracking | [04-review-request-scripts.md](./04-review-request-scripts.md), [05-branded-tracking.md](./05-branded-tracking.md) |
| Deploy | Push repo → submit `sitemap.xml` | [06-phase2-architecture.md](./06-phase2-architecture.md) |

## Data & tracking

| File | Purpose |
|------|---------|
| [seo/nap.json](../../seo/nap.json) | Canonical business name, phone, areas |
| [seo/tracking/](../../seo/tracking/) | Weekly CSV logs (GSC, GBP, leads, citations) |
| [seo/email-signature.txt](../../seo/email-signature.txt) | Copy-paste email footer |

## Live SEO URLs (after deploy)

- https://fplus.ae/robots.txt
- https://fplus.ae/sitemap.xml
- https://fplus.ae/services/ac-repair-dubai.html
- https://fplus.ae/services/hvac-maintenance-dubai.html
- https://fplus.ae/services/plumbing-dubai.html
- https://fplus.ae/services/electrical-dubai.html
- https://fplus.ae/services/home-renovation-fit-out-dubai.html
- https://fplus.ae/services/project-management-consultancy-dubai.html

## Your manual steps (cannot be automated)

1. **Claim GBP** — follow guide 01  
2. **Verify Search Console** — DNS TXT at domain registrar (guide 02)  
3. **Submit sitemap** in GSC after git push  
4. **Request indexing** for each URL in guide 02  
5. **Run PageSpeed** and fill `seo/tracking/week-00-baseline.csv`  
6. **Save Google review link** locally (see guide 04)

## Deploy

```bash
git add .
git commit -m "Add SEO kit, service pages, sitemap, and tracking templates"
git push
```

GitHub Pages will publish to **fplus.ae** within a few minutes.
