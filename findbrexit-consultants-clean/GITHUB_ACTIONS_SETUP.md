# Git + GitHub Actions + Vercel Deployment Setup Guide

This guide will help you set up automatic deployment from GitHub to Vercel using GitHub Actions.

## 🔧 Step 1: Initialize Git Repository

Run these commands in your local `findbrexit-consultants` directory:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: FindBrexit Consultants application"

# Create main branch (if not already created)
git branch -M main
```

## 🏠 Step 2: Create GitHub Repository

1. **Go to GitHub** and verify your repository exists:
   - Repository URL: `https://github.com/mitchell1972/findbrexitconsultants`
   - Description: `FindBrexit Consultants - Brexit compliance consultant platform`

2. **Link your local repository to GitHub**:
   ```bash
   # Add GitHub as remote origin
   git remote add origin https://github.com/mitchell1972/findbrexitconsultants.git
   
   # Push to GitHub
   git push -u origin main
   ```

## ☁️ Step 3: Set Up Vercel Project

1. **Go to [vercel.com](https://vercel.com)** and sign in
2. **Import Project**:
   - Click "New Project"
   - Import your GitHub repository `findbrexit-consultants`
   - Framework Preset: **Vite** (should auto-detect)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Add Environment Variables** in Vercel Dashboard:
   - Go to Project Settings → Environment Variables
   - Add these variables for all environments (Production, Preview, Development):
   ```
   VITE_SUPABASE_URL = https://zjfilhbczaquokqlcoej.supabase.co
   VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqZmlsaGJjemFxdW9rcWxjb2VqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MzQ2MjIsImV4cCI6MjA3MTExMDYyMn0.b6YATor8UyDwYSiSagOQUxM_4sqfCv-89CBXVgC2hP0
   VITE_STRIPE_PUBLISHABLE_KEY = [Your Stripe Publishable Key]
   ```

4. **Deploy** - Vercel will automatically deploy your project

## 🔐 Step 4: Get Vercel Credentials for GitHub Actions

You need to get three values from Vercel for GitHub Actions:

### 4.1 Get Vercel Token
1. Go to Vercel Dashboard → Settings → Tokens
2. Create a new token with a descriptive name: "GitHub Actions Token"
3. Copy the token value

### 4.2 Get Organization ID
Run this command locally (install Vercel CLI first if needed):
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Get your organization ID
vercel teams list
```
Or find it in Vercel Dashboard → Settings → General → Team ID

### 4.3 Get Project ID
1. Go to your project in Vercel Dashboard
2. Settings → General → Project ID
3. Copy the Project ID

## 🔑 Step 5: Configure GitHub Secrets

1. **Go to your GitHub repository**
2. **Settings** → **Secrets and variables** → **Actions**
3. **Add these Repository Secrets**:
   - `VERCEL_TOKEN`: Your Vercel token from step 4.1
   - `VERCEL_ORG_ID`: Your organization ID from step 4.2  
   - `VERCEL_PROJECT_ID`: Your project ID from step 4.3

## 🎯 Step 6: Configure Custom Domain (Optional)

1. **In Vercel Dashboard**:
   - Go to your project → Settings → Domains
   - Add custom domain: `findbrexitconsultants.co.uk`
   - Add www subdomain: `www.findbrexitconsultants.co.uk`

2. **Update DNS Settings** with your domain provider:
   
   **For Apex Domain (findbrexitconsultants.co.uk):**
   - Type: `A`
   - Name: `@` or leave blank
   - Value: `76.76.19.61` (Vercel's IP)
   
   **For WWW Subdomain:**
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`

## 🚀 Step 7: Test the Automation

1. **Make a small change** to your code (e.g., update README.md)
2. **Commit and push**:
   ```bash
   git add .
   git commit -m "Test GitHub Actions deployment"
   git push origin main
   ```
3. **Check GitHub Actions**:
   - Go to your repository → Actions tab
   - You should see a workflow running
4. **Check Vercel**:
   - Your project should automatically deploy
   - Check the deployment in Vercel Dashboard

## 📋 Workflow Summary

After setup, here's what happens automatically:

- **Push to `main` branch** → GitHub Actions triggers → Vercel production deployment
- **Create Pull Request** → GitHub Actions triggers → Vercel preview deployment  
- **Merge PR** → Another production deployment

## 🔧 Commands for Future Development

```bash
# Start development
npm run dev

# Create new feature branch
git checkout -b feature/new-feature

# Make changes, then commit
git add .
git commit -m "Add new feature"

# Push feature branch
git push origin feature/new-feature

# Create PR on GitHub to trigger preview deployment
# Merge PR to trigger production deployment
```

## 🚨 Troubleshooting

### If GitHub Actions Fails:
1. Check the Actions tab for error logs
2. Verify all secrets are correctly set
3. Ensure Vercel project exists and is linked
4. Check that environment variables are set in Vercel

### If Vercel Deployment Fails:
1. Check Vercel deployment logs
2. Verify build command and output directory
3. Check environment variables
4. Ensure all dependencies are in package.json

### If Domain Doesn't Work:
1. Check DNS propagation (can take up to 48 hours)
2. Verify DNS records are correct
3. Check domain configuration in Vercel Dashboard

## ✅ Verification Checklist

- [ ] Git repository initialized and pushed to GitHub
- [ ] Vercel project created and connected to GitHub
- [ ] Environment variables added to Vercel
- [ ] GitHub secrets configured (VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID)
- [ ] GitHub Actions workflow file exists (.github/workflows/deploy.yml)
- [ ] Test deployment works (push to main branch)
- [ ] Custom domain configured (optional)
- [ ] Application loads correctly at deployed URL

## 🎉 Success!

Once everything is set up, you'll have:
- **Automatic deployments** on every push to main
- **Preview deployments** for every pull request
- **Professional CI/CD pipeline** with GitHub Actions
- **Scalable hosting** on Vercel's global CDN

Your FindBrexit Consultants application is now ready for continuous deployment! 🚀
