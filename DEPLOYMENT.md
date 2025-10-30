# GitHub Pages Deployment Guide

## Quick Start

The prototype is configured to automatically deploy to GitHub Pages. Once enabled, it will be available at:

**https://hndrck.github.io/iis-portal-prototype-12173/**

## Enable GitHub Pages

1. Go to your repository on GitHub: https://github.com/hndrck/iis-portal-prototype-12173

2. Click on **Settings** (top menu)

3. In the left sidebar, click **Pages**

4. Under **Build and deployment**:
   - Source: Select **"GitHub Actions"**
   - Save the settings

5. The deployment workflow should run automatically on the next push

## Manual Deployment Trigger

If the deployment doesn't start automatically:

1. Go to **Actions** tab: https://github.com/hndrck/iis-portal-prototype-12173/actions

2. Click on **"Deploy to GitHub Pages"** workflow in the left sidebar

3. Click **"Run workflow"** button (top right)

4. Select your branch and click **"Run workflow"**

## Verify Deployment

After the workflow completes (2-3 minutes):

1. Check the **Actions** tab for green checkmarks
2. Go to **Settings → Pages** to see the published URL
3. Visit the URL to see your deployed prototype

## Troubleshooting

### Issue: 404 Page Not Found
- **Solution**: Make sure GitHub Pages is set to "GitHub Actions" as the source
- Go to Settings → Pages → Build and deployment → Source → GitHub Actions

### Issue: Workflow Not Running
- **Solution**: Check if GitHub Actions is enabled for your repository
- Go to Settings → Actions → General → Allow all actions and reusable workflows

### Issue: Permission Denied
- **Solution**: Enable workflow permissions
- Go to Settings → Actions → General → Workflow permissions
- Select "Read and write permissions"
- Check "Allow GitHub Actions to create and approve pull requests"

### Issue: Assets Not Loading (404 errors)
- **Solution**: The base path is already configured correctly
- Verify the workflow completed successfully
- Check browser console for specific errors

### Issue: Blank Page
- **Solution**: Check browser console for JavaScript errors
- Ensure all files were uploaded in the workflow artifacts
- Try a hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

## Configuration Details

The following files configure GitHub Pages deployment:

- `.github/workflows/deploy.yml` - GitHub Actions workflow
- `vite.config.ts` - Base path configuration
- `src/App.tsx` - React Router basename
- `public/404.html` - SPA routing fallback
- `public/.nojekyll` - Disables Jekyll processing

## Local Preview of Production Build

To test the production build locally:

```bash
npm run build
npm run preview
```

Then visit: http://localhost:4173/iis-portal-prototype-12173/

## Features

- ✅ BC Government Design System
- ✅ BC Sans font
- ✅ Official BC design tokens
- ✅ Automatic deployment on push
- ✅ Client-side routing support
- ✅ Production optimizations
