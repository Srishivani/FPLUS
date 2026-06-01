# Phase 2 architecture decision — FPLUS

## Decision: Static multi-page on GitHub Pages

**Chosen approach:** Add HTML service pages under `/services/` on the existing GitHub Pages site.

**Not chosen now:** Next.js full rebuild (higher cost, hosting change; revisit when you need 20+ area pages or a CMS).

## Rationale

| Factor | Static pages | Next.js |
|--------|--------------|---------|
| Time to launch | Days | Weeks |
| Hosting | Existing fplus.ae | Vercel/similar + config |
| SEO | Full control per URL | Excellent with App Router |
| Cost | Free (GitHub Pages) | Free tier possible |
| Fits current stack | Yes | Migration required |

## Implemented URL structure

```
https://fplus.ae/
https://fplus.ae/services/ac-repair-dubai.html
https://fplus.ae/services/hvac-maintenance-dubai.html
https://fplus.ae/services/plumbing-dubai.html
https://fplus.ae/services/electrical-dubai.html
https://fplus.ae/services/home-renovation-fit-out-dubai.html
https://fplus.ae/services/project-management-consultancy-dubai.html
```

## Each service page includes

- Unique `<title>`, meta description, canonical
- One H1 with Dubai + service keywords
- H2 sections: services, why FPLUS, areas, FAQ
- JSON-LD: `LocalBusiness`, `Service`, `FAQPage`
- Emergency / WhatsApp CTAs + mobile sticky bar
- Trust badges (license, HSE, UAE compliant)
- Internal links to related services and homepage

## Technical SEO files

| File | Purpose |
|------|---------|
| [robots.txt](../../robots.txt) | Crawl + sitemap pointer |
| [sitemap.xml](../../sitemap.xml) | All indexable URLs |
| [seo/nap.json](../../seo/nap.json) | Canonical business data |

## Next steps after deploy

1. Submit sitemap in Search Console
2. Request indexing per service URL
3. Add internal links from homepage footer (done)
4. Add before/after photos to each page when available
5. Optional: `/areas/dubai-marina.html` etc. in a future batch

## When to migrate to Next.js

- 15+ neighborhood landing pages
- Blog/content hub
- Form backend + GA4 event tracking
- Arabic `hreflang` site version
