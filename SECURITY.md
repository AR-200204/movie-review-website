# TMDB API Security & Build Guide

## 🔒 Security Architecture

This project ensures **zero client-side API exposure** through the following architecture:

### Build-Time Only API Access
- TMDB API calls only happen in **Astro frontmatter** and **getStaticPaths()**
- All API keys are resolved at build time, NOT runtime
- The generated static site contains **zero sensitive data**
- Browser receives only pre-rendered HTML files

### Environment Variable Isolation
- Uses `process.env.TMDB_API_KEY` (build-time variable)
- Never uses `import.meta.env` or `PUBLIC_` prefixes for API key
- `import.meta.env` is exposed to browser; we don't use it for secrets

## 🚀 Local Development

### Step 1: Get TMDB API Key
1. Go to [TMDB Settings API](https://www.themoviedb.org/settings/api)
2. Sign up for free (takes 5 minutes)
3. Request an API key (free tier available)
4. Copy your API key

### Step 2: Configure Local Environment
```bash
# Create .env from template
cp .env.example .env

# Edit .env and paste your API key
# TMDB_API_KEY=your_api_key_here
```

### Step 3: Build & Test
```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build (static generation)
npm run build

# Preview production build
npm preview
```

## 🔧 GitHub Actions Setup

### Step 1: Add Secret to Repository
1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Name: `TMDB_API_KEY`
5. Value: Your TMDB API key

### Step 2: Workflow Behavior
The workflow (`deploy.yml`) now includes:
- ✅ Automatic validation that TMDB_API_KEY secret exists
- ✅ API key passed to build environment
- ✅ Static site generation with pre-rendered pages
- ✅ Automatic deployment to GitHub Pages
- ✅ Daily scheduled rebuilds at midnight UTC

### Step 3: Manual Trigger
You can manually trigger a build from GitHub Actions tab without waiting for scheduled runs.

## 🛡️ Security Checks Implemented

### 1. Module-Level Validation
```javascript
// lib/tmdb.mjs
if (!TMDB_API_KEY) {
    throw new Error('TMDB_API_KEY environment variable is not set...');
}
```
Build fails immediately if API key is missing.

### 2. Build-Time Errors
- If API key is invalid, Astro build fails
- Error message clearly indicates configuration steps
- Prevents accidental deployment of incomplete builds

### 3. No Client-Side Exposure
- Components only receive pre-fetched data
- No API calls in browser
- No credentials in generated HTML/CSS/JS

## 📋 File Structure

```
src/
├── lib/tmdb.mjs                 # ✅ Uses process.env only
├── pages/
│   ├── index.astro              # ✅ Frontmatter fetch at build time
│   └── movie/[id].astro         # ✅ Static path generation
└── components/
    ├── MovieCard.astro          # ✅ Receives data only
    └── MovieDetail.astro        # ✅ Receives data only

.github/workflows/
└── deploy.yml                   # ✅ Validates & injects secret
```

## ✅ Verification Checklist

Before considering the setup complete:

- [ ] TMDB_API_KEY works locally with `npm run build`
- [ ] `npm run build` generates HTML in `dist/`
- [ ] No errors about missing API key
- [ ] GitHub Actions secret is configured
- [ ] Manual workflow trigger succeeds
- [ ] Site is accessible on GitHub Pages

## 🐛 Troubleshooting

### "TMDB_API_KEY is not defined"
- Local dev: Run `npm install` and check `.env` file exists with valid key
- GitHub Actions: Check repository secrets at Settings → Secrets and variables

### Build succeeds locally but fails on GitHub Actions
- Verify secret name is exactly `TMDB_API_KEY` (case-sensitive)
- Check workflow shows "✅ TMDB_API_KEY is configured" in logs
- Ensure API key has proper permissions from TMDB website

### Movies not appearing on site
- Verify TMDB API key is still valid (check TMDB website)
- Check build logs for API errors
- Confirm internet connectivity during build

## 📚 Resources

- [TMDB API Documentation](https://developer.themoviedb.org/docs)
- [Astro Build Process](https://docs.astro.build/en/guides/server-side-rendering/)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
