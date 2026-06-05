# AE Systems — Corporate Website

**Live site:** [www.aesystems.in](https://www.aesystems.in)

Marketing and lead-generation website for **Avenix Engineering Systems Pvt Ltd (AE Systems)** — an IT-OT convergence company and authorised national partner for SAAR System Solutions, an IIT Jammu-incubated deep-tech startup.

---

## About the Business

AE Systems delivers AI-driven HVAC intelligence, smart Building Management Systems (BMS), IT infrastructure, and ELV solutions to enterprise, industrial, and government customers across India.

**Core product:** SAAR AI-BMS — a non-invasive, AI-powered controller that overlays existing chillers, AHUs, pumps, and VFDs to achieve 20–30% HVAC electricity savings without replacing equipment.

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
| Services | `#services` | Three service groups: IT-OT Core, IT Infrastructure, ELV |
| Problem | `#problem` | Four HVAC pain points addressed |
| Cost | `#cost` | "Cost of doing nothing" — quantified waste |
| Solution | `#solution` | SAAR AI-BMS architecture and features |
| Why Us | `#why` | Competitive positioning against large OEMs and local integrators |
| Competitive | `#competitive` | Feature comparison table vs. other market offerings |
| Clients | `#clients` | Deployments: IIT Jammu (done), paint manufacturer + cold storage (live), two corporate POCs (upcoming) |
| POC Programme | `#poc` | 30-day proof-of-concept programme with 4-step process |
| Process | `#process` | 5-phase go-live timeline (4 weeks site assessment to production) |
| Contact | `#contact` | Enquiry form, email, phone, WhatsApp |

---

## Tech Stack

- **HTML / CSS / Vanilla JS** — no framework or build step
- **Google Fonts:** Poppins, Playfair Display, Barlow, Barlow Condensed
- **Form handling:** [Formspree](https://formspree.io) (form ID: `xqedogwg`, submits to `sales@aesystems.in`)
- **Analytics:** Google Analytics 4 (`G-DPT283QL6C`)
- **Hosting:** GitHub Pages (custom domain via `CNAME`)

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
CNAME           GitHub Pages custom domain → aesystems.in
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

The site is deployed via **GitHub Pages** with a custom domain. Push to the main branch to deploy. The `CNAME` file maps the repository to `aesystems.in`.

---

## Formspree Setup (if reconfiguring)

1. Sign up at [formspree.io](https://formspree.io) and create a new form pointed at `sales@aesystems.in`
2. Copy the form ID (format: `xpwzabcd`)
3. In `script.js`, update the fetch URL: `https://formspree.io/f/<YOUR_FORM_ID>`
4. Save and push. Until configured, the Email button falls back to `mailto:` automatically.
