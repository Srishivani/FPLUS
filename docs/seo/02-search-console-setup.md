# Google Search Console — fplus.ae setup

## 1. Add property

1. Go to [Google Search Console](https://search.google.com/search-console)
2. **Add property** → choose **URL prefix**: `https://fplus.ae`
3. Verify ownership (pick one method below)

## 2. Verification methods

### Option A: DNS TXT (recommended for GitHub Pages + custom domain)

1. In Search Console, select **Domain name provider** or **TXT record**
2. Copy the verification string (e.g. `google-site-verification=xxxxx`)
3. Log in to your domain registrar (where `fplus.ae` DNS is managed)
4. Add a **TXT** record:
   - Host: `@` or root
   - Value: paste the full verification string
5. Wait 5–60 minutes → **Verify** in Search Console

### Option B: HTML file upload

1. Search Console provides a file like `google1234567890abcdef.html`
2. Place that file in the **repository root** (same folder as `index.html`)
3. Commit and push to GitHub Pages
4. Confirm it loads: `https://fplus.ae/google1234567890abcdef.html`
5. Click **Verify**

> Replace the placeholder in repo root only after Google gives you the exact filename and content.

## 3. Submit sitemap

After deploy:

1. Search Console → **Sitemaps**
2. Enter: `sitemap.xml`
3. Submit

Sitemap URL: `https://fplus.ae/sitemap.xml`

## 4. Request indexing

1. **URL inspection** → enter `https://fplus.ae/`
2. **Request indexing**
3. Repeat for each service page in [sitemap.xml](../../sitemap.xml) after Phase 2 deploy

## 5. Core Web Vitals baseline

1. **Experience** → **Core Web Vitals**
2. Note Mobile LCP, INP, CLS for homepage
3. Run [PageSpeed Insights](https://pagespeed.web.dev/) for `https://fplus.ae`
4. Log results in [seo/tracking/week-00-baseline.csv](../../seo/tracking/week-00-baseline.csv)

### Fix checklist (already in repo)

- [x] Missing `hero-main.png`, `favicon.png`, `carousel-6.png` — placeholder copies added under `assets/`
- [ ] Replace placeholders with real brand assets when available
- [ ] Compress large PNGs (target &lt; 200 KB each)

## 6. Monitor branded queries (weekly)

**Performance** → **Search results** → filter **Country: United Arab Emirates**

Track queries containing:

- `fplus`
- `fplus ac`
- `fplus hvac`
- `fplus plumbing`
- `fplus technical`

Export weekly into [seo/tracking/branded-queries.csv](../../seo/tracking/branded-queries.csv).

## 7. Coverage & mobile

- **Pages** → ensure all sitemap URLs are indexed
- **Mobile usability** → fix any errors reported
- **HTTPS** → confirm no mixed content

## 8. Optional: Bing Webmaster Tools

1. [Bing Webmaster](https://www.bing.com/webmasters)
2. Import from Google Search Console or verify `fplus.ae` separately
3. Submit same `sitemap.xml`
