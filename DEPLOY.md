# Deployment Guide for BillIntel.AI

Quick guide to deploy your MVP so users can test it in their browsers.

## 🚀 Fastest Option: Vercel (5 minutes)

### Step 1: Push to GitHub

```bash
# If not already a git repo
git init
git add .
git commit -m "Initial commit"

# Create repo on GitHub, then:
git remote add origin https://github.com/yourusername/billintel-ai.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to **[vercel.com](https://vercel.com)** and sign up/login (use GitHub)
2. Click **"New Project"**
3. **Import** your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
5. **Add Environment Variables**:
   - Click "Environment Variables"
   - Add:
     ```
     OPENAI_API_KEY = sk-your-actual-key-here
     ```
   - (Optional for demo): `USE_MOCK_DATA = true`
6. Click **"Deploy"**
7. Wait ~2 minutes → Your app is live! 🎉

**Your URL will be**: `https://your-project-name.vercel.app`

### Step 3: Share with Testers

Send them the Vercel URL. They can:
- Visit the landing page
- Upload PDF invoices
- See analysis results

---

## 🔄 Alternative Options

### Netlify

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com)
3. "Add new site" → "Import from Git"
4. Select repo
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Add env vars: `OPENAI_API_KEY`
7. Deploy

### Railway

1. Push to GitHub
2. Go to [railway.app](https://railway.app)
3. "New Project" → "Deploy from GitHub"
4. Select repo
5. Add env vars in Variables tab
6. Auto-deploys

---

## ⚙️ Environment Variables

**Required:**
- `OPENAI_API_KEY` - Your OpenAI API key

**Optional:**
- `USE_MOCK_DATA=true` - Use mock data instead of OpenAI (good for demos)

**Where to add:**
- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Environment Variables
- Railway: Project → Variables tab

---

## 🧪 Testing Before Deploy

```bash
# Test build locally
npm run build

# Test production server locally
npm start
# Visit http://localhost:3000
```

---

## 📝 Post-Deployment Checklist

- [ ] App loads at the deployed URL
- [ ] Landing page displays correctly
- [ ] Can upload a PDF file
- [ ] Analysis works (or mock data shows)
- [ ] Results display properly
- [ ] Mobile responsive (test on phone)

---

## 🐛 Troubleshooting

**Build fails:**
- Check Node version (needs 18+)
- Run `npm install` locally first
- Check for TypeScript errors: `npm run lint`

**Environment variables not working:**
- Make sure they're set in hosting platform (not just `.env`)
- Redeploy after adding env vars
- Check variable names match exactly (case-sensitive)

**API errors:**
- Verify `OPENAI_API_KEY` is set correctly
- Check API key has credits/quota
- Use `USE_MOCK_DATA=true` for demo mode

---

## 💡 Pro Tips

1. **Use Mock Data for Demos**: Set `USE_MOCK_DATA=true` to avoid API costs during demos
2. **Custom Domain**: Vercel/Netlify let you add custom domains (e.g., `billintel.ai`)
3. **Preview Deployments**: Vercel creates preview URLs for every PR (great for testing)
4. **Monitor Usage**: Check Vercel/Netlify dashboards for traffic and errors

---

## 🎯 Quick Deploy Command (Vercel CLI)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts, add env vars when asked
# Done! 🚀
```
