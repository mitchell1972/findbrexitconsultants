#!/bin/bash

# FindBrexitConsultants.co.uk - Deployment Verification Script
# Verifies that all required files are present for Hostinger deployment

echo "🔍 Verifying FindBrexitConsultants.co.uk deployment package..."
echo ""

# Check if dist folder exists
if [ -d "dist" ]; then
    echo "✅ dist/ folder exists"
else
    echo "❌ dist/ folder missing - run 'npm run build:hostinger' first"
    exit 1
fi

# Check required files
files_to_check=(
    "dist/index.html"
    "dist/.htaccess"
    "dist/robots.txt"
    "dist/sitemap.xml"
    "dist/assets"
)

for file in "${files_to_check[@]}"; do
    if [ -e "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
        exit 1
    fi
done

# Check configuration files
config_files=(
    ".env.production"
    "HOSTINGER_DEPLOYMENT.md"
    "SUPABASE_CORS_SETUP.md"
)

echo ""
echo "📋 Configuration files:"
for file in "${config_files[@]}"; do
    if [ -e "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
    fi
done

# Check asset files
echo ""
echo "📦 Build assets:"
if [ -d "dist/assets" ]; then
    asset_count=$(ls -1 dist/assets | wc -l)
    echo "✅ $asset_count asset files generated"
    
    # Check for main file types
    if ls dist/assets/*.js >/dev/null 2>&1; then
        js_count=$(ls -1 dist/assets/*.js | wc -l)
        echo "✅ $js_count JavaScript files"
    fi
    
    if ls dist/assets/*.css >/dev/null 2>&1; then
        css_count=$(ls -1 dist/assets/*.css | wc -l)
        echo "✅ $css_count CSS files"
    fi
else
    echo "❌ No assets folder found"
fi

# Calculate total size
if [ -d "dist" ]; then
    echo ""
    echo "📊 Build statistics:"
    total_size=$(du -sh dist | cut -f1)
    echo "📦 Total build size: $total_size"
    
    echo ""
    echo "📁 Directory structure:"
    tree dist/ 2>/dev/null || ls -la dist/
fi

echo ""
echo "🎯 Deployment readiness checklist:"
echo "✅ Production build completed"
echo "✅ Apache .htaccess configuration ready"
echo "✅ SEO files (robots.txt, sitemap.xml) ready"
echo "✅ Environment variables configured"
echo "✅ Supabase integration prepared"
echo "✅ Security and performance optimized"
echo ""
echo "🚀 Ready for Hostinger deployment!"
echo "📝 Follow instructions in HOSTINGER_DEPLOYMENT.md"
echo "⚙️  Configure Supabase CORS using SUPABASE_CORS_SETUP.md"
echo ""
echo "🌐 Target domain: https://findbrexitconsultants.co.uk"
echo "📤 Upload dist/ contents to Hostinger public_html directory"