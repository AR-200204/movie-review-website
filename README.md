# 🎬 MovieHub - Free Auto-Updating Movie Review Website

A completely **FREE**, production-ready movie review website that automatically updates daily with the latest popular movies. Built with Astro, powered by TMDB API, and hosted on GitHub Pages.

## ✨ Features

- 🎯 **100% Free** - No paid services, no backend servers, no credit card required
- 🔄 **Auto-Updates Daily** - GitHub Actions rebuilds the site automatically at midnight UTC
- 🎨 **Beautiful Dark Theme** - Premium movie-themed UI with smooth animations
- 📱 **Fully Responsive** - Perfect on desktop, tablet, and mobile
- ⚡ **Lightning Fast** - Static site generation for instant page loads
- 🔒 **Secure** - API keys hidden using GitHub Secrets, never exposed to clients
- 🔍 **SEO Optimized** - Meta tags, Open Graph, and semantic HTML

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [Git](https://git-scm.com/)
- A GitHub account (free)
- A TMDB API key (free, takes 5 minutes to get)

### 1. Get Your TMDB API Key

1. Go to [https://www.themoviedb.org/signup](https://www.themoviedb.org/signup)
2. Create a free account (no credit card needed)
3. Go to Settings → API → Request an API Key
4. Choose "Developer" option
5. Fill in basic details (your name and website purpose)
6. Copy your API key (starts with a long string of letters and numbers)

### 2. Local Development Setup

```bash
# Navigate to the project directory
cd "c:\Users\User\Desktop\univercity of colombo\CS projects\antigravity\movie stie"

# Install dependencies
npm install

# Create environment file
copy .env.example .env

# Edit .env and add your TMDB API key:
# TMDB_API_KEY=your_actual_api_key_here

# Start development server
npm run dev

# Open http://localhost:4321 in your browser
```

### 3. Test Your Site Locally

- Homepage should display 20 popular movies
- Click any movie to see its detail page
- Check that images load properly
- Verify the site is responsive on different screen sizes

### 4. Deploy to GitHub Pages

#### Step 1: Create GitHub Repository

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - MovieHub site"

# Create a new repository on GitHub.com (do this in your browser)
# Name it something like "movie-site" (must match astro.config.mjs)
# Do NOT initialize with README, .gitignore, or license

# Link your local repo to GitHub (replace YOUR-USERNAME and YOUR-REPO)
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git

# Push to GitHub
git branch -M main
git push -u origin main
```

#### Step 2: Add TMDB API Key to GitHub Secrets

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Name: `TMDB_API_KEY`
6. Value: Paste your TMDB API key
7. Click **Add secret**

#### Step 3: Enable GitHub Pages

1. In your repository, go to **Settings** → **Pages**
2. Under "Build and deployment":
   - Source: **GitHub Actions**
3. That's it! GitHub will automatically detect the workflow

#### Step 4: Update Configuration

Edit `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://YOUR-USERNAME.github.io',
  base: '/YOUR-REPO-NAME',
  // ... rest of config
});
```

Push the changes:

```bash
git add astro.config.mjs
git commit -m "Update site configuration"
git push
```

#### Step 5: Wait for Deployment

1. Go to **Actions** tab in your GitHub repository
2. You'll see the "Deploy to GitHub Pages" workflow running
3. Wait 2-5 minutes for it to complete
4. Your site will be live at: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

## 🔄 How Auto-Update Works

Your site automatically rebuilds **every day at midnight UTC** (00:00) to fetch the latest popular movies from TMDB.

### The Magic Behind It

The GitHub Actions workflow (`.github/workflows/deploy.yml`) has a schedule trigger:

```yaml
schedule:
  - cron: "0 0 * * *"  # Runs daily at 00:00 UTC
