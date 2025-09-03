# 🚀 GitHub Pages Deployment Guide

## Quick Setup (Automated)

Run the setup script:
```bash
./setup-github.sh
```

## Manual Setup

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. **Repository name**: `reqreq` (or your preferred name)
3. **Description**: "SDK Version Requirements - Next.js website for mobile development"
4. **Visibility**: Public
5. **❌ DO NOT** initialize with README, .gitignore, or license

### 2. Push Your Code

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual values:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** tab
3. Click **"Pages"** in the left sidebar
4. Under **"Source"**, select **"GitHub Actions"**
5. Click **"Save"**

### 4. Wait for Deployment

- Check the **"Actions"** tab to see the deployment progress
- Once complete, your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

## Features Included

✅ **Automated GitHub Actions workflow** for deployment  
✅ **Static site generation** optimized for GitHub Pages  
✅ **Responsive design** with Tailwind CSS  
✅ **SDK filtering and search** functionality  
✅ **Mobile-friendly interface**  

## Customization

### Adding More SDKs

Edit `/public/sdks.json` to add more SDKs:

```json
{
  "name": "Your SDK",
  "type": "library",
  "language": "Swift",
  "versions": [
    {
      "version": "1.0.0",
      "releaseDate": "2024-01-01",
      "platformVersions": [
        {
          "platform": "iOS",
          "version": "12.0"
        },
        {
          "platform": "Android",
          "version": "7.0"
        }
      ]
    }
  ]
}
```

### Custom Domain (Optional)

If you have a custom domain:

1. Add a `CNAME` file to the `public` directory with your domain
2. Configure your domain's DNS to point to `YOUR_USERNAME.github.io`
3. Update the repository settings under Pages to use your custom domain

## Troubleshooting

### Build Fails
- Check the Actions tab for error details
- Ensure all dependencies are in `package.json`
- Verify the `next.config.ts` configuration

### Site Not Loading
- Wait 5-10 minutes after the first deployment
- Check that GitHub Pages is enabled in Settings
- Verify the Actions workflow completed successfully

### Assets Not Loading
- The configuration handles asset paths automatically
- If issues persist, check the browser console for errors

## Local Development

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run lint   # Run linting
```

Your site will be available at `http://localhost:3000` during development.
