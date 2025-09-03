#!/bin/bash

echo "🚀 GitHub Setup Helper Script"
echo "=============================="
echo ""

# Get GitHub username and repository name
read -p "Enter your GitHub username: " github_username
read -p "Enter your repository name (press Enter for 'reqreq'): " repo_name

# Default to reqreq if no name provided
if [ -z "$repo_name" ]; then
    repo_name="reqreq"
fi

echo ""
echo "Setting up remote repository..."

# Add remote origin
git remote add origin https://github.com/$github_username/$repo_name.git

# Set main branch
git branch -M main

# Push to GitHub
echo "Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Repository setup complete!"
echo ""
echo "Next steps:"
echo "1. Go to https://github.com/$github_username/$repo_name/settings/pages"
echo "2. Under 'Source', select 'GitHub Actions'"
echo "3. Your site will be available at: https://$github_username.github.io/$repo_name"
echo ""
echo "🎉 Your SDK listing website will be live shortly!"
