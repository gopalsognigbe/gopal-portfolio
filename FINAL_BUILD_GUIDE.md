# 🚀 Gopal Portfolio — Final Build Guide

Everything you need, in order. Follow this document from top to bottom.

---

## ✅ What you have (5 files already ready)

| File | Purpose |
|---|---|
| `src/App.jsx` | Complete portfolio — all sections, all components |
| `src/index.css` | Google Fonts + Tailwind + scrollbar style |
| `tailwind.config.js` | Design tokens (colors, fonts) |
| `.cursorrules` | Teaches Cursor AI your design system |
| `FINAL_BUILD_GUIDE.md` | This document |

---

## STEP 1 — Prerequisites

Make sure you have installed:
- **Node.js** v18+ → https://nodejs.org
- **Cursor** → https://cursor.sh
- **Git** → https://git-scm.com

Check with:
```bash
node -v    # should show v18 or higher
npm -v     # should show 9 or higher
```

---

## STEP 2 — Create the project with Vite

Open your terminal and run these commands one by one:

```bash
# 1. Create the Vite + React project
npm create vite@latest gopal-portfolio -- --template react

# 2. Enter the folder
cd gopal-portfolio

# 3. Install base dependencies
npm install

# 4. Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer

# 5. Initialize Tailwind
npx tailwindcss init -p
```

---

## STEP 3 — Open in Cursor

```bash
cursor .
```

This opens the project in Cursor. You will see the default Vite files.

---

## STEP 4 — Copy your 4 files

Replace the generated files with the ones you downloaded.
Copy them exactly to these paths inside `gopal-portfolio/`:

```
gopal-portfolio/
├── .cursorrules              ← copy here (root of project)
├── tailwind.config.js        ← replace the generated one
└── src/
    ├── App.jsx               ← replace the generated one
    └── index.css             ← replace the generated one
```

Then **delete** these files — they are not needed:
```bash
rm src/App.css
rm -rf src/assets
```

---

## STEP 5 — Verify Tailwind is wired

Open `index.html` (already at root) — make sure it looks like this:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>gopal.dev</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

Open `src/main.jsx` — make sure it imports App correctly:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

---

## STEP 6 — Run the dev server

```bash
npm run dev
```

Open http://localhost:5173 — you should see your portfolio with:
- ✅ Animated neural network in the hero
- ✅ Navy background with amber accents
- ✅ 3 project cards with browser mockup previews
- ✅ Stack section, About, Contact, Footer

---

## STEP 7 — Customize your content

Open `src/App.jsx` in Cursor and update these 6 things:

### 7.1 — Your name / domain (line ~130)
```jsx
// In Navbar:
<a href="#">gopal.dev</a>   // ← replace with your real domain or name

// In Footer:
<span>© 2025 gopal.dev</span>  // ← same
```

### 7.2 — Hero headline (line ~145)
```jsx
<p className="font-mono ...">
  // AI Student · Freelance Dev · Bénin   ← keep or edit
</p>
<h1>
  Building the <span>future</span>
  with code & intelligence   ← keep or edit
</h1>
<p>
  M2 AI student at ESGIS, Cotonou...   ← keep or edit
</p>
```

### 7.3 — About section (line ~180)
Update the 3 paragraphs with your real bio text.

### 7.4 — Contact links (line ~260)
```jsx
href="mailto:your@email.com"           // ← your real email
href="https://github.com/your-username" // ← your GitHub
href="https://linkedin.com/in/your-profile" // ← your LinkedIn
```

### 7.5 — Your projects (lines 7–55)
Fill in the `PROJECTS` array. See Step 8 below.

### 7.6 — Your tech stack (lines 57–80)
Update the `STACK` array with your real tools.

---

## STEP 8 — Add your vibe-coded sites

In `src/App.jsx`, find the `PROJECTS` array at the top.
For each of your vibe-coded sites, add a new object:

