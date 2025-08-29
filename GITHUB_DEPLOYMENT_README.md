# GitHub Actions Vercel Deployment Setup

This repository is configured to automatically deploy to Vercel when changes are pushed to the main/master branch.

## Required GitHub Secrets

Before the deployment will work, you need to add the following secrets to your GitHub repository:

### 1. VERCEL_TOKEN
Your Vercel authentication token.

**To get this:**
1. Go to [Vercel Account Settings](https://vercel.com/account/tokens)
2. Create a new token with full access
3. Copy the token value

### 2. VERCEL_ORG_ID
Your Vercel organization/team ID.

**To get this:**
1. Run `vercel link` in your project directory locally
2. Open the `.vercel/project.json` file
3. Copy the `orgId` value

### 3. VERCEL_PROJECT_ID
Your Vercel project ID.

**To get this:**
1. Run `vercel link` in your project directory locally
2. Open the `.vercel/project.json` file
3. Copy the `projectId` value

## Adding Secrets to GitHub

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Click on **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Add each secret with the exact names above

## Domain Configuration

The application is configured to use **FindBrexitConsultants.co.uk** as the primary domain.

To configure your custom domain in Vercel:
1. Go to your project in Vercel dashboard
2. Navigate to **Settings** → **Domains**
3. Add your domain: `FindBrexitConsultants.co.uk`
4. Follow Vercel's instructions to configure DNS

## Deployment Process

Once the secrets are configured, every push to the main/master branch will:
1. Install dependencies
2. Build the project
3. Deploy to Vercel production environment

The deployment status will be visible in the GitHub Actions tab of your repository.
