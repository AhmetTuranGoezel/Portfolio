# Portfolio — Ahmet Turan Gözel

Professional, bilingual (DE/EN) portfolio website. **Full Stack Developer & ERP Specialist.**

🌐 **Live:** https://turangoezel.is-a.dev

A fast, modern, fully static site — **no build step, no framework, no tracking.** Just open `index.html`.

## ✨ Features

- **Bilingual** — German / English toggle (preference saved in the browser)
- **Dark & light mode** — auto-detects system preference, toggleable
- **Sections** — Hero · About · Lebenslauf (timeline) · Skills · Projects · Video · Contact
- **Animated** — scroll reveals, animated skill bars, gradient hero
- **Responsive** — looks great from 320 px phones to widescreen
- **GDPR-friendly** — self-hosted fonts (no Google CDN), no cookies, privacy-mode YouTube, Impressum & Datenschutz pages
- **SEO** — Open Graph, Twitter cards, JSON-LD Person schema, sitemap

## 📂 Structure

```
.
├── index.html            # Main single-page site
├── impressum.html        # Legal notice (required in Germany)
├── datenschutz.html      # Privacy policy
├── css/style.css         # Full design system
├── js/main.js            # Theme, language, animations, form, projects
├── assets/
│   ├── fonts/            # Self-hosted woff2 (Inter, Plus Jakarta Sans, JetBrains Mono)
│   ├── img/              # Profile photos, OG image
│   └── docs/             # Lebenslauf & Arbeitszeugnis PDFs
├── CNAME                 # Custom domain (turangoezel.is-a.dev)
├── favicon.svg
├── robots.txt · sitemap.xml
└── .github/workflows/deploy.yml
```

## ✏️ How to personalise

| What | Where |
|------|-------|
| Profile photo | replace `assets/img/profile.jpg` (square) and `assets/img/profile-wide.jpg` |
| CV text / jobs | edit the timeline in `index.html` (section `#cv`) |
| Skills & levels | edit `data-level="…"` bars in `index.html` (section `#skills`) |
| Projects | edit the `projects` array in `js/main.js` |
| **Intro video** | set `data-video-id="YOUR_YOUTUBE_ID"` on `#videoFacade` in `index.html` |
| **Contact form** | get a free key at [web3forms.com](https://web3forms.com) and replace `YOUR_WEB3FORMS_ACCESS_KEY` in `index.html` |
| Impressum address | fill the placeholders in `impressum.html` |

## 🚀 Deployment

### GitHub Pages (recommended)
1. Push to the `main` branch.
2. Repo **Settings → Pages → Source: GitHub Actions**. The included workflow deploys automatically.
   *(Alternatively choose “Deploy from a branch → main / root”.)*

### Custom domain on is-a.dev
1. Fork [`is-a-dev/register`](https://github.com/is-a-dev/register).
2. Add `domains/turangoezel.json`:
   ```json
   {
     "owner": { "username": "AhmetTuranGoezel" },
     "records": { "CNAME": "ahmetturangoezel.github.io" }
   }
   ```
3. Open a pull request. After it's merged, set the custom domain in **Settings → Pages**.
   The `CNAME` file in this repo is already set to `turangoezel.is-a.dev`.

## 🖥️ Run locally

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

---

© Ahmet Turan Gözel. Fonts under the SIL Open Font License.
