#!/bin/bash

echo "🚀 Setting up Git repository for FindBrexit Consultants..."

# Navigate to project directory
cd /workspace/findbrexit-consultants

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
else
    echo "📁 Git repository already exists"
fi

# Configure git user (you can change these)
echo "👤 Configuring Git user..."
git config user.name "FindBrexit Deployment"
git config user.email "deploy@findbrexitconsultants.co.uk"

# Add all files
echo "📦 Adding all files to Git..."
git add .

# Create initial commit
echo "📝 Creating commit..."
git commit -m "Initial commit: FindBrexitConsultants.co.uk deployment ready

- Updated all domain references to FindBrexitConsultants.co.uk
- Added GitHub Actions workflow for Vercel deployment
- Project ready for production deployment"

# Add remote origin
echo "🌐 Adding remote repository..."
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/mitchell1972/findbrexitconsultants.git

echo "✅ Git setup complete!"
echo ""
echo "🔄 To push to GitHub, run:"
echo "   git push -u origin main"
echo ""
echo "⚠️  Make sure you have:"
echo "   1. Write access to the GitHub repository"
echo "   2. Set up the required Vercel secrets in GitHub (see GITHUB_DEPLOYMENT_README.md)"
echo ""
echo "🎯 Once pushed, GitHub Actions will automatically deploy to Vercel!"
