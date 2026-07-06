# ✝ GitHub Setup Guide - Catholic Daily Virtue PWA

Deploy your Catholic Daily Virtue app to the world in **5 minutes** using GitHub Pages.

---

## 📋 What You'll Need

- ✅ A GitHub account (free)
- ✅ This repository files (provided)
- ✅ That's it!

---

## 🚀 Step 1: Create a GitHub Repository

### Option A: Fork This Repository (Easiest)

1. Go to: https://github.com/YOUR-USERNAME/catholic-daily-virtue
   - (This is where you want your repo to be)

2. Click **Fork** button (top right)
   - This creates your own copy

3. GitHub now shows your copy at:
   ```
   https://github.com/YOUR-USERNAME/catholic-daily-virtue
   ```

### Option B: Create New Repository (Manual)

1. Go to https://github.com/new
2. **Repository name:** `catholic-daily-virtue`
3. **Description:** "Daily Catholic Bible verses and Saint quotes on your lock screen"
4. **Public** (not private)
5. Click **Create repository**

---

## 📁 Step 2: Add Files to Your Repository

### If You Forked (Option A):

**Skip this step!** Files are already there. Go to Step 3.

### If You Created New Repo (Option B):

#### Method 1: Upload via Web (Easiest)

1. Go to your new repo: https://github.com/YOUR-USERNAME/catholic-daily-virtue

2. Click **Add file** → **Create new file**

3. For each file below, create it:

**First file: `index.html`**
   - Name it: `index.html`
   - Copy the entire contents from `index.html` (provided)
   - Paste into the editor
   - Scroll down, click **Commit changes** → **Commit directly to main branch**

**Second file: `manifest.json`**
   - Click **Add file** → **Create new file** again
   - Name it: `manifest.json`
   - Copy contents from `manifest.json`
   - Commit

**Third file: `sw.js`**
   - Click **Add file** → **Create new file** again
   - Name it: `sw.js`
   - Copy contents from `sw.js`
   - Commit

**Fourth file: `README.md`**
   - Click **Add file** → **Create new file** again
   - Name it: `README.md`
   - Copy contents from `README.md`
   - Commit

**Fifth file: `.gitignore`**
   - Click **Add file** → **Create new file** again
   - Name it: `.gitignore`
   - Copy contents from `.gitignore`
   - Commit

#### Method 2: Clone & Push (For Developers)

```bash
# Clone the repo you created
git clone https://github.com/YOUR-USERNAME/catholic-daily-virtue.git
cd catholic-daily-virtue

# Copy these files into this folder:
# index.html
# manifest.json
# sw.js
# README.md
# .gitignore

# Add, commit, and push
git add .
git commit -m "Add Catholic Daily Virtue PWA files"
git push origin main
```

---

## 🌐 Step 3: Enable GitHub Pages

1. Go to your repository: https://github.com/YOUR-USERNAME/catholic-daily-virtue

2. Click **Settings** (top right, after "Code" button)

3. In the left sidebar, click **Pages** (under "Code and automation")

4. Under "Build and deployment":
   - **Source:** Select "Deploy from a branch"
   - **Branch:** Select "main"
   - **Folder:** Select "/ (root)"

5. Click **Save**

6. GitHub will show a blue box:
   ```
   Your site is live at:
   https://YOUR-USERNAME.github.io/catholic-daily-virtue/
   ```

**Your app is now live!** 🎉

---

## ✅ Step 4: Test Your App

### On Desktop

1. Go to: https://YOUR-USERNAME.github.io/catholic-daily-virtue/

2. You should see:
   - Phone mockup with lock screen
   - Today's quote displayed
   - All buttons working

3. Test features:
   - ✅ Time updates in real-time
   - ✅ Quote displays correctly
   - ✅ Share button works
   - ✅ Generate AI Quote button works (if Claude API configured)

### On iPhone

1. Open Safari (not Chrome!)
2. Go to: https://YOUR-USERNAME.github.io/catholic-daily-virtue/
3. Tap **Share** button (bottom center)
4. Tap **Add to Home Screen**
5. Name it "Catholic Virtue"
6. Tap **Add**

**App now appears on your home screen!**

### On Android

