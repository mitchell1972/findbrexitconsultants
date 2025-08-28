#!/bin/bash

# Git Repository Setup Script for FindBrexit Consultants
# This script helps initialize the Git repository

echo "🚀 FindBrexit Consultants - Git Repository Setup"
echo "================================================="

# Check if git is available
if ! command -v git &> /dev/null; then
    echo "❌ Error: Git is not installed. Please install Git first."
    exit 1
fi

echo "✅ Git is available"

# Initialize git repository if not already initialized
if [ ! -d ".git" ]; then
    echo "📝 Initializing Git repository..."
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Check if we have a .gitignore file
if [ ! -f ".gitignore" ]; then
    echo "❌ Warning: .gitignore file not found"
else
    echo "✅ Found .gitignore file"
fi

# Check if we have the GitHub Actions workflow
if [ ! -f ".github/workflows/deploy.yml" ]; then
    echo "❌ Warning: GitHub Actions workflow not found"
else
    echo "✅ Found GitHub Actions workflow"
fi

# Add all files to staging
echo "📦 Adding files to Git..."
git add .

# Check if there are any changes to commit
if git diff --staged --quiet; then
    echo "ℹ️  No changes to commit"
else
    echo "📝 Creating initial commit..."
    git commit -m "Initial commit: FindBrexit Consultants application with GitHub Actions deployment"
    echo "✅ Initial commit created"
fi

# Create main branch if we're on master
current_branch=$(git branch --show-current)
if [ "$current_branch" = "master" ]; then
    echo "🔄 Renaming master branch to main..."
    git branch -M main
    echo "✅ Branch renamed to main"
elif [ "$current_branch" = "main" ]; then
    echo "✅ Already on main branch"
fi

echo ""
echo "🎉 Git repository setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Create a GitHub repository named 'findbrexit-consultants'"
echo "2. Add the remote origin:"
echo "   git remote add origin https://github.com/YOURUSERNAME/findbrexit-consultants.git"
echo "3. Push to GitHub:"
echo "   git push -u origin main"
echo ""
echo "📖 See GITHUB_ACTIONS_SETUP.md for complete deployment setup guide"