```js
{
  id: 4,                          // increment the number
  featured: false,
  tag: "Vibe · React",            // short label — e.g. "Landing · HTML" / "App · Next.js"
  tagColor: "accent",
  title: "Your Site Name",
  description: "What it does in one or two sentences. Be specific.",
  stack: ["React", "Tailwind"],   // your real tech
  link: "https://yoursite.vercel.app",   // live URL — used for auto preview
  github: "https://github.com/you/repo",
  screenshot: null,               // null = auto-screenshot from link (free)
},
```

### How the site preview works

| Situation | What happens |
|---|---|
| `link` is a real URL, `screenshot: null` | microlink.io auto-generates a screenshot for free |
| `screenshot: "/previews/mysite.png"` | uses your PNG (faster, recommended for final deploy) |
| `link: "#"` and `screenshot: null` | shows "Preview coming soon" placeholder |

**To add a manual screenshot:**
1. Go to your live site
2. Press `Cmd/Ctrl + Shift + 4` and take a screenshot of the browser window
3. Save as PNG in `public/previews/mysite.png`
4. Set `screenshot: "/previews/mysite.png"` in the project object

---

## STEP 9 — Use Cursor AI to extend the portfolio

With `.cursorrules` in your project root, Cursor knows your full design system.
Open Cursor AI chat (`Cmd/Ctrl + L`) and try these prompts:

```
Add scroll-reveal animations to the Projects section using Framer Motion
```
```
Add a mobile hamburger menu to the Navbar that closes on link click
```
```
Add a "Filter by tag" row above the Projects grid (All / AI / Vibe / Finance)
```
```
Extract ProjectCard into its own file src/components/ProjectCard.jsx
```
```
Add a scroll-to-top button that appears after scrolling 500px
```
```
Make the hero section show a typing animation for the subtitle
```

---

## STEP 10 — Deploy on Vercel (free, 2 minutes)

### Option A — Via GitHub (recommended, auto-deploys on every push)

```bash
# In your project folder:
git init
git add .
git commit -m "init: gopal portfolio"
git branch -M main
git remote add origin https://github.com/your-username/gopal-portfolio.git
git push -u origin main
```

Then go to https://vercel.com → "Add New Project" → import your GitHub repo → Deploy.
Your site will be live at `https://gopal-portfolio.vercel.app` in ~60 seconds.

### Option B — Direct drag and drop (fastest)

```bash
npm run build
```

Go to https://vercel.com → drag and drop the `dist/` folder.

### Custom domain (optional)
In Vercel dashboard → Settings → Domains → add `gopal.dev` or any domain you own.

---

## STEP 11 — Add to your CV

In the **Projects** section of your CV, write:

```
Portfolio Website                              gopal.dev (or your Vercel URL)
Personal showcase of AI and front-end projects built with React, Vite, and Tailwind CSS.
Features a live RAG legal assistant (M2 thesis), DramaBot, and vibe-coded web applications.
```

Then list each key project individually below it:

```
Legal RAG Assistant — LangGraph · Mistral · ChromaDB · FastAPI
Comparative study of Dense/Sparse/Hybrid retrieval for Beninese law (M2 Thesis, 2025)

DramaBot — React · LangGraph · ChromaDB · FastAPI
RAG chatbot for Asian drama discovery with MMR retrieval and streaming UI

[Your vibe-coded sites...]
```

---

## Design system — quick reference

| Token | Value | Use |
|---|---|---|
| `bg` | `#0D0F1A` | Main background |
| `surface` | `#141727` | Cards, sections |
| `border` | `#1E2438` | All borders |
| `accent` | `#F59E0B` | Amber — CTAs, highlights |
| `accent-2` | `#818CF8` | Indigo — featured/thesis |
| `body` | `#F8FAFC` | Primary text |
| `muted` | `#64748B` | Secondary text |
| Font sans | Space Grotesk | Headings and body |
| Font mono | JetBrains Mono | Tags, labels, code |

---

## Checklist before sharing your CV

- [ ] Real name / domain in Navbar and Footer
- [ ] Real email, GitHub, LinkedIn in Contact section
- [ ] All project `link` fields pointing to real deployed URLs
- [ ] All your vibe-coded sites added to `PROJECTS` array
- [ ] About section bio updated
- [ ] Site deployed on Vercel
- [ ] Portfolio URL added to your CV
- [ ] Each key project listed individually on your CV