1. Open Chrome
2. Go to: https://YOUR-USERNAME.github.io/catholic-daily-virtue/
3. Tap **⋮** (menu, top right)
4. Tap **Install app** (or **Create shortcut**)
5. Confirm

**App now appears on your home screen!**

---

## 🎨 Step 5: Customize Your App

### Change App Name

1. Go to your repo on GitHub
2. Click on `manifest.json` to open it
3. Click **Edit** (pencil icon)
4. Find this line:
   ```json
   "name": "Catholic Daily Virtue - Daily Bible Verses for Men",
   ```
5. Change the name
6. Scroll down, click **Commit changes**

### Change App Description

1. Same process as above
2. Find:
   ```json
   "description": "A new manly Catholic Bible verse or Saint quote appears on your lock screen every day..."
   ```
3. Change it
4. Commit

### Change Colors

1. Click on `index.html`
2. Click **Edit**
3. Find the section with CSS colors (search for `#d4af37` or `#1a1a2e`)
4. Change colors
5. Commit
6. Refresh your browser to see changes

### Add Your Own Quotes

1. Click on `index.html`
2. Click **Edit**
3. Search for: `const QUOTE_DATABASE = [`
4. You'll see an array of quote objects
5. Add new quotes like this:
   ```javascript
   { text: "Your quote here", source: "Saint Name or Bible Reference", type: "verse" },
   ```
6. Commit changes
7. Refresh your browser

**Types:**
- `"verse"` = Bible verse
- `"saint"` = Saint quote
- `"teaching"` = Catholic teaching

---

## 🤖 Step 6: Enable AI Quote Generation (Optional)

To allow the "Generate AI Quote" button to work:

### Get a Claude API Key

