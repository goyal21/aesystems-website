# AE Systems — Corporate Website

**Live site:** [www.aesystems.in](https://www.aesystems.in) — Next.js rebuild (cut over from GitHub Pages 2026-08-02)

---

## Changelog

### 2026-08-07 — Blog CMS, Phase 3 (public /blog pages + SEO)

- `/blog` (listing) and `/blog/[slug]` (detail) now exist in the Next.js app — `content/blog/*.mdx` files with YAML frontmatter, rendered at build time via `next-mdx-remote/rsc`'s `compileMDX` inside `generateStaticParams`, fully compatible with `output: "export"` (nothing renders at request time). `lib/blog.ts` (`getAllPosts()`/`getPostBySlug()`, using `gray-matter` + `reading-time`) is the shared read path for the pages and `app/sitemap.ts`, which now includes `/blog` and every post URL. `lib/structuredData.ts` gained `blogPostingJsonLd()` following the existing pattern; post pages use it alongside the existing `Breadcrumbs`/`ContactCta`/`JsonLd` components, matching `/case-studies/iit-jammu`'s structure.
- Seeded two real posts (not placeholders) to prove the pipeline end-to-end: "How to Reduce HVAC Energy Consumption in Commercial Buildings" and "BMS vs AI-BMS: What's the Difference?" — general educational content plus the already-published IIT Jammu/SAAR numbers, nothing new invented.
- MDX body styling: `prose` classes would need the Tailwind Typography plugin, which isn't installed — added a small `.blog-body` rule set to `app/globals.css` instead, using the site's existing design tokens, rather than pulling in a new dependency for this.
- Fixed a bug found while wiring this up: Phase 1's publish route baked the literal git commit path (`/public/blog/<slug>/cover.ext`) into the post's `coverImage` frontmatter, but Next's static export serves `public/`'s contents from the site root — the real URL is `/blog/<slug>/cover.ext` (no `public` segment). Any post published before this fix would have had a broken cover image; none had been published yet, so no live content was affected.
- Fixed a second, unrelated bug this surfaced: root `tsconfig.json`'s `include` (`**/*.tsx`) was picking up `cms/admin`'s files too, since it's nested under the repo root — `next build`'s typecheck step failed on `cms/admin/src/main.tsx` as a result. `cms` is now excluded from the root TypeScript project; `cms/admin` and `cms/server` already have their own separate `tsconfig.json`s.
- Verified: `npm run build` passes clean (TypeScript + static generation), both post pages and the listing page render correctly in `out/`, sitemap.xml includes the new URLs, JSON-LD `BlogPosting` schema present and valid, internal cross-post link resolves. `npm run lint` still fails with the same pre-existing ESLint 9 / eslint-config-next circular-JSON config error noted in the Phase 1 entry — unrelated to this work.

### 2026-08-07 — Blog CMS, Phase 2 (admin UI)

- New `cms/admin` — a Vite + React + TypeScript SPA (own `package.json`, no impact on the Next.js build) implementing the admin panel from Phase 1's API: login screen, sidebar (Blogs, Master Data → Authors — the reference screenshot's Jobs/Applicants/Case Studies items weren't carried over, they're specific to the other product the screenshot was taken from), a post list, a "Write a new post" editor (title with auto-derived-but-editable URL slug, Author dropdown, drag/drop cover image upload with client-side preview, comma-separated Categories/Tags, Excerpt, Markdown body with a toggleable rendered preview via `marked`), debounced autosave, and Publish with polling for deploy status.
- `cms/server` now serves the built `cms/admin/dist` as static assets at `/` when present, so the whole CMS is one deployable/one process, matching the plan.
- Dependency note: `react-router-dom` is pinned to the 7.x line deliberately — v8 dropped the separate `react-router-dom` package (folded into `react-router` itself), and a `npm audit` finding against 7.x (GHSA-qwww-vcr4-c8h2) is specific to RSC/data-router "action" mode, which this plain client-side SPA doesn't use (no server components, no route actions) — migrating to v8 wasn't judged worth it for a non-applicable advisory at this stage.
- Verification caveat: `npm run build` is clean (no TS errors) and every backend endpoint the UI calls was exercised end-to-end via the exact request shapes the UI sends (login, draft create/autosave, authors list, deploy-status). The Chrome browser extension wasn't connected in this environment, so the actual rendered UI has **not** been visually verified in a real browser — that's still outstanding before calling Phase 2 done.

