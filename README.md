# BillIntel.AI

AI-powered invoice analysis MVP — upload a PDF invoice, get structured analysis, line items, flagged charges, and potential savings.

## Tech Stack

- **Next.js 14** (App Router)
- **React** + **TypeScript**
- **TailwindCSS**
- **OpenAI API** (GPT)
- **pdf-parse** (PDF text extraction)

## Requirements

- Node.js 18+
- npm or yarn

## Installation

1. **Clone and enter the project**
   ```bash
   cd /projects/BillIntel.AI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set your OpenAI API key:
   ```env
   OPENAI_API_KEY=sk-your-key-here
   ```
   Get a key at [OpenAI API Keys](https://platform.openai.com/api-keys).

## Run Instructions

1. **Development**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

2. **Production build**
   ```bash
   npm run build
   npm start
   ```

## Pages

| Route        | Description                                      |
|-------------|--------------------------------------------------|
| `/`         | Landing page — hero, 3-step explanation, CTA   |
| `/dashboard`| Upload PDF, analyze, view results               |

## API

- **POST `/api/analyze`**  
  - Body: `multipart/form-data` with field `file` (PDF).  
  - Returns JSON: `vendor_name`, `total_amount`, `executive_summary`, `line_items`, `flagged_charges`, `potential_savings`.

## Project Structure

```
/app
  page.tsx              # Landing
  layout.tsx
  globals.css
  /dashboard
    page.tsx            # Dashboard
  /api
    /analyze
      route.ts          # PDF + OpenAI analysis
/components
  FileUpload.tsx
  ResultsDisplay.tsx
  Loader.tsx
/types
  analyze.ts            # AnalysisResult types
```

## MVP Scope

- No authentication  
- No database  
- No payment  
- PDF-only upload, demo-ready for validation

## Deployment

### Option 1: Vercel (Recommended - Easiest for Next.js)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variable:
     - Name: `OPENAI_API_KEY`
     - Value: Your OpenAI API key
   - (Optional) Add `USE_MOCK_DATA=true` for demo mode
   - Click "Deploy"
   - Your app will be live at `https://your-project.vercel.app`

3. **Update Environment Variables Later**
   - Go to Project Settings → Environment Variables
   - Add/edit variables as needed

### Option 2: Netlify

1. **Push to GitHub** (same as above)

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/login with GitHub
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repo
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Add environment variables:
     - `OPENAI_API_KEY` = your key
     - (Optional) `USE_MOCK_DATA=true`
   - Click "Deploy site"

### Option 3: Railway

1. **Push to GitHub**

2. **Deploy to Railway**
   - Go to [railway.app](https://railway.app)
   - Sign up/login with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Add environment variables in the Variables tab
   - Railway auto-detects Next.js and deploys

### Option 4: Self-Hosted (VPS/Server)

1. **Build the app**
   ```bash
   npm run build
   ```

2. **Set environment variables**
   ```bash
   export OPENAI_API_KEY=your-key-here
   export USE_MOCK_DATA=true  # optional
   ```

3. **Start production server**
   ```bash
   npm start
   ```

4. **Use PM2 for process management** (recommended)
   ```bash
   npm install -g pm2
   pm2 start npm --name "billintel" -- start
   pm2 save
   pm2 startup
   ```

### Environment Variables for Production

Add these in your hosting platform's environment variables section:

- `OPENAI_API_KEY` - Your OpenAI API key (required for real analysis)
- `USE_MOCK_DATA` - Set to `"true"` to always use mock data (optional, for demo)

### Quick Deploy Checklist

- [ ] Code pushed to GitHub
- [ ] Environment variables configured (`OPENAI_API_KEY`)
- [ ] Build succeeds locally (`npm run build`)
- [ ] Test the deployed URL
- [ ] Share the public URL with testers

### Demo Mode

To use mock data (no API calls):
- Set `USE_MOCK_DATA=true` in environment variables
- Perfect for demos without API costs