1. Go to https://console.anthropic.com
2. Sign up for free
3. Go to **API keys** section
4. Create a new API key
5. **Copy it** (you'll need it)

### WARNING: Security Issue

❌ **DON'T** paste your API key directly in the JavaScript!

The app currently makes API calls from the browser, which would expose your API key publicly. Anyone could see it and use up your credits.

### Proper Solution: Create a Backend

You need a simple backend server to hide your API key. Here are free options:

#### Option A: Vercel Serverless Functions (Easiest)

1. Create `api/generate-quote.js`:
```javascript
import Anthropic from "@anthropic-ai/sdk";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 200,
      messages: [
        {
          role: "user",
          content:
            "Generate ONE powerful, manly Catholic Bible verse or Saint quote for men. Format: Quote on first line, then Source on second line. No commentary.",
        },
      ],
    });

    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
```

2. Deploy to Vercel:
   - Go to https://vercel.com
   - Connect your GitHub repo
   - Add environment variable: `ANTHROPIC_API_KEY` = your API key
   - Deploy

3. Update `index.html` fetch URL:
```javascript
const response = await fetch("/api/generate-quote", {
```

#### Option B: Netlify Functions

Similar to Vercel. See: https://docs.netlify.com/functions/overview/

#### Option C: Flask Backend (Self-Hosted)

```python
from flask import Flask, jsonify
from anthropic import Anthropic
import os

app = Flask(__name__)
client = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

@app.route('/api/generate-quote', methods=['POST'])
def generate_quote():
    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=200,
        messages=[{
            "role": "user",
            "content": "Generate ONE powerful manly Catholic quote..."
        }]
    )
    return jsonify(message)

if __name__ == '__main__':
    app.run()
```

#### Option D: Node.js Backend

```javascript
const express = require('express');
const Anthropic = require("@anthropic-ai/sdk").default;

const app = express();
const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

app.post('/api/generate-quote', async (req, res) => {
  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 200,
    messages: [{
      role: "user",
      content: "Generate ONE powerful manly Catholic quote..."
    }]
  });
  res.json(message);
});

app.listen(3000);
```

### For Now: Disable AI Feature (Safe)

If you don't want to set up a backend, simply hide the AI button:

1. Click `index.html` → **Edit**
2. Find: `<button class="btn btn-primary" id="generateBtn"`
3. Add `display: none;` to its style
4. Commit

Or just leave it—it won't break anything.

---

## 📱 Step 7: Add to Home Screen

### iOS Lock Screen Widget

1. **Install the app first:**
   - Safari → https://YOUR-SITE
   - Share → Add to Home Screen

2. **Add to lock screen:**
   - Long-press your lock screen
   - Tap **Customize**
   - Scroll to bottom, tap **+**
   - Search for your app
   - Add the widget
   - Quotes now appear on lock screen!

### Android Lock Screen Widget

1. **Install the app first:**
   - Chrome → https://YOUR-SITE
   - Menu → Install App

2. **Add to lock screen (Android 13+):**
   - Long-press lock screen
   - Tap **Lock screen widgets** or **+**
   - Find your app
   - Add widget
   - Quotes now appear on lock screen!

---

## 🔄 Step 8: Updates & Maintenance

### To Update Quotes

1. Go to your repo
2. Click `index.html`
3. Click **Edit**
4. Find the `QUOTE_DATABASE` array
5. Add/edit quotes
6. Commit
7. **Changes go live in 1 minute!**

### To Update App Name/Description

1. Edit `manifest.json` on GitHub
2. Commit
3. Your users need to reinstall for new name/description

### To Fix Bugs

1. Edit the file on GitHub
2. Commit
3. App updates automatically

---

## 📊 Monitor Your Site

### GitHub Traffic

1. Go to your repo
2. Click **Insights** → **Traffic**
3. See how many people visit your app!

### Issues & Feedback

Users can open Issues on GitHub to:
- Report bugs
- Suggest new quotes
- Request features

Respond to them to build community!

---

## 🎯 Share Your App

### Share the Link

```
https://YOUR-USERNAME.github.io/catholic-daily-virtue/
```

### Create a Custom Domain (Optional)

1. Buy a domain (namecheap.com, godaddy.com, etc.)
2. Create `CNAME` file in your repo with just the domain name
3. GitHub Pages handles the rest!

### Promote It

- Post on r/Catholicism
- Share in Catholic Facebook groups
- Tell your parish
- Tweet it out
- Ask Catholic influencers to share

---

## 🆘 Troubleshooting

### App not showing up
- Wait 1-2 minutes for GitHub to deploy
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Check Settings → Pages → confirm it's set to "Deploy from a branch"

### Changes not appearing
- Make sure you clicked **Commit changes**
- Hard refresh your browser
- Check the green checkmark next to your commit (means it deployed)

### App won't install on phone
- **iOS:** Use Safari, not Chrome
- **Android:** Use Chrome, not Firefox
- Clear browser cache and try again

### Service Worker not working
- Service Workers only work on HTTPS ✓ (GitHub Pages is HTTPS)
- Check browser DevTools → Application → Service Workers
- If broken: Unregister it and refresh

### AI Quote generation failing
- You probably haven't set up a backend (see Step 6)
- Check browser console (F12 → Console) for error messages

---

## ✅ You're Done!

Your Catholic Daily Virtue app is live! 🎉

- ✅ Live at: `https://YOUR-USERNAME.github.io/catholic-daily-virtue/`
- ✅ Installable on phones
- ✅ Works offline
- ✅ Updates daily automatically
- ✅ Completely free

### Next Steps

1. Test it on your phone
2. Share with friends
3. Add more quotes
4. Customize the colors/text
5. Watch it grow!

---

## 📞 Need Help?

- **GitHub Issues:** Open an issue in your repo
- **Stack Overflow:** Tag with `github-pages` and `pwa`
- **GitHub Docs:** https://docs.github.com/pages

---

## 🙏 Blessings!

May this app bring Catholics closer to Christ every single day.

> "Be a man. A real man fears God and nothing else." - Saint John Paul II

**Deo gratias.** ✝

---

## 🚀 One More Thing

**Tell the world!**

Once your app is live, share it:

```
Check out the new Catholic Daily Virtue PWA! 
A new manly Bible verse every day, right on your lock screen.
No ads, no tracking, just pure Catholic inspiration.

https://YOUR-USERNAME.github.io/catholic-daily-virtue/

Works on iPhone, Android, and desktop.
📱 Add to home screen like a native app!

#Catholic #BibleVerse #Faith #DailyVirtue
```

Post this on Twitter, Reddit, Facebook, etc.

**Good luck!** ✝