### 2026-08-07 — Blog CMS, Phase 1 (backend core)

- New `cms/server` — a standalone Express + TypeScript service (separate `package.json`/deps, isolated from the Next.js build) that will back a blog admin panel for the marketing team. Architecture: git remains the source of truth for published posts (MDX files committed to `preprod`); this backend only holds admin-side operational state (drafts-in-progress, the Authors list, login sessions) in a local SQLite file, using Node's built-in `node:sqlite` rather than `better-sqlite3` — the latter needs native compilation via node-gyp, which isn't available on this dev machine (no VS C++ Build Tools) and would add unnecessary deploy risk on the VM too.
- Shared-login auth (bcrypt + session, with a basic in-memory brute-force throttle on `/api/auth/login`), an image upload endpoint (validates real file type via magic bytes, resizes to ~1600px and re-encodes to WebP — matters more than usual here since `images.unoptimized: true` means whatever's committed is served byte-for-byte), and a GitHub Git Data API commit builder that lands a post's MDX file + images as a single atomic commit and then triggers the existing `deploy-production.yml` workflow. The commit builder has an application-level rail: it refuses to write anywhere outside `content/blog/**` / `public/blog/**`, regardless of what a request contains.
- Found and fixed a real bug during testing: an async route handler's rejected promise wasn't caught, which crashed the entire Node process (reproduced with a bad GitHub token during a local publish test). Fixed with a shared `asyncHandler` wrapper applied to every async route plus a global Express error-handling middleware, so a failed request now returns a clean JSON 500 instead of taking the whole server down.
- Not yet done: a live end-to-end publish test against the real GitHub repo (needs a fine-grained PAT that hasn't been provisioned yet — deferred to Phase 4, CMS infra/deploy). Everything else in Phase 1 was verified locally (auth, session, draft CRUD, image upload, and the crash fix) using a placeholder token.
- Full plan for the remaining phases (admin UI, public `/blog` pages + SEO, CMS deploy infra) is at `C:\Users\Amit\.claude\plans\iterative-seeking-origami.md`.

### 2026-08-07 — CI-based production deploy

- Added `.github/workflows/deploy-production.yml`: a `workflow_dispatch`-only GitHub Actions workflow that builds the Next.js static export and deploys it to the Oracle VM over SSH, then purges Cloudflare's cache and verifies the origin/public response — the same steps the manual process below does, just automated. It only runs when someone manually clicks "Run workflow" in the Actions tab (no `push` trigger), so pushing commits never deploys by itself.
- Requires repo secrets `PROD_SSH_KEY` (private key for `ubuntu@80.225.194.115`), `CLOUDFLARE_ZONE_ID`, and `CLOUDFLARE_API_TOKEN` to be set under Settings → Secrets and variables → Actions.
- The workflow file is also present on `main` (GitHub only lists `workflow_dispatch` workflows in the Actions UI if they exist on the default branch) — `main` itself still holds the old legacy static site, only `preprod` has the current Next.js app. Run the workflow selecting the `preprod` branch as the ref.
- The manual local-build-and-scp process (below) still works and remains the fallback if CI access isn't available.

### 2026-08-03 — Mobile case studies / industries redesign + `test.aesystems.in` retirement

**Deployment workflow change**
- `test.aesystems.in` DNS record has been deleted — it's no longer reachable and is retired as a staging domain. `aesystems.in` is now the only live domain (proxied through Cloudflare to the Oracle VM origin).
- GitHub is no longer part of the deploy path at all (the `preprod-pages.yml` GitHub Actions workflow is unused/vestigial). Deploys go straight from a local build to the Oracle VM over SSH.
- **New workflow going forward:** make changes → verify with `npm run dev` on localhost → once approved, `npm run build` and deploy the `out/` directory straight to `/var/www/aesystems.in` on the production VM. See the Deployment section below for the exact steps.

**Case Studies (mobile)**
- Mobile card view was one long vertical scroll of full case-study detail per card. Replaced with a compact card (category, status, logo, client name, headline stat) plus a "View details" link that opens a bottom-sheet with the full Challenge/Solution/Outcome and tags. Desktop/tablet layout unchanged.
- Carousel is now swipeable (left/right drag) on top of the existing arrow-button navigation.

**Industries (mobile)**
- Mobile grid was 3 static rows of 2 images with no way to see more. Replaced with 2 swipeable rows of 3 (native horizontal scroll + snap), Data Centers closing row 1 and Airports closing row 2. Desktop/tablet keeps the original static 3-column grid and original ordering.
- Added a right-edge fade gradient + narrower card width so the next card visibly peeks in, signaling that the row is swipeable.

**Cloudflare security cleanup**
- Consolidated down to a single API token (`CLOUDFLARE_SCOPED_TOKEN`, stored as a Windows user env var, never in this repo), resource-scoped to the `aesystems.in` zone only, permissioned for just Cache Purge / Zone Settings / SSL & Certificates / DNS. Revoked two prior account-owned tokens that had all-permission-groups, account-wide access (one unused since creation, one pasted directly into a chat session).
- Zone hardening: SSL mode `full` → `strict` (origin already had valid certs), Always Use HTTPS turned on, min TLS version raised 1.0 → 1.2, DNSSEC enabled on Cloudflare's side (status `pending` until a DS record is added at the domain registrar — outside Cloudflare, so outside this repo's/session's reach).

### 2026-08-02 — Production cutover + preprod content pass

**Production cutover**
- `aesystems.in` / `www.aesystems.in` DNS switched from GitHub Pages to the Oracle VM; dedicated nginx server block + Let's Encrypt cert issued for the production domain (previously only `test.aesystems.in` had a cert — production briefly rode on the preprod vhost as nginx's default fallback via Cloudflare's proxy masking the cert mismatch, now fixed with its own vhost/cert).
- `public/CNAME` (GitHub Pages artifact) removed; README hosting/deployment sections updated to reflect the VM + nginx setup instead of GitHub Pages.
- GitHub Pages should still be disabled in the repo's Settings → Pages to fully retire that path (not done via this session — no `gh` CLI available in the sandbox).

**SEO**
- Google Analytics (`G-DPT283QL6C`) restored — was present on the legacy site but missing entirely from the Next.js rebuild.
- `/sitemap.xml` and `/robots.txt` now generated natively via `app/sitemap.ts` / `app/robots.ts` instead of a stale static `robots.txt` pointing at a sitemap that never existed.

**Case Studies**
- Rewrote all card copy and added a 6th case study (metro rail underground station AHU) using the client's real project data.
- Redesigned cards with a Challenge / Solution / Outcome structure, a large stat number, and a Live / Validated POC status badge, adapted from a reference design the client supplied — kept the site's existing dark-card carousel rather than switching to the reference's light-theme all-visible-at-once grid.
- Fixed a layout bug where cards without a client logo had their content start higher than cards with one, misaligning everything below across a row — the logo slot is now always reserved at a fixed height regardless of whether a logo exists.
- Fixed mobile showing two cards stacked instead of one at a time (carousel page size is now viewport-responsive).

**Platform section**
- Replaced the programmatically-generated architecture-loop GIF with a client-supplied MP4 (native `<video>` loop instead of an `<img>` GIF).
- Pump and cooling tower icons rebuilt on P&ID conventions with working rotation animation (two subtle CSS bugs fixed along the way: an `animation` shorthand specificity collision, and a CSS `transform` silently replacing an SVG's positioning `transform` attribute instead of composing with it).

**See It In Action**
- Replaced all placeholder/mismatched imagery with real product photography and a real dashboard recording; removed the old auto-rotating single-image carousel in favor of a static grid (wide column for GIFs, narrower column for product photos).

**Site-wide**
- Reduced the hero and all section headings to a smaller consistent size; removed the stats bar under the hero video and the "Read the full story" case-study CTA.
- Fixed section background rhythm — Industries and Why AE Systems switched from white to dark so the page alternates properly instead of three white sections running together.
- Nav reordered so Industries comes before Platform, matching the actual on-page scroll order.
- Added a real site photo (chiller plant + SAAR controller wired to a VFD) to the Why AE Systems section, replacing a placeholder box.

### 2026-08-01 — Next.js preprod rebuild

**Added**
- Homepage + Partners page rebuilt in Next.js 16 (App Router, TypeScript, Tailwind v4, static export) per the AE Systems design handoff — kept entirely on the `preprod` branch; `master`/production untouched.
- Sections: Hero (full-bleed video loop), Built With (SAAR/IIT Jammu), Industries, Platform, See It In Action, Case Studies, Why AE Systems, Get In Touch, FAQ, Footer.
- Platform section capability cards now use real product imagery with a static architecture-loop GIF (`design/saar-architecture-loop.html` → exported GIF, 1920×864, 24fps, 5s seamless loop) replacing the earlier placeholder diagram.
- Organization + LocalBusiness + FAQPage JSON-LD structured data, per-section anchor IDs, `prefers-reduced-motion` support throughout.

**Integrations**
- Preprod deployed to `test.aesystems.in`, hosted on an Oracle Cloud VM (nginx + Let's Encrypt, auto-renewing SSL).
- GitHub Actions workflow (`.github/workflows/preprod-pages.yml`) added for a GitHub Pages deploy path (currently secondary — the VM is the primary preprod host, since GitHub Pages only supports one custom domain per repo and `master` needs that slot for production).
- Cloudflare API integration (scoped cache-purge-only token) for on-demand CDN cache invalidation after deploys.

**Fixed**
- Production `aesystems.in` outage: apex DNS `A` records were pointed at GitHub Pages' IPs, but GitHub Pages was never actually enabled on the repo — diagnosed and documented the fix (Settings → Pages → Source: Deploy from a branch → `master`).
- Nginx cache headers on the preprod server: plain-named assets (images, video, the architecture GIF) were incorrectly cached as `immutable` for 30 days, so in-place updates never propagated through Cloudflare. Now only Next.js's content-hashed `_next/static/*` build output gets long-lived immutable caching; plain-named assets get a short cache instead.
- "Already a registered partner" banner overlapping the nav on `/partners` (a CSS specificity collision between a custom utility class and a Tailwind override).
- Architecture-loop animation: a missing equipment node at loop start (animation-delay caused one node to render invisible on the very first frame), an upside-down bar chart (bars were anchored to a fixed top edge instead of a shared baseline), and pulse-travel that moved box-by-box instead of simultaneously across all four equipment lines.

**Repo reorganization**
- Old static site (`index.html`, `style.css`, `script.js`, `partners.html`, `.htaccess`, `CNAME`, `robots.txt`) moved to `legacy/` — preserved as-is, not deleted, excluded from git.
- Raw/source assets (unprocessed hero video, original photos) live in `assets/` (repo root) — excluded from git; the processed copies actually used by the site live in `public/assets/`.

Marketing and lead-generation website for **Avenix Engineering Systems Pvt Ltd (AE Systems)** — an AI-powered HVAC optimisation company and authorised national partner for SAAR System Solutions, an IIT Jammu-incubated deep-tech startup.

AE Systems' IT infrastructure / IT-OT convergence business has been intentionally spun out into a separate company. This website positions AE Systems exclusively as an AI HVAC optimisation platform — no IT infrastructure, ELV, or system integration content should be added back here.

---

## About the Business

AE Systems brings SAAR — an AI platform for HVAC energy optimisation — to hotels, hospitals, factories, offices and other commercial buildings across India.

**Core product:** SAAR — a non-invasive, AI-powered platform that overlays existing chillers, AHUs, pumps, and VFDs to achieve 20–30% HVAC electricity savings without replacing equipment.

**Key credentials:**
- Validated at IIT Jammu campus (20%+ energy savings in live deployment)
- 12 patents filed
- 7+ active deployments
- 100% indigenous hardware and software (Make in India)
- Pan India field engineering and support

**Contact:** sales@aesystems.in · +91 98730 76300  
**Office:** WeWork Berger Delhi One, Sector 16B, Noida, UP 201301

---

## Website Structure

Single-page website with smooth-scroll navigation to the following sections:

| Section | ID | Purpose |
|---|---|---|
| Hero | `#hero` | Value proposition, key stats, primary CTAs |
| About | `#about` | Company overview, IIT Jammu partnership, credentials |
| Platform | `#platform` | Core AI HVAC optimisation feature cards |
| Dashboard + Digital Twin | `#dashboard` | Illustrative energy dashboard and digital twin preview |
| Problem | `#problem` | Four HVAC pain points addressed |
| Cost | `#cost` | "Cost of doing nothing" — quantified waste |
| Solution | `#solution` | How SAAR works — architecture and features |
| Why Us | `#why` | Competitive positioning against large OEMs and local integrators |
| Competitive | `#competitive` | Feature comparison table vs. other market offerings |
| Industries | `#industries` | Target verticals: hotels, hospitals, manufacturing, CRE, malls, airports, data centers, universities |
| Case Studies | `#clients` | Deployments: IIT Jammu (done), paint manufacturer + cold storage (live), two corporate pilots (upcoming) |
| Pilot Programme | `#pilot` | 30-day pilot programme with 4-step process |
| Process | `#process` | 5-phase go-live timeline (4 weeks site assessment to production) |
| FAQ | `#faq` | Common questions — installation, compatibility, data ownership, support |
| Final CTA | `#cta` | Closing call-to-action banner before the contact form |
| Contact | `#contact` | Enquiry form, email, phone, WhatsApp |

---

## Tech Stack

- **HTML / CSS / Vanilla JS** — no framework or build step
- **Google Fonts:** Space Grotesk (display), IBM Plex Sans (body), IBM Plex Mono (labels, stats, data)
- **Form handling:** [Formspree](https://formspree.io) (form ID: `xqedogwg`, submits to `sales@aesystems.in`)
- **Analytics:** Google Analytics 4 (`G-DPT283QL6C`)
- **Hosting:** Self-managed Oracle Cloud VM (nginx + Let's Encrypt), behind Cloudflare DNS/proxy

---

## Files

```
index.html      Main page (all sections, SEO meta, structured data)
style.css       All styles — design tokens, layout, components, responsive
script.js       Scroll animations, counter animations, ticker, form submit, WhatsApp handler
assets/
  logo.svg      Nav and footer logo
  favicon.svg   Browser tab icon (SVG)
  favicon.png   Browser tab icon (PNG) + Apple touch icon
  og-image.png  Open Graph / Twitter Card share image (1200×630)
  og-image.svg  SVG source for OG image
```

---

## JavaScript Features

- **Scroll progress bar** — thin top bar tracking page read progress
- **Nav shrink** — navbar gets a deeper shadow after 60 px scroll
- **Active nav link** — IntersectionObserver highlights the current section link
- **Scroll reveal animations** — fade-in, scale, left/right slide-in on all major elements
- **Animated counters** — numeric stats count up when the About section enters the viewport
- **Scrolling ticker** — injected marquee banner below the nav listing key capabilities
- **Parallax hero ring** — decorative ring shifts at 12% scroll speed
- **Contact form** — Formspree POST with success/error states and form reset on success
- **WhatsApp handler** — composes a pre-filled WhatsApp message from form data
- **Toast notifications** — bottom-right transient messages for form validation feedback
- **Mobile menu** — hamburger toggle with CSS open/close animation

---

## SEO

- Primary keyword targeting: BMS India, HVAC energy optimization, smart building India, HVAC automation Noida
- Geo meta tags: `IN-UP`, Noida (28.5355, 77.3910)
- Canonical URL: `https://www.aesystems.in/`
- Open Graph + Twitter Card tags with dedicated OG image
- Two JSON-LD structured data blocks: `Organization` and `Service` (schema.org)

---

## Local Development

No build step required. Open `index.html` directly in a browser, or serve locally:

```bash
npx serve .
# or
python -m http.server 8080
```

---

## Deployment

**Workflow: check on localhost first, then deploy to production.** There is no separate staging site anymore (`test.aesystems.in` is retired — DNS record deleted 2026-08-03); `aesystems.in` is the only live target, so verify changes with `npm run dev` locally before deploying.

### Option A — GitHub Actions (preferred)

1. Push your changes to the `preprod` branch on GitHub (`preprod` is the branch with the live Next.js app — `main` and `master` hold older/legacy code).
2. Go to the repo's **Actions** tab → **Deploy to Production (aesystems.in)** → **Run workflow** → branch `preprod` → **Run workflow**.
3. The workflow builds, deploys over SSH, purges Cloudflare, and verifies the origin + public response — watch the run log for the final `Public HTTP 200`.

Requires repo secrets `PROD_SSH_KEY`, `CLOUDFLARE_ZONE_ID`, `CLOUDFLARE_API_TOKEN` (Settings → Secrets and variables → Actions). This never runs on its own — it's `workflow_dispatch` only, so pushing/merging code never auto-deploys.

### Option B — Manual local build + SCP (fallback)

1. `npm run build` — Next.js static export, output to `out/`.
2. Copy `out/` to the server (SSH key: `.claude/ssh-key-2026-05-27.key`, user `ubuntu`, host `80.225.194.115`):
   ```bash
   tar -C out -cf - . | ssh -i ".claude/ssh-key-2026-05-27.key" ubuntu@80.225.194.115 "rm -rf /home/ubuntu/deploy-staging && mkdir -p /home/ubuntu/deploy-staging && tar -C /home/ubuntu/deploy-staging -xf -"
   ```
3. Move it into place with correct ownership (`ubuntu` has passwordless `sudo`; web root is owned by `www-data`):
   ```bash
   ssh -i ".claude/ssh-key-2026-05-27.key" ubuntu@80.225.194.115 "
     sudo cp -r /home/ubuntu/deploy-staging/. /var/www/aesystems.in/
     sudo chown -R www-data:www-data /var/www/aesystems.in
     sudo find /var/www/aesystems.in -type d -exec chmod 755 {} \;
     sudo find /var/www/aesystems.in -type f -exec chmod 644 {} \;
     sudo rm -rf /home/ubuntu/deploy-staging
     sudo nginx -t
   "
   ```
4. Verify the origin directly (bypasses Cloudflare's edge cache, since DNS resolves through Cloudflare's proxy IPs, not the VM's IP directly):
   ```bash
   curl -sk --resolve aesystems.in:443:80.225.194.115 -o /dev/null -w "HTTP %{http_code}\n" https://aesystems.in/
   ```
5. Purge the Cloudflare edge cache so the change is visible immediately (token scoped to cache-purge only, stored as `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ZONE_ID` user env vars — not in this repo):
   ```powershell
   $headers = @{ Authorization = "Bearer $env:CLOUDFLARE_API_TOKEN"; "Content-Type" = "application/json" }
   Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$env:CLOUDFLARE_ZONE_ID/purge_cache" -Method Post -Headers $headers -Body '{"purge_everything":true}'
   ```
6. Confirm publicly at `https://aesystems.in/` (normal path, through Cloudflare — not the `--resolve` override).

`cp` is used instead of `rsync`/`--delete` deliberately — it only overwrites/adds files, never deletes, so server-only files (`CNAME`, `.well-known/`) that aren't part of the local build are left alone.

**Cloudflare credentials** — stored only as Windows user environment variables on the dev machine, never in this repo:
- `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ZONE_ID` — scoped to cache-purge only. Use this for the routine purge step above.
- `CLOUDFLARE_ACCOUNT_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` — full account-level access (added 2026-08-03). Only use this for tasks the scoped token can't do (e.g. DNS changes); default to the scoped token otherwise.

---

## Formspree Setup (if reconfiguring)

1. Sign up at [formspree.io](https://formspree.io) and create a new form pointed at `sales@aesystems.in`
2. Copy the form ID (format: `xpwzabcd`)
3. In `script.js`, update the fetch URL: `https://formspree.io/f/<YOUR_FORM_ID>`
4. Save and push. Until configured, the Email button falls back to `mailto:` automatically.
