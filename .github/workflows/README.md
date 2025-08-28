# GitHub Actions Deployment Workflows

This repository includes automated CI/CD workflows for deploying the FindBrexit Consultants application to both Vercel and Hostinger platforms.

## 🚀 Available Workflows

### 1. Continuous Integration (CI) - `ci.yml`
**Triggered on:** Push to `main`, `master`, `develop` branches and pull requests

**What it does:**
- ✅ Runs ESLint for code linting
- ✅ Performs TypeScript type checking
- ✅ Executes Playwright end-to-end tests
- ✅ Tests all build modes (dev, prod, hostinger)
- ✅ Uploads test reports and build artifacts

### 2. Vercel Deployment - `deploy-vercel.yml`
**Triggered on:** 
- Push to `main` or `master` branches (production deployment)
- Pull requests (preview deployment)
- Manual workflow dispatch

**What it does:**
- 🚀 Deploys preview versions for pull requests
- 🚀 Deploys production versions for main branch pushes
- 🔧 Uses Vercel CLI for optimized deployment
- 📦 Handles Supabase edge functions (when configured)

### 3. Hostinger Deployment - `deploy-hostinger.yml`
**Triggered on:**
- Push to `main` or `master` branches
- Manual workflow dispatch

**What it does:**
- 🏗️ Builds the application using `build:hostinger` script
- 📁 Deploys files via FTP to Hostinger hosting
- 🌐 Targets `findbrexitconsultants.co.uk` domain
- 📊 Provides deployment summary with metrics

## 🔐 Required GitHub Secrets

Navigate to your GitHub repository → Settings → Secrets and variables → Actions, then add these secrets:

### For Vercel Deployment:
```
VERCEL_TOKEN=your_vercel_token_here
VERCEL_ORG_ID=your_vercel_org_id_here  
VERCEL_PROJECT_ID=your_vercel_project_id_here
```

### For Hostinger Deployment:
```
HOSTINGER_FTP_SERVER=your_ftp_server_address
HOSTINGER_FTP_USERNAME=your_ftp_username
HOSTINGER_FTP_PASSWORD=your_ftp_password
```

### For Application Environment:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## 📋 How to Get Required Values

### Vercel Secrets:
1. **VERCEL_TOKEN**: 
   - Go to [Vercel Account Settings](https://vercel.com/account/tokens)
   - Create a new token
   
2. **VERCEL_ORG_ID & VERCEL_PROJECT_ID**:
   - Go to your project settings in Vercel dashboard
   - Find these IDs in the project settings page

### Hostinger Secrets:
1. **FTP Credentials**:
   - Log into your Hostinger control panel
   - Navigate to Files → FTP Accounts
   - Use the main FTP account or create a new one

### Environment Variables:
- **Supabase**: From your Supabase project settings → API
- **Stripe**: From your Stripe dashboard → Developers → API keys

## 🎯 Deployment Targets

| Platform | URL | Deployment Method | Trigger |
|----------|-----|------------------|---------|
| **Vercel Production** | Auto-generated Vercel URL | Vercel CLI | Push to `main`/`master` |
| **Vercel Preview** | Auto-generated preview URL | Vercel CLI | Pull requests |
| **Hostinger** | [findbrexitconsultants.co.uk](https://findbrexitconsultants.co.uk) | FTP Upload | Push to `main`/`master` |

## 🔧 Build Scripts Used

- **Vercel**: Uses Vercel's built-in build system with `vercel build`
- **Hostinger**: Uses `pnpm run build:hostinger` for production-optimized build

## 🚨 Manual Deployment

You can trigger deployments manually:

1. Go to the **Actions** tab in your GitHub repository
2. Select the workflow you want to run:
   - "Deploy to Vercel" for Vercel deployment
   - "Deploy to Hostinger" for Hostinger deployment
3. Click "Run workflow"
4. Choose the branch and click "Run workflow"

## 📊 Monitoring Deployments

- **GitHub Actions**: Check the Actions tab for deployment status and logs
- **Vercel**: Monitor deployments in the Vercel dashboard
- **Hostinger**: Check your site at `findbrexitconsultants.co.uk`

## 🐛 Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check if all environment variables are set correctly
   - Ensure `pnpm-lock.yaml` is committed to the repository
   - Verify Node.js compatibility (workflows use Node.js 18)

2. **Vercel Deployment Issues**:
   - Verify VERCEL_TOKEN has the correct permissions
   - Check if VERCEL_ORG_ID and VERCEL_PROJECT_ID are correct
   - Ensure project exists in Vercel dashboard

3. **Hostinger FTP Issues**:
   - Verify FTP credentials are correct
   - Check if FTP server address is reachable
   - Ensure the target directory `/public_html/` exists and is writable

4. **Environment Variable Issues**:
   - Double-check all secret names match exactly (case-sensitive)
   - Verify Supabase and Stripe keys are valid and active

## 📝 Workflow Features

### Security:
- ✅ Secrets are properly masked in logs
- ✅ Environment variables are scoped per job
- ✅ FTP deployment uses secure protocols

### Performance:
- ✅ Intelligent caching for pnpm dependencies
- ✅ Parallel job execution where possible
- ✅ Artifact retention for debugging

### Monitoring:
- ✅ Deployment summaries with metrics
- ✅ Build verification steps
- ✅ Test result uploads
- ✅ Detailed logging for troubleshooting

## 🔄 Workflow Status

After setting up, you'll see workflow badges at the top of your README. Successful deployments will show:

- ✅ **CI**: All tests passing
- 🚀 **Vercel**: Deployed successfully  
- 🌐 **Hostinger**: Site updated

---

**Note**: Make sure to push these workflow files to your `main` or `master` branch and configure all required secrets before expecting automated deployments to work.
