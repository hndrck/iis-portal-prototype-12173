# 🚨 REQUIRED: Enable GitHub Pages

Your code is ready but GitHub Pages needs to be enabled in the repository settings.

## Step-by-Step Instructions

### 1. Enable GitHub Pages
1. Go to your repository: https://github.com/hndrck/iis-portal-prototype-12173
2. Click **Settings** (top menu bar)
3. In the left sidebar, scroll down and click **Pages**
4. Under **"Build and deployment"** section:
   - **Source**: Select **"GitHub Actions"** from the dropdown
   - (NOT "Deploy from a branch")
5. Click **Save** if there's a save button

### 2. Enable Workflow Permissions
1. While still in **Settings**, click **Actions** in the left sidebar
2. Click **General**
3. Scroll to **"Workflow permissions"** section
4. Select **"Read and write permissions"**
5. Check ✅ **"Allow GitHub Actions to create and approve pull requests"**
6. Click **Save**

### 3. Trigger the Workflow
After enabling Pages, trigger the deployment:

1. Go to **Actions** tab: https://github.com/hndrck/iis-portal-prototype-12173/actions
2. Click **"Deploy to GitHub Pages"** in the left sidebar
3. Click the **"Run workflow"** button (green button on right)
4. Select branch: `claude/bc-gov-design-system-011CUdeqTGJacyWZyR5Pqqmy`
5. Click **"Run workflow"**

### 4. Wait for Deployment (2-3 minutes)
Watch the workflow run. You should see:
- ✅ Build job completes
- ✅ Deploy job completes

### 5. Access Your Site
Once complete, visit:
```
https://hndrck.github.io/iis-portal-prototype-12173/
```

## Current Status

✅ **Your Code is Ready:**
- Latest commit: `efaecda` (Revert to GitHub Pages subdirectory deployment)
- Branch: `claude/bc-gov-design-system-011CUdeqTGJacyWZyR5Pqqmy`
- All BC Design System changes are included

❌ **GitHub Pages Not Enabled:**
- Error: "Get Pages site failed. Please verify that the repository has Pages enabled"
- This is why the workflow is failing

## What Happened to Main Branch?

The main branch has an older merge (`3410639` from 48 minutes ago). Your latest changes are on the claude branch. Once Pages is working, you can merge to main if needed.

## Still Having Issues?

If you see the same error after enabling Pages:
1. Wait 1-2 minutes after enabling Pages
2. Try the workflow again
3. Check that "GitHub Actions" is selected as the Source (not "Deploy from a branch")

## Alternative: Manual Deployment

If GitHub Actions isn't working, you can deploy manually:
1. Go to Settings → Pages
2. Change Source to: **"Deploy from a branch"**
3. Select branch: `claude/bc-gov-design-system-011CUdeqTGJacyWZyR5Pqqmy`
4. Select folder: `/ (root)`
5. Click Save

But you'll need to build locally first:
```bash
npm run build
git add dist -f
git commit -m "Add build files"
git push
```
Then change branch to `claude/bc-gov-design-system-011CUdeqTGJacyWZyR5Pqqmy` in Settings → Pages.

---

**Bottom line**: Your code is ready, you just need to enable GitHub Pages in the repository settings first! 🚀
