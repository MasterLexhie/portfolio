# Personal Portfolio

Personal portfolio site. Built to showcase work and convert visitors into leads.

## Stack

- **Next.js 16** (App Router, TypeScript)
- **Payload CMS 3** (self-hosted, embedded in the Next.js app)
- **Neon** (managed Postgres)
- **Tailwind CSS 4**

## Project structure

```
app/
  (frontend)/       Public pages — homepage, /work, /work/[slug], /about
  (payload)/        Payload admin panel at /admin
  api/contact/      Contact form endpoint (Resend)

src/
  collections/      Payload collections — Projects, Testimonials, Media
  components/       UI components
  lib/data.ts       Data layer (Payload queries)
```

## Running locally

```bash
git clone <repo-url> && cd portfolio
pnpm install
cp .env.example .env.local   # fill in values below
pnpm dev
```

### Environment variables

| Variable | Description |
|---|---|
| `DATABASE_URI` | Neon Postgres connection string |
| `PAYLOAD_SECRET` | Random string, min 32 characters |
| `NEXT_PUBLIC_SERVER_URL` | Deployed URL (e.g. `http://localhost:3000`) |
| `RESEND_API_KEY` | Resend API key for contact form emails |
| `CONTACT_EMAIL` | Where contact form submissions are sent |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis URL (contact form rate limiting) |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis token |

## Content model

Projects and case studies share a single `projects` collection. A project becomes a **case study** when the `problem`, `solution`, and `result` fields are populated — otherwise it renders as a lightweight project card linking to external URLs.

CMS admin is available at `/admin` after creating an account on first visit.
