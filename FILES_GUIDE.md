# 📁 Files Guide - What Each File Does

Quick reference for all files in the Catholic Daily Virtue PWA.

---

## 🎯 Essential Files

### `index.html` ⭐ (The App)
**The most important file - contains everything!**

What it does:
- Renders the lock screen phone mockup
- Displays today's Catholic quote
- Updates time every second
- Loads quotes from the database
- Shares quotes to friends
- Generates new quotes with AI
- Service Worker registration
- All CSS styling
- All JavaScript logic

Size: ~18 KB  
Edit this file to:
- Add/edit quotes
- Change colors
- Modify app behavior
- Update AI prompt

---

### `manifest.json` 🎨 (App Metadata)
**Tells phones/browsers how to install your app**

What it does:
- Defines app name: "Catholic Daily Virtue"
- Sets app icon (cross symbol)
- Describes the app
- Tells devices to display as "standalone" (full-screen)
- Sets theme colors
- Defines app shortcuts
- Enables share functionality

Size: ~2 KB  
Edit this file to:
- Change app name
- Change app description
- Modify colors
- Add/remove shortcuts

**Without this file:** App can't be installed on home screens

---

### `sw.js` 🔄 (Service Worker - Offline Magic)
**Handles offline functionality and caching**

What it does:
- Caches all essential files on first load
- Serves cached files when offline
- Updates cache when online
- Handles API calls smartly
- Enables push notifications (optional)
- Background sync

Size: ~5 KB  
This file enables:
- ✅ Works offline
- ✅ Instant loading (cached)
- ✅ Automatic updates
- ✅ Background syncing

**Without this file:** App doesn't work offline

---

## 📚 Documentation Files

### `README.md` 📖 (Main Documentation)
**The "how to use" guide for your app**

What it does:
- Explains features
- Installation instructions
- Customization guide
- Troubleshooting
- Deployment instructions

**Where it appears:** On GitHub repo homepage

---

### `GITHUB_SETUP.md` 🚀 (Step-by-Step Setup)
**Detailed walkthrough to deploy on GitHub Pages**

Includes:
- How to create GitHub repo
- How to add files
- How to enable GitHub Pages
- How to customize everything
- How to set up Claude API (optional)
- How to add to home screen
- Troubleshooting guide

**Use this file if:** You're deploying to GitHub Pages

---

### `FILES_GUIDE.md` 📋 (This File)
**Quick reference for what each file does**

---

## 🔧 Configuration Files

### `.gitignore` 🚫 (Tell Git What to Ignore)
**Tells GitHub what files NOT to upload**

What it does:
- Ignores `node_modules/` (if using Node)
- Ignores `.env` files (secret API keys)
- Ignores log files
- Ignores temporary files

Why it matters:
- Keeps repo clean
- Prevents uploading secrets
- Smaller repo size

---

## 📋 Optional/Future Files

These files aren't included yet but can be added:

### `robots.txt`
```
User-agent: *
Allow: /
```
Tells search engines to index your site.

### `sitemap.xml`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://your-site.github.io/</loc>
    <lastmod>2025-01-01</lastmod>
  </url>
