# 🌌 PhD Quest — Galactic Academy Tracker v2

**Premium Star Wars-themed PhD & Career Intelligence Tracker**
Built for Data Science and Cybersecurity PhD seekers targeting Germany, Switzerland, and Europe.

## ✨ What's New in v2

- **Single file** — everything in `index.html`, no subfolder confusion
- **Premium design** — Inter font, cleaner cards, better contrast and readability
- **10 Job Portals** — direct links to Academics.com, Euraxess, LinkedIn Germany, Indeed DE, Swiss Job Radar, DAAD, ENISA, Helmholtz, ResearchGate, and Make it in Germany
- **Daily AI News** — Claude API generates 12 fresh PhD/job items every session
- **12 Static fallback articles** — works offline too

## 🚀 Deploy to GitHub Pages

### Upload via GitHub browser
1. Go to [github.com](https://github.com) → New repository → `phd-tracker` (Public)
2. Click **uploading an existing file**
3. Upload `index.html` and the `.github` folder
4. Go to **Settings → Pages → Source: GitHub Actions**
5. Live at `https://YOUR_USERNAME.github.io/phd-tracker`

### Via VS Code
```bash
git init
git add .
git commit -m "Launch v2: Galactic Academy PhD Tracker"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/phd-tracker.git
git push -u origin main
```

## 📁 File Structure

```
phd-tracker/
├── index.html           ← Everything in one file
├── README.md
└── .github/
    └── workflows/
        └── deploy.yml   ← Auto-deploys on push
```

## 🤖 AI News Feed

Powered by Claude API — generates contextual, daily-fresh news about:
- PhD admissions at ETH, EPFL, TU Munich, KIT, Max Planck
- Data Science & Cybersecurity jobs in Germany/Switzerland
- DAAD, SNF, Marie Curie scholarships
- EU research funding and visa updates

## 🗂️ Features

| Feature | Details |
|---|---|
| Mission Control | Profile with Force Level progress bar |
| Quest Log | 25+ PhD prep checklist items + custom missions |
| Intelligence Feed | AI-powered daily news, filterable |
| Mission Dossiers | Application tracker with status dots |
| Universe Map | 10 PhD programs + 8 career posts |
| Job Portals | 10 direct links to EU job sites |
| Deadline Timeline | Countdown with urgency color coding |
| Rebel Archives | 6 key scholarship/funding links |

---
*May the Force be with your application.*
