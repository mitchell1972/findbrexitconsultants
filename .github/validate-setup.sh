#!/bin/bash

# GitHub Actions Setup Validation Script
# This script helps validate that your repository is ready for automated deployments

echo "🔍 Validating GitHub Actions Setup for FindBrexit Consultants..."
echo "=================================================="

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ] || ! grep -q "findbrexit-consultants" package.json; then
    echo -e "${RED}❌ Error: Please run this script from the findbrexit-consultants project root${NC}"
    exit 1
fi

echo -e "${BLUE}📁 Project Structure Validation${NC}"

# Check for essential files
files_to_check=(
    "package.json"
    "pnpm-lock.yaml"
    "vite.config.ts"
    "vercel.json"
    ".github/workflows/ci.yml"
    ".github/workflows/deploy-vercel.yml"
    ".github/workflows/deploy-hostinger.yml"
)

for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $file${NC}"
    else
        echo -e "${RED}❌ Missing: $file${NC}"
    fi
done

echo ""
echo -e "${BLUE}📦 Build Scripts Validation${NC}"

# Check build scripts in package.json
required_scripts=("build" "build:prod" "build:hostinger")
for script in "${required_scripts[@]}"; do
    if grep -q "\"$script\":" package.json; then
        echo -e "${GREEN}✅ npm script: $script${NC}"
    else
        echo -e "${RED}❌ Missing npm script: $script${NC}"
    fi
done

echo ""
echo -e "${BLUE}🔐 GitHub Secrets Checklist${NC}"

echo -e "${YELLOW}Required secrets for Vercel deployment:${NC}"
echo "  - VERCEL_TOKEN"
echo "  - VERCEL_ORG_ID" 
echo "  - VERCEL_PROJECT_ID"

echo -e "${YELLOW}Required secrets for Hostinger deployment:${NC}"
echo "  - HOSTINGER_FTP_SERVER"
echo "  - HOSTINGER_FTP_USERNAME"
echo "  - HOSTINGER_FTP_PASSWORD"

echo -e "${YELLOW}Required environment variables:${NC}"
echo "  - VITE_SUPABASE_URL"
echo "  - VITE_SUPABASE_ANON_KEY"
echo "  - VITE_STRIPE_PUBLISHABLE_KEY"

echo ""
echo -e "${BLUE}🧪 Build Test${NC}"

echo "Testing build process..."
if command -v pnpm &> /dev/null; then
    echo -e "${GREEN}✅ pnpm is installed${NC}"
    
    # Test if we can install dependencies
    echo "Installing dependencies..."
    if pnpm install --frozen-lockfile > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Dependencies installed successfully${NC}"
        
        # Test build
        echo "Testing production build..."
        if pnpm run build:prod > /dev/null 2>&1; then
            echo -e "${GREEN}✅ Production build successful${NC}"
        else
            echo -e "${RED}❌ Production build failed${NC}"
            echo "Run 'pnpm run build:prod' manually to see detailed error"
        fi
        
        # Test Hostinger build
        echo "Testing Hostinger build..."
        if pnpm run build:hostinger > /dev/null 2>&1; then
            echo -e "${GREEN}✅ Hostinger build successful${NC}"
        else
            echo -e "${RED}❌ Hostinger build failed${NC}"
            echo "Run 'pnpm run build:hostinger' manually to see detailed error"
        fi
        
    else
        echo -e "${RED}❌ Failed to install dependencies${NC}"
    fi
else
    echo -e "${RED}❌ pnpm not found. Please install pnpm first:${NC}"
    echo "npm install -g pnpm"
fi

echo ""
echo -e "${BLUE}📋 Next Steps${NC}"
echo "1. Push these workflow files to your GitHub repository"
echo "2. Configure all required secrets in GitHub repository settings"
echo "3. Make sure your Vercel project is connected to the GitHub repository"
echo "4. Test the workflows by making a commit to the main branch"

echo ""
echo -e "${GREEN}✨ Setup validation complete!${NC}"