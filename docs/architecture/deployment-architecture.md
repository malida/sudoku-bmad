# Deployment Architecture

## Deployment Strategy

**Platform:** GitHub Pages (Static Site Hosting)

**Build Command:** None (no build process)

**Output Directory:** Repository root (index.html at root, scripts/ and styles/ folders)

**CDN/Edge:** GitHub's global CDN (automatic)

**Deployment Trigger:** Push to `main` branch (or `gh-pages` branch if configured)

**Configuration Steps:**
1. Go to repository Settings → Pages
2. Set source to "Deploy from a branch"
3. Select branch: `main` (or `gh-pages`)
4. Select folder: `/ (root)`
5. Save
6. GitHub automatically deploys on every push
7. Site available at: `https://<username>.github.io/<repo-name>/`

**Alternative Platforms:**

**Netlify:**
- Drag-and-drop deployment or connect to git
- Build command: (leave empty)
- Publish directory: `/`
- Auto-deploys on git push

**Vercel:**
- Import git repository
- Framework preset: "Other"
- Build command: (leave empty)
- Output directory: `./`
- Auto-deploys on git push

## CI/CD Pipeline

**GitHub Actions (Optional - for linting/validation):**

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      # Optional: Run ESLint
      - name: Lint JavaScript
        run: npx eslint scripts/*.js --max-warnings 0

      # Optional: Validate HTML
      - name: Validate HTML
        run: npx html-validate index.html

      # GitHub Pages deploys automatically from main branch
      # No deploy step needed if Pages is configured
```

**Note:** CI/CD is optional for this project. GitHub Pages auto-deployment on push is sufficient for MVP.

## Environments

| Environment | Frontend URL | Backend URL | Purpose |
|-------------|-------------|-------------|---------|
| Development | http://localhost:8000 | N/A | Local development with live reload |
| Production | https://\<username\>.github.io/\<repo\> | N/A | Live deployed application |

**Note:** No staging environment needed for MVP. Can add preview deployments later using Netlify Deploy Previews or Vercel Preview URLs if desired.