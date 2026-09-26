# ZCC — Hosting Guide

The built site is plain static files. No server, no database, no runtime needed.
`dist/` is the whole product.

## What to host

```
dist/
  index.html
  assets/index-*.js      (main bundle, ~51 kB gzip)
  assets/Net-*.js        (three.js hero, lazy-loaded, ~120 kB gzip)
  assets/index-*.css     (~2.7 kB gzip)
  images/                (logo, footer logo, hero texture)
```

Upload the **contents** of `dist/` to the web root (`public_html` on cPanel, or the
site root on Netlify / Vercel / Cloudflare Pages / GitHub Pages).

## Build

```
npm install
npm run build     # typechecks, then emits dist/
npm run preview   # local check at http://localhost:4173
```

## Dev

```
npm run dev       # Vite at http://localhost:5175
```

## GitHub Pages (live target)

Repo: `zeusindustrieszy-droid/zeuscybernetics.com` (public, live). Branch `main`. The build is **not** committed —
`.github/workflows/deploy.yml` runs `npm ci && npm run build` on every push to `main`
and uploads `dist/` to Pages via `actions/deploy-pages`.

In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
That is the only manual click; everything else is on push.

`base` is `'./'` in `vite.config.ts`, so the site resolves assets correctly whether
Pages serves it at the root (`zcc.github.io`) or a subpath (`zcc.github.io/zcc/`).

Push an existing checkout:

```
git remote add origin https://github.com/zeusindustrieszy-droid/zeuscybernetics.com.git
git push -u origin main
```

### Custom domain

`public/CNAME` already carries `zeuscybernetics.com`, so Pages binds the domain on the
first deploy. At the registrar, point the apex at GitHub and alias `www`:

```
A     @     185.199.108.153   (and .109.153, .110.153, .111.153)
CNAME www   zeusindustrieszy-droid.github.io
```

Until DNS propagates the site is reachable at
`https://zeusindustrieszy-droid.github.io/zeuscybernetics.com/` — `base: './'` makes
that subpath work with no separate build. Enforce HTTPS in Settings → Pages once the
certificate issues.

## Notes

- **Forms are mailto-only.** The appointment form composes a `mailto:` to
  your mail client addresses both house mailboxes in the browser. Nothing is posted anywhere, so the
  site works on any static host with no backend. To get submissions in a file
  instead, point the form at a form endpoint (Formspree, cPanel's Form Mailer, or a
  small Node/Express inbox like the TOTA site uses) — the handler lives in
  `src/App.tsx`.
- **Lazy hero chunk.** `Net-*.js` (three.js) only downloads when the hero canvas
  mounts. Do not inline it or the main bundle triples in size.
- **Desk numbers and emails** are literal in `src/App.tsx` (`MAIL` plus the `tel:` /
  `mailto:` links in the header, Hero button, and Contact tiles) — edit there,
  rebuild, re-upload.
- **Fonts** come from Google Fonts (`Syne`, `Manrope`) via `<link>` in `index.html`.
  Self-host them only if the site must run offline.
- **Meta / Open Graph** tags are preserved in `index.html`. Update `og:url` once the
  domain is fixed.

## Before go-live

- [ ] Confirm `zeusindustries.zy@gmail.com` and `dilhamjafferr@gmail.com` both accept mail.
- [ ] Set `og:url` and the canonical URL to the live domain.
- [ ] Load on a phone — the hero net drops to fewer nodes under 700px by design.

Source of truth for the old static version: `D:\ZCC-SITE` (left untouched).
