# GitHub Secrets Setup Guide for FindBrexitConsultants

## Overview
This guide will help you set up all the required GitHub secrets for automated deployment to both Vercel and Hostinger.

## Step 1: Access GitHub Secrets

1. Go to your repository: https://github.com/mitchell1972/findbrexitconsultants
2. Click on **Settings** tab
3. In the left sidebar, click on **Secrets and variables** > **Actions**
4. Click **New repository secret** for each secret below

## Step 2: Environment Variables (Required for Both Deployments)

### VITE_SUPABASE_URL
- **Name:** `VITE_SUPABASE_URL`
- **Value:** `https://zjfilhbczaquokqlcoej.supabase.co`
- **Description:** Your Supabase project URL

### VITE_SUPABASE_ANON_KEY
- **Name:** `VITE_SUPABASE_ANON_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqZmlsaGJjemFxdW9rcWxjb2VqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MzQ2MjIsImV4cCI6MjA3MTExMDYyMn0.b6YATor8UyDwYSiSagOQUxM_4sqfCv-89CBXVgC2hP0`
- **Description:** Your Supabase anonymous/public key

### VITE_STRIPE_PUBLISHABLE_KEY
- **Name:** `VITE_STRIPE_PUBLISHABLE_KEY`
- **Value:** [Your Stripe publishable key - starts with `pk_`]
- **Description:** Your Stripe publishable key for payment processing

## Step 3: Vercel Deployment Secrets

To get these values, you'll need to:

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Link your project (run this in your project directory):**
   ```bash
   vercel link
   ```

4. **Get your organization and project IDs:**
   ```bash
   vercel project ls
   ```

### VERCEL_TOKEN
- **Name:** `VERCEL_TOKEN`
- **Value:** [Get from https://vercel.com/account/tokens]
- **Description:** Your Vercel authentication token
- **How to get:** Go to Vercel Dashboard > Settings > Tokens > Create Token

### VERCEL_ORG_ID
- **Name:** `VERCEL_ORG_ID`
- **Value:** [Found in .vercel/project.json after `vercel link`]
- **Description:** Your Vercel organization ID

### VERCEL_PROJECT_ID
- **Name:** `VERCEL_PROJECT_ID`
- **Value:** [Found in .vercel/project.json after `vercel link`]
- **Description:** Your Vercel project ID

## Step 4: Hostinger Deployment Secrets

### HOSTINGER_FTP_SERVER
- **Name:** `HOSTINGER_FTP_SERVER`
- **Value:** [Your Hostinger FTP server address]
- **Description:** Usually something like `ftp.yourdomain.com` or provided by Hostinger
- **How to get:** Check Hostinger control panel > File Manager > FTP Accounts

### HOSTINGER_FTP_USERNAME
- **Name:** `HOSTINGER_FTP_USERNAME`
- **Value:** [Your Hostinger FTP username]
- **Description:** FTP username for your Hostinger account

### HOSTINGER_FTP_PASSWORD
- **Name:** `HOSTINGER_FTP_PASSWORD`
- **Value:** [Your Hostinger FTP password]
- **Description:** FTP password for your Hostinger account

## Step 5: Verify Setup

After adding all secrets:

1. **Commit and push the workflow files:**
   ```bash
   cd findbrexit-consultants
   git add .github/
   git commit -m "feat: Add GitHub Actions workflows for Vercel and Hostinger deployment"
   git push origin master
   ```

2. **Check GitHub Actions:**
   - Go to your repository > Actions tab
   - You should see the workflows running

3. **Monitor deployments:**
   - Vercel: Check your Vercel dashboard
   - Hostinger: Check your website at https://findbrexitconsultants.co.uk/

## Troubleshooting

### Common Issues:

1. **FTP Connection Failed:**
   - Verify FTP credentials in Hostinger control panel
   - Check if FTP is enabled for your domain

2. **Vercel Deployment Failed:**
   - Ensure all Vercel secrets are correct
   - Check if project is properly linked

3. **Build Errors:**
   - Verify all environment variables are set
   - Check build logs in GitHub Actions

### Getting Hostinger FTP Details:

1. Login to Hostinger control panel
2. Go to **File Manager**
3. Click on **FTP Accounts**
4. Create or view existing FTP account details
5. Server address is usually your domain or provided FTP hostname

## Security Notes

- Never commit secrets to your repository
- Use GitHub secrets for all sensitive information
- Regularly rotate your tokens and passwords
- Monitor deployment logs for any exposed credentials

## Next Steps

Once all secrets are configured:
1. Make any code changes and push to master
2. GitHub Actions will automatically build and deploy to both platforms
3. Check both deployments are working correctly
4. Set up monitoring and error tracking as needed
