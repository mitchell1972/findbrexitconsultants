# GitHub Actions Workflows

This directory contains automated deployment workflows for the FindBrexitConsultants application.

## Workflows

### 1. Vercel Deployment (`vercel-deploy.yml`)

**Trigger**: Push to main/master branch, Pull Requests  
**Target**: Vercel hosting platform  
**URL**: https://findbrexitconsultants.vercel.app

**Required Secrets:**
- `VERCEL_TOKEN` - Vercel deployment token
- `VERCEL_ORG_ID` - Your Vercel organization ID
- `VERCEL_PROJECT_ID` - Your Vercel project ID

### 2. Hostinger Deployment (`hostinger-deploy.yml`)

**Trigger**: Push to main/master branch  
**Target**: Hostinger shared hosting via FTP  
**URL**: https://findbrexitconsultants.co.uk

**Required Secrets:**
- `HOSTINGER_FTP_SERVER` - FTP server hostname
- `HOSTINGER_FTP_USERNAME` - FTP username
- `HOSTINGER_FTP_PASSWORD` - FTP password

## Setup Instructions

1. Go to your GitHub repository settings
2. Navigate to Secrets and Variables → Actions
3. Add the required secrets for each deployment
4. Push to main/master branch to trigger deployments

Both workflows will run in parallel when you push to the main branch.
