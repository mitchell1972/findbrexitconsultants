#!/bin/bash

# FindBrexitConsultants.co.uk - Production Build Script for Hostinger
# This script prepares the website for deployment to Hostinger hosting

echo "🚀 Starting FindBrexitConsultants.co.uk production build for Hostinger..."

# Set production environment
export BUILD_MODE=prod
export NODE_ENV=production

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist/
rm -rf node_modules/.vite-temp/

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production=false

# Build TypeScript
echo "🔧 Building TypeScript..."
npx tsc -b

# Build with Vite
echo "⚡ Building with Vite..."
npx vite build

# Verify build output
if [ -d "dist" ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Build output in dist/ directory:"
    ls -la dist/
    
    # Check for required files
    if [ -f "dist/index.html" ]; then
        echo "✅ index.html found"
    else
        echo "❌ index.html missing!"
    fi
    
    if [ -f "dist/.htaccess" ]; then
        echo "✅ .htaccess found"
    else
        echo "❌ .htaccess missing!"
    fi
    
    if [ -f "dist/robots.txt" ]; then
        echo "✅ robots.txt found"
    else
        echo "❌ robots.txt missing!"
    fi
    
    if [ -f "dist/sitemap.xml" ]; then
        echo "✅ sitemap.xml found"
    else
        echo "❌ sitemap.xml missing!"
    fi
    
    echo ""
    echo "🎉 Production build ready for Hostinger deployment!"
    echo "📤 Upload the contents of the 'dist/' folder to your Hostinger public_html directory."
    echo "🌐 Domain: https://findbrexitconsultants.co.uk"
    echo ""
    echo "📋 Next steps:"
    echo "1. Upload dist/ contents to Hostinger public_html"
    echo "2. Verify .htaccess is working for React routing"
    echo "3. Check SSL certificate is active"
    echo "4. Test website functionality"
    echo "5. Update Supabase CORS settings if needed"
    
else
    echo "❌ Build failed! dist/ directory not found."
    exit 1
fi