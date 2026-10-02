# ROSE – Ratatoskr One-day Series of Events

Website for ROSE disc golf events (rosediscgolf.co.uk / ratatoskr.events).
Vue 3 + Vite 6 + Tailwind 4 single-page app, with content managed in Sanity.
Originally based on the Cruip "DevFolio" template.

## Routes

| Path | Page |
| --- | --- |
| `/` | ROSE 2027 coming soon page (`ComingSoon.vue`) |
| `/2026` | Archived 2026 season one-pager (`Season2026.vue`) |
| `/events/:slug` | Event page, content from Sanity (`EventPage.vue`) |
| `/:slug` | Vanity redirect to `/events/:slug`, e.g. `/ripley-26` |
| `/live-caddy-book/{p\|g}/h{n}` | Caddy book hole page (`CaddyBookPage.vue`) |
| anything else | Redirects to `/` |

**Do not change the `/live-caddy-book/{p|g}/h{n}` format.** It is printed on the tee sign QR codes.

## Development

```
npm install
npm run dev        # site on http://localhost:5173
npm run build      # production build to dist/
```

Sanity Studio (separate package in `studio/`):

```
cd studio
npm install
npm run dev        # Studio on http://localhost:3333
npx sanity deploy  # publish the hosted Studio (needs `sanity login`)
```

Sanity project: `ylota33v`, dataset `production` (see `src/lib/sanity.js` and `studio/sanity.config.js`).

## Deployment

Hosted on a Laravel Forge server (site `ratatoskr.events`). A GitHub push webhook on `hsmess/rose` deploys `main`
on every push, so **pushing to `main` deploys the site**. Forge serves the built `dist/` as static HTML.

- Domains (`ratatoskr.events`, `rosediscgolf.co.uk`) are added under the site's Domains tab in Forge, with
  Let's Encrypt certificates.
- DNS is on Cloudflare: proxied A record to the Forge server IP, `www` CNAME to the apex. Cloudflare SSL/TLS mode
  should be **Full (strict)**.
- Nginx on Forge must fall back to `index.html` so that client-side routes work when opened directly.
- Cloudflare's `events-forwarder` Worker is unrelated to this repo.

Changes made in Sanity do not need a site deploy. The site reads Sanity live from the CDN.

## Content (Sanity Studio)

Document types in `studio/schemaTypes/`:

- **Event**: powers `/events/:slug` (logo, date, location, status, carousel images, sections, registration URL).
- **Coming Soon Page** and **Site Settings**: singletons for the home page copy and footer links.
- **Caddy Book Page**: one document per hole sign image. Layout (`p` or `g`), hole number and image.

### Caddy book

Each hole page lives at `/live-caddy-book/{layout}/h{hole}`.

- **Upload the whole book:** open **Caddy Book Upload** in the Studio toolbar and choose the PDF
  (`studio/tools/CaddyBookUpload.jsx`). Pages are rendered to PNG in the browser. The first half becomes layout
  `p` (`h1`…), the second half layout `g` (`h1`…): 36 pages give 18 holes each, 18 pages give 9 each. The page
  count must be even. Check the thumbnails, then press **Publish these pages**. This replaces the whole book and
  removes leftover pages from a previous longer book.
- **Change a single page:** open the **Caddy Book Page** document for that layout/hole, replace the image and publish.

Document IDs are `caddyPage-{layout}-h{hole}`, so re-uploading overwrites in place.

## Notes

- The coming soon signup form posts to a Mailchimp embedded form (popup). The public `u`/`id` values and bot-field name are constants at the top of `ComingSoon.vue`. Never put a Mailchimp API key in this repo, since the site is static and public.
- `studio/package.json` must not declare `"type": "module"`, or the Sanity CLI cannot load `sanity.cli.js`.
