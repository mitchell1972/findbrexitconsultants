# 🚀 Complete GitHub Actions Deployment Guide

## Overview

This guide provides step-by-step instructions to set up automated deployments for the FindBrexitConsultants application to both **Vercel** and **Hostinger** using GitHub Actions.

## 📋 Prerequisites

- [x] GitHub account with access to `https://github.com/mitchell1972/findbrexitconsultants`
- [x] Vercel account and project
- [x] Hostinger hosting account with FTP access
- [x] Local Git installation

---

## 🔧 STEP 1: Push Code to GitHub

### Navigate to your project directory:
```bash
cd findbrexit-consultants
```

### Configure Git (if needed):
```bash
# Set your Git identity
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Add GitHub remote (if not already configured)
git remote add origin https://github.com/mitchell1972/findbrexitconsultants.git
```

### Stage and commit all files:
```bash
# Add all files to staging
git add .

# Create commit with GitHub Actions
git commit -m "feat: Add GitHub Actions workflows for automated deployment

- Vercel deployment workflow for staging/preview
- Hostinger deployment workflow targeting https://findbrexitconsultants.co.uk
- SPA routing support with .htaccess
- Security headers and performance optimizations"
```

### Push to GitHub:
```bash
# Push to main branch (triggers deployments)
git push -u origin main
```

---

## 🔐 STEP 2: Configure GitHub Secrets

Go to your repository settings: **https://github.com/mitchell1972/findbrexitconsultants/settings/secrets/actions**

### For Vercel Deployment:

1. **VERCEL_TOKEN**
   - Go to [Vercel Dashboard → Settings → Tokens](https://vercel.com/account/tokens)
   - Create a new token with name `GitHub Actions FindBrexitConsultants`
   - Copy the token and add it as a secret

2. **VERCEL_ORG_ID**
   - Run in your project: `npx vercel link`
   - Find the org ID in `.vercel/project.json`
   - Add as a secret

3. **VERCEL_PROJECT_ID**
   - Find the project ID in `.vercel/project.json`
   - Add as a secret

### For Hostinger Deployment:

1. **HOSTINGER_FTP_SERVER**
   - Usually `ftp.yourdomain.com` or provided by Hostinger
   - Example: `ftp.findbrexitconsultants.co.uk`

2. **HOSTINGER_FTP_USERNAME**
   - Your FTP username (usually your cPanel username)

3. **HOSTINGER_FTP_PASSWORD**
   - Your FTP password

**💡 TIP:** You can find these details in your Hostinger cPanel → File Manager → FTP Accounts

---

## 🎯 STEP 3: Verify Deployments

### Automatic Triggers
Both deployments will automatically trigger when you:
- Push to `main` or `master` branch
- Merge a pull request to `main` or `master`

### Monitor Deployment Status
1. Go to **Actions** tab in your GitHub repository
2. Watch the workflows run:
   - `Deploy to Vercel` 
   - `Deploy to Hostinger`

### Deployment URLs
- **Vercel (Preview)**: https://findbrexitconsultants.vercel.app
- **Hostinger (Production)**: https://findbrexitconsultants.co.uk

---

## 🧪 STEP 4: Test Deployment

### Quick Smoke Test
```bash
# Test Vercel deployment
curl -I https://findbrexitconsultants.vercel.app

# Test Hostinger deployment
curl -I https://findbrexitconsultants.co.uk
```

Both should return `200 OK` status.

### Full Application Test
1. **Homepage Loading**: Visit both URLs and verify the homepage loads
2. **Client-side Routing**: Navigate to different pages (should work with SPA routing)
3. **API Connections**: Test Supabase connections work on both deployments
4. **Mobile Responsiveness**: Test on different screen sizes

---

## 🔄 STEP 5: Future Deployments

### To deploy new changes:
```bash
# Make your changes
# Stage changes
git add .

# Commit changes
git commit -m "your commit message"

# Push to trigger deployments
git push origin main
```

### Both Vercel and Hostinger will automatically deploy the latest changes!

---

## 🛠️ Advanced Configuration

### Custom Domains (Optional)

#### For Vercel:
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add custom domain if needed
3. Update DNS settings as instructed by Vercel

#### For Hostinger:
1. Ensure your domain DNS points to Hostinger's servers
2. The workflow already deploys to `/public_html/` (root directory)
3. Verify domain is configured in Hostinger cPanel

### Environment Variables
If you need to add environment variables:
1. For Vercel: Add them in Vercel Dashboard → Settings → Environment Variables
2. For Hostinger: Add them to GitHub Secrets and modify the workflow

---

## 🆘 Troubleshooting

### Common Issues

#### 1. "Vercel deployment failed"
- ✅ Check VERCEL_TOKEN is valid and not expired
- ✅ Verify VERCEL_ORG_ID and VERCEL_PROJECT_ID are correct
- ✅ Run `npx vercel link` locally to verify project connection

#### 2. "Hostinger FTP deployment failed"
- ✅ Verify FTP credentials are correct
- ✅ Test FTP connection manually with an FTP client
- ✅ Check if Hostinger server allows automated FTP uploads
- ✅ Verify `/public_html/` directory exists and is writable

#### 3. "Build failed"
- ✅ Run `npm run build` locally to test build process
- ✅ Check for TypeScript errors in the Actions logs
- ✅ Verify all dependencies are properly installed

#### 4. "SPA routing not working on Hostinger"
- ✅ Verify `.htaccess` file was deployed to the root directory
- ✅ Check if Hostinger supports URL rewriting
- ✅ Test individual routes manually

### Getting Help
- **GitHub Actions Logs**: Check the Actions tab for detailed error logs
- **Vercel Logs**: Check Vercel Dashboard → Functions → View Logs
- **Hostinger Support**: Contact Hostinger support for server-specific issues

---

## ✅ Success Checklist

- [ ] Code pushed to GitHub successfully
- [ ] All GitHub secrets configured correctly
- [ ] Vercel deployment workflow passes
- [ ] Hostinger deployment workflow passes
- [ ] Both URLs are accessible and working
- [ ] SPA routing works correctly
- [ ] Supabase integration functions properly
- [ ] Application is responsive on mobile devices

---

## 🎉 Congratulations!

Your FindBrexitConsultants application is now automatically deployed to both Vercel and Hostinger! Every time you push to the main branch, both platforms will receive the latest updates.

**Production URL**: https://findbrexitconsultants.co.uk  
**Preview URL**: https://findbrexitconsultants.vercel.app