</urlset>
```
Helps search engines find your app.

### `CNAME`
```
yourdomain.com
```
If using a custom domain (not GitHub Pages subdomain).

### `.github/workflows/deploy.yml`
For GitHub Actions CI/CD (automatic deployments).

---

## 🗂️ File Structure You'll See on GitHub

```
your-repo/
├── index.html          ⭐ Main app
├── manifest.json       🎨 App metadata  
├── sw.js              🔄 Service Worker
├── README.md          📖 Documentation
├── GITHUB_SETUP.md    🚀 Deployment guide
├── FILES_GUIDE.md     📋 This file
├── .gitignore         🚫 Git ignore
└── (other files)
```

---

## 🔄 How Files Work Together

### When user visits your app:

1. Browser downloads `index.html`
   - Displays lock screen mockup
   - Loads today's quote from database

2. Browser reads `manifest.json`
   - Enables "Add to Home Screen" button
   - Sets app icon and name

3. `sw.js` registers automatically
   - Caches files
   - Enables offline mode
   - Sets up auto-updates

4. App is instantly installed on home screen
   - Works like a native app
   - Updates daily at midnight
   - Works offline

---

## 📊 File Purposes by Feature

### Display Today's Quote
- **Main code:** `index.html` (loadTodayQuote function)
- **Quote data:** `index.html` (QUOTE_DATABASE array)
- **Metadata:** `manifest.json`

### Daily Auto-Update
- **Main code:** `index.html` (checkMidnightUpdate function)
- **Timing:** JavaScript `setInterval()`

### Offline Functionality
- **Main handler:** `sw.js`
- **Triggers:** `navigator.serviceWorker.register()`

### Install on Home Screen
- **Required:** `manifest.json`
- **Optional:** `sw.js` (makes offline possible)
- **UI:** `index.html` (install button)

### Share Quote
- **Code:** `index.html` (shareQuote function)
- **API:** `navigator.share()` (built-in browser API)

### Generate AI Quote
- **Code:** `index.html` (generateNewQuote function)
- **API:** Claude API by Anthropic
- **Note:** Requires backend (see GITHUB_SETUP.md)

---

## 🎯 Quick Edit Reference

| To Change | Edit File | What to Look For |
|-----------|-----------|-----------------|
| App name | `manifest.json` | `"name":` field |
| App icon | `manifest.json` | `"icons":` array |
| Colors | `index.html` | CSS section, `#d4af37`, `#1a1a2e` |
| Quotes | `index.html` | `QUOTE_DATABASE` array |
| App description | `manifest.json` | `"description":` field |
| Feature behavior | `index.html` | JavaScript functions |
| Offline caching | `sw.js` | Cache strategies |
| GitHub instructions | `GITHUB_SETUP.md` | Relevant section |

---

## 📦 File Sizes

| File | Size | Type |
|------|------|------|
| `index.html` | ~18 KB | Essential |
| `manifest.json` | ~2 KB | Essential |
| `sw.js` | ~5 KB | Essential |
| `README.md` | ~12 KB | Documentation |
| `GITHUB_SETUP.md` | ~15 KB | Documentation |
| `FILES_GUIDE.md` | ~8 KB | Documentation |
| `.gitignore` | ~0.5 KB | Config |

**Total app size: ~25 KB** (without documentation)

This is incredibly small! Most websites are 2-5 MB. Your app loads in milliseconds.

---

## ✅ Minimum Files Needed

To have a working app, you MUST have:
- ✅ `index.html`
- ✅ `manifest.json`
- ✅ `sw.js`

Everything else is optional documentation.

---

## 🚀 Deploy Checklist

Before pushing to GitHub:

- [ ] `index.html` - Main app code
- [ ] `manifest.json` - App metadata
- [ ] `sw.js` - Service Worker
- [ ] `README.md` - How to use
- [ ] `.gitignore` - Git configuration
- [ ] (Optional) `GITHUB_SETUP.md` - Setup guide
- [ ] (Optional) `FILES_GUIDE.md` - Reference

All provided files are production-ready. Just push to GitHub!

---

## 🎓 Learning Resources

### To understand each file better:

**HTML/CSS/JavaScript:**
- MDN Web Docs: https://developer.mozilla.org

**PWA Development:**
- Google PWA Guide: https://web.dev/progressive-web-apps/
- MDN PWA: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps

**Service Workers:**
- MDN Service Workers: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API

**Web Manifest:**
- MDN Manifest: https://developer.mozilla.org/en-US/docs/Web/Manifest

**GitHub Pages:**
- GitHub Pages Docs: https://docs.github.com/en/pages

---

## 💡 Pro Tips

### For Maximum Compatibility:
- Keep file names **lowercase** (github.com is case-sensitive)
- Don't use spaces in file names
- Use `.js` for JavaScript, `.json` for JSON, `.md` for Markdown

### For Easy Updates:
- All quote data is in `index.html`
- To add 100 quotes, just copy-paste into `QUOTE_DATABASE`
- Changes to `index.html` go live in 1 minute

### For Debugging:
- Open browser DevTools: `F12` or `Cmd+Option+I`
- Check Console for errors
- Check Application → Service Workers to see caching
- Check Network tab to see what's being cached

---

## 📞 Questions About Files?

If you're not sure about a file:

1. Check this guide (you're reading it!)
2. Check the README.md
3. Check the comments inside the file
4. Open a GitHub Issue
5. Ask Claude (me!)

---

## ✝ You're All Set!

All files are production-ready. Just:

1. Push them to GitHub
2. Enable GitHub Pages
3. Share the link

That's it! Your app is live.

**Deo gratias.** ✝
