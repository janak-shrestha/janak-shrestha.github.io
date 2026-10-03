# Janak Shrestha — Portfolio

Personal site of Janak Shrestha, Engineering Manager at Unzer (Munich). Built with
[Next.js](https://nextjs.org) 16 (App Router, TypeScript) and deployed on Vercel.

English is served at `/` and German at `/de`.

## Run locally

```bash
npm install
cp .env.example .env.local   # then fill in FORMSPREE_ENDPOINT
npm run dev                  # http://localhost:3000
```

`npm run build` creates a production build and `npm run lint` runs ESLint.

## Environment variables

| Variable | Where it is used | Exposed to the browser? |
| --- | --- | --- |
| `FORMSPREE_ENDPOINT` | `src/app/api/contact/route.ts` forwards the contact and blog-notify forms here | **No.** Server-only |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, hreflang links and Open Graph tags | Yes (it is the public URL) |

`.env.local` is git-ignored. Only `.env.example` (with placeholder values) is committed.

The browser only ever talks to `/api/contact`. That route checks the request comes
from this site, validates the fields, drops honeypot (bot) submissions, applies a
basic per-IP rate limit, and then calls Formspree with the server-side endpoint.

## Editing content

All text lives in two typed dictionaries:

- `src/content/en.tsx`: English
- `src/content/de.tsx`: German (TypeScript flags any field missing from the English version)

Facts that are the same in both languages (email, social links, tool lists,
certifications, career start date) are in `src/content/shared.ts`.

## Project structure

```
src/
  app/[lang]/          one route per page (home, about, experience, stack, blog, contact)
  app/api/contact/     form handler (reads FORMSPREE_ENDPOINT)
  app/globals.css      design system and all styles
  components/          header, footer, page transition, forms, widgets
  content/             en/de dictionaries + shared data
  i18n/                locale config, dictionary loader, metadata helper
  proxy.ts             serves English without a /en prefix
public/                profile photo, CV PDF, icons
```

## Deploying to Vercel

1. Import the GitHub repository in Vercel. The framework preset is detected automatically.
2. Under **Settings → Environment Variables**, add `FORMSPREE_ENDPOINT` and
   `NEXT_PUBLIC_SITE_URL` for Production (and Preview if wanted).
3. Under **Settings → Domains**, add `www.janakshrestha25.com.np` (and the apex domain)
   and update the DNS records at the domain registrar as Vercel instructs.
   GitHub Pages is no longer used. Disable it under the repository's **Settings → Pages**
   once the domain points to Vercel.

Old `.html` URLs (e.g. `/about.html`, `/de/stack.html`) permanently redirect to the new paths.
