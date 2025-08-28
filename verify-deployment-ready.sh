#!/bin/bash

# Vercel Deployment Verification Script
# This script helps verify that the FindBrexitConsultants.co.uk application is ready for deployment

echo "🚀 FindBrexit Consultants - Vercel Deployment Verification"
echo "========================================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root directory."
    exit 1
fi

echo "✅ Found package.json"

# Check if dist folder exists and has required files
if [ ! -d "dist" ]; then
    echo "❌ Error: dist folder not found. Please run 'npm run build' first."
    exit 1
fi

echo "✅ Found dist folder"

# Check for required files in dist
required_files=("index.html" "sitemap.xml" "robots.txt")
for file in "${required_files[@]}"; do
    if [ ! -f "dist/$file" ]; then
        echo "❌ Error: $file not found in dist folder."
        exit 1
    fi
    echo "✅ Found dist/$file"
done

# Check if assets folder exists
if [ ! -d "dist/assets" ]; then
    echo "❌ Error: assets folder not found in dist."
    exit 1
fi

echo "✅ Found dist/assets folder"

# Check for vercel.json
if [ ! -f "vercel.json" ]; then
    echo "❌ Error: vercel.json configuration file not found."
    exit 1
fi

echo "✅ Found vercel.json configuration"

# Check domain configuration in index.html
if grep -q "findbrexitconsultants.co.uk" "dist/index.html"; then
    echo "✅ Domain configuration found in index.html"
else
    echo "❌ Warning: Domain configuration may not be correct in index.html"
fi

# Check sitemap domain configuration
if grep -q "findbrexitconsultants.co.uk" "dist/sitemap.xml"; then
    echo "✅ Domain configuration found in sitemap.xml"
else
    echo "❌ Warning: Domain configuration may not be correct in sitemap.xml"
fi

# Check robots.txt domain configuration
if grep -q "findbrexitconsultants.co.uk" "dist/robots.txt"; then
    echo "✅ Domain configuration found in robots.txt"
else
    echo "❌ Warning: Domain configuration may not be correct in robots.txt"
fi

echo ""
echo "🎉 Pre-deployment verification complete!"
echo ""
echo "📋 Next steps:"
echo "1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)"
echo "2. Import the repository to Vercel"
echo "3. Add the required environment variables in Vercel dashboard:"
echo "   - VITE_SUPABASE_URL"
echo "   - VITE_SUPABASE_ANON_KEY"
echo "   - VITE_STRIPE_PUBLISHABLE_KEY (if using Stripe)"
echo "4. Deploy and configure your custom domain"
echo ""
echo "📖 See VERCEL_DEPLOYMENT_INSTRUCTIONS.md for detailed deployment guide"
