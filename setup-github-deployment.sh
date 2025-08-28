#!/bin/bash

# GitHub Deployment Setup Script
# This script configures your repository for automated deployment to Vercel and Hostinger

set -e  # Exit on error

echo "🚀 Setting up GitHub Actions deployment for FindBrexitConsultants..."
echo

# Check if we're in the correct directory
if [[ ! -f "package.json" ]]; then
    echo "❌ Error: This script must be run from the findbrexit-consultants project root directory"
    exit 1
fi

# Configure Git remote
echo "📡 Configuring Git remote..."
if git remote get-url origin > /dev/null 2>&1; then
    echo "✅ Git remote already configured:"
    git remote -v
else
    echo "🔗 Adding GitHub remote..."
    git remote add origin https://github.com/mitchell1972/findbrexitconsultants.git
    echo "✅ GitHub remote added successfully"
fi

# Stage all changes
echo "📦 Staging all project files..."
git add .
echo "✅ Files staged for commit"

# Create initial commit if needed
if git log --oneline -n 1 > /dev/null 2>&1; then
    echo "📝 Creating new commit with GitHub Actions..."
    git commit -m "feat: Add GitHub Actions workflows for Vercel and Hostinger deployment

- Add automated Vercel deployment workflow
- Add automated Hostinger deployment workflow (targets https://findbrexitconsultants.co.uk)
- Include SPA routing support with .htaccess
- Add security headers and performance optimizations
- Support for parallel deployments on push to main branch"
else
    echo "📝 Creating initial commit..."
    git commit -m "initial: Complete FindBrexitConsultants application with GitHub Actions

- Full-stack React+Vite+TypeScript application
- Supabase integration for backend services
- Automated deployment to Vercel and Hostinger
- Responsive design with Tailwind CSS
- End-to-end testing with Playwright"
fi

echo "✅ Git commit created successfully"
echo

# Display next steps
echo "🎉 Setup Complete! Next steps:"
echo
echo "1️⃣  CONFIGURE GITHUB SECRETS:"
echo "   Go to: https://github.com/mitchell1972/findbrexitconsultants/settings/secrets/actions"
echo
echo "   For Vercel deployment, add:"
echo "   • VERCEL_TOKEN - Your Vercel deployment token"
echo "   • VERCEL_ORG_ID - Your Vercel organization ID"
echo "   • VERCEL_PROJECT_ID - Your Vercel project ID"
echo
echo "   For Hostinger deployment, add:"
echo "   • HOSTINGER_FTP_SERVER - Your Hostinger FTP server hostname"
echo "   • HOSTINGER_FTP_USERNAME - Your FTP username"
echo "   • HOSTINGER_FTP_PASSWORD - Your FTP password"
echo
echo "2️⃣  PUSH TO GITHUB:"
echo "   git push -u origin main"
echo
echo "3️⃣  VERIFY DEPLOYMENTS:"
echo "   • Vercel: https://findbrexitconsultants.vercel.app"
echo "   • Hostinger: https://findbrexitconsultants.co.uk"
echo
echo "🔄 Both deployments will run automatically when you push to the main branch!"
echo

# Optional: Show current branch
current_branch=$(git branch --show-current)
if [[ "$current_branch" != "main" && "$current_branch" != "master" ]]; then
    echo "⚠️  NOTE: Current branch is '$current_branch'. GitHub Actions are configured for 'main' and 'master' branches."
    echo "   Consider switching to main branch: git checkout -b main"
fi

echo "✨ Ready to deploy! 🚀"
