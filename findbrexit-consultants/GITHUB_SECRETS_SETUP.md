# 🔧 GitHub Secrets Configuration Guide

## Required Secrets Overview

Your GitHub Actions workflows require the following secrets to be configured in your repository.

**Repository Settings**: https://github.com/mitchell1972/findbrexitconsultants/settings/secrets/actions

---

## 🌐 Vercel Deployment Secrets

### 1. VERCEL_TOKEN
**Purpose**: Authenticates GitHub Actions with your Vercel account

**How to get it:**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your profile → Settings
3. Navigate to "Tokens" section
4. Click "Create Token"
5. Name: `GitHub-Actions-FindBrexitConsultants`
6. Scope: Select appropriate scope (recommended: Account)
7. Copy the generated token

**Add to GitHub:**
- Secret Name: `VERCEL_TOKEN`
- Secret Value: `your_copied_token_here`

### 2. VERCEL_ORG_ID
**Purpose**: Identifies your Vercel organization

**How to get it:**
1. In your local project directory, run:
   ```bash
   npx vercel link
   ```
2. Follow the prompts to link your project
3. Check the `.vercel/project.json` file:
   ```json
   {
     "orgId": "your_org_id_here",
     "projectId": "your_project_id_here"
   }
   ```
4. Copy the `orgId` value

**Add to GitHub:**
- Secret Name: `VERCEL_ORG_ID`
- Secret Value: `your_org_id_here`

### 3. VERCEL_PROJECT_ID
**Purpose**: Identifies your specific Vercel project

**How to get it:**
1. From the same `.vercel/project.json` file (see above)
2. Copy the `projectId` value

**Add to GitHub:**
- Secret Name: `VERCEL_PROJECT_ID`
- Secret Value: `your_project_id_here`

---

## 🏠 Hostinger Deployment Secrets

### 1. HOSTINGER_FTP_SERVER
**Purpose**: FTP server hostname for file uploads

**How to get it:**
1. Log into your [Hostinger cPanel](https://hpanel.hostinger.com)
2. Go to "Files" → "File Manager" or "FTP Accounts"
3. Look for FTP server information
4. Common formats:
   - `ftp.yourdomain.com`
   - `ftp.findbrexitconsultants.co.uk`
   - `files.000webhost.com` (if using 000webhost)

**Add to GitHub:**
- Secret Name: `HOSTINGER_FTP_SERVER`
- Secret Value: `ftp.findbrexitconsultants.co.uk`

### 2. HOSTINGER_FTP_USERNAME
**Purpose**: FTP account username

**How to get it:**
1. In Hostinger cPanel → FTP Accounts
2. Find your main FTP account username
3. Usually matches your cPanel username
4. Format might be: `u123456789` or `your_domain_name`

**Add to GitHub:**
- Secret Name: `HOSTINGER_FTP_USERNAME`
- Secret Value: `your_ftp_username`

### 3. HOSTINGER_FTP_PASSWORD
**Purpose**: FTP account password

**How to get it:**
1. Use the password you set for your FTP account
2. If forgotten, reset it in cPanel → FTP Accounts
3. Click "Change Password" next to your FTP account

**Add to GitHub:**
- Secret Name: `HOSTINGER_FTP_PASSWORD`
- Secret Value: `your_ftp_password`

---

## 🔒 Security Best Practices

### Token Security
- ✅ Never commit secrets to your repository
- ✅ Use minimal scope for tokens (don't grant unnecessary permissions)
- ✅ Rotate tokens regularly (every 3-6 months)
- ✅ Use different tokens for different projects

### FTP Security
- ✅ Use strong, unique passwords
- ✅ Limit FTP access to specific directories if possible
- ✅ Monitor FTP access logs in Hostinger cPanel
- ✅ Consider using SFTP if available

### GitHub Repository Security
- ✅ Ensure repository visibility matches your needs (private recommended for production)
- ✅ Review who has access to repository secrets
- ✅ Use branch protection rules for main/master branch
- ✅ Require pull request reviews for sensitive changes

---

## 🧪 Testing Your Configuration

### Quick Test Commands

**Test Vercel Connection:**
```bash
# In your local project directory
npx vercel whoami
# Should display your Vercel account info
```

**Test FTP Connection:**
```bash
# Using command line FTP (optional)
ftp ftp.findbrexitconsultants.co.uk
# Enter your FTP username and password when prompted
```

### Verification Checklist
- [ ] All 6 secrets added to GitHub repository
- [ ] Vercel token has appropriate permissions
- [ ] FTP credentials tested and working
- [ ] No typos in secret names or values
- [ ] Repository has access to secrets

---

## 🆘 Troubleshooting Secrets

### Common Issues

#### "Invalid Vercel Token"
- ✅ Check token wasn't truncated when copying
- ✅ Verify token isn't expired
- ✅ Ensure token has deployment permissions
- ✅ Try generating a new token

#### "Vercel Project Not Found"
- ✅ Verify VERCEL_ORG_ID and VERCEL_PROJECT_ID are correct
- ✅ Run `npx vercel link` locally to re-link project
- ✅ Check project exists in Vercel dashboard

#### "FTP Authentication Failed"
- ✅ Double-check username and password
- ✅ Verify FTP server hostname is correct
- ✅ Check if Hostinger account is active
- ✅ Try connecting with FTP client manually

#### "FTP Upload Failed"
- ✅ Verify `/public_html/` directory exists
- ✅ Check disk space in Hostinger account
- ✅ Ensure FTP account has write permissions
- ✅ Test with smaller files first

### Getting Additional Help

- **Vercel Support**: [Vercel Help Center](https://vercel.com/help)
- **Hostinger Support**: [Hostinger Help Center](https://support.hostinger.com)
- **GitHub Actions**: [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

## 📝 Secret Management Template

Use this template to organize your secrets:

```
📋 SECRETS CHECKLIST

✅ VERCEL SECRETS:
   • VERCEL_TOKEN: ████████████████████
   • VERCEL_ORG_ID: ████████████████████
   • VERCEL_PROJECT_ID: ████████████████████

✅ HOSTINGER SECRETS:
   • HOSTINGER_FTP_SERVER: ftp.findbrexitconsultants.co.uk
   • HOSTINGER_FTP_USERNAME: ████████████████████
   • HOSTINGER_FTP_PASSWORD: ████████████████████

🗓️ Last Updated: [Date]
🔄 Next Review: [Date + 3 months]
```

Keep this checklist secure and update it when you rotate credentials!
