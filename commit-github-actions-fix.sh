#!/bin/bash

# GitHub Actions Playwright Fix - Commit Script

echo "🔧 Committing GitHub Actions Playwright fixes..."

# Add the changed files
git add .github/workflows/deploy-vercel.yml .github/workflows/deploy-hostinger.yml

# Commit with descriptive message
git commit -m "Fix GitHub Actions: Add PLAYWRIGHT_BASE_URL for CI tests

- Added PLAYWRIGHT_BASE_URL=https://FindBrexitConsultants.co.uk to both workflows
- Tests now run against production URL instead of failing on localhost  
- Implements environment variable solution for CI/CD pipeline
- Resolves Playwright test failures in GitHub Actions"

# Push to trigger GitHub Actions
echo "🚀 Pushing changes to trigger GitHub Actions..."
git push origin master

echo "✅ Done! GitHub Actions should now run Playwright tests successfully."