```

**What happens during auto-update:**

1. GitHub Actions runs automatically at scheduled time
2. Fetches latest popular movies from TMDB API
3. Rebuilds entire static site with fresh data
4. Deploys updated site to GitHub Pages
5. Your site now shows latest movies - no manual work needed!

**You can also:**
- Manually trigger a rebuild: Go to Actions tab → Deploy to GitHub Pages → Run workflow
- Automatic rebuild happens on every push to `main` branch

## 🎨 Customization Guide

### Change Colors

Edit `src/layouts/Layout.astro` and modify CSS variables:

```css
:root {
  --bg-primary: #0a0e17;      /* Main background */
  --accent-primary: #3b82f6;  /* Primary accent color */
  --accent-secondary: #6366f1; /* Secondary accent */
  /* ... more colors */
}
```

### Change Site Name and Logo

Edit `src/components/Header.astro`:

```html
<span class="logo-icon">🎬</span>
<span class="logo-text">MovieHub</span>
```

### Show More Movies

Edit `src/pages/index.astro`:

```javascript
// Change page number or fetch multiple pages
const movies = await getPopularMovies(1);  // Page 1
const moreMovies = await getPopularMovies(2); // Page 2
const allMovies = [...movies, ...moreMovies];
```

### Change Update Frequency

Edit `.github/workflows/deploy.yml`:

```yaml
schedule:
  - cron: "0 */12 * * *"  # Every 12 hours
  - cron: "0 0 * * 1"     # Every Monday
  - cron: "0 0 1 * *"     # First day of each month
```

## 📁 Project Structure

```
movie-site/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Auto-deployment workflow
├── src/
│   ├── pages/
│   │   ├── index.astro         # Homepage (movies grid)
│   │   └── movie/[id].astro    # Individual movie pages
│   ├── layouts/
│   │   └── Layout.astro        # Base HTML template
│   ├── components/
│   │   ├── Header.astro        # Site header
│   │   └── MovieCard.astro     # Movie card component
│   └── lib/
│       └── tmdb.ts             # TMDB API integration
├── public/
│   └── favicon.svg             # Site icon
├── .env.example                # Environment template
├── astro.config.mjs            # Astro configuration
├── package.json                # Dependencies
└── README.md                   # This file
```

## 🔧 Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build locally
```

## 🐛 Troubleshooting

### Build Fails with "TMDB_API_KEY is not defined"

**Solution:** Make sure you've added the `TMDB_API_KEY` secret in your GitHub repository settings (Settings → Secrets → Actions).

### Site Shows 404 on GitHub Pages

**Solution:** 
1. Check that GitHub Pages is enabled in Settings → Pages
2. Verify the `site` and `base` in `astro.config.mjs` match your GitHub username and repo name
3. Ensure the workflow completed successfully in the Actions tab

### Movies Not Loading Locally

**Solution:**
1. Check that `.env` file exists in the project root
2. Verify your API key is correct in the `.env` file
3. Make sure you don't have quotes around the API key
4. Restart the dev server after changing `.env`

### Images Not Showing

**Solution:** TMDB image servers might be temporarily down or blocked. Check:
1. Your internet connection
2. Firewall settings
3. Try accessing https://image.tmdb.org/t/p/w500/[any-path] in browser

### Auto-Update Not Working

**Solution:**
1. Check Actions tab for failed workflows
2. Verify TMDB_API_KEY secret is set correctly
3. Ensure workflow file is in `.github/workflows/` directory
4. Check that the cron schedule is correct

## 🎯 Adding New Features

### Add Search Functionality

1. Create new API function in `src/lib/tmdb.ts`:
```typescript
export async function searchMovies(query: string) {
  // ... fetch search results
}
```

2. Add search page in `src/pages/search.astro`
3. Add search form to Header component

### Add Movie Trailers

1. Update `getMovieDetails()` to fetch videos
2. Display YouTube embed in movie detail page

### Add Categories/Genres

1. Fetch genre list from TMDB
2. Create genre pages: `src/pages/genre/[id].astro`
3. Use similar pattern to movie detail pages

## 📝 TMDB Attribution

This site uses the TMDB API but is not endorsed or certified by TMDB. The "Powered by TMDB" logo is displayed in the header as required by their terms of service.

## 📄 License

This project is open source and available for personal and educational use. TMDB data is subject to their terms of service.

## 🤝 Contributing

Feel free to fork this project and customize it for your needs! Some ideas:

- Add TV show support
- Implement filtering and sorting
- Add user reviews from TMDB
- Create a watchlist feature (using localStorage)
- Add more detailed actor/crew information

## 🌟 Support

If you found this helpful, please:
- ⭐ Star the repository
- 🐛 Report issues
- 💡 Suggest improvements
- 🔗 Share with others

---

**Built with ❤️ using [Astro](https://astro.build) • Powered by [TMDB](https://www.themoviedb.org/)**
"# movie-review-website" 
