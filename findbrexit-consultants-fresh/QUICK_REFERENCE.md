# 🚀 Quick Deployment Commands

## Essential Git Commands

```bash
# Navigate to project
cd findbrexit-consultants

# Configure Git (first time only)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Add GitHub remote (first time only)
git remote add origin https://github.com/mitchell1972/findbrexitconsultants.git

# Deploy new changes
git add .
git commit -m "your commit message"
git push origin main
```

## Quick Tests

```bash
# Test builds locally
npm run build          # Standard build
npm run build:hostinger # Hostinger build

# Test URLs
curl -I https://findbrexitconsultants.vercel.app
curl -I https://findbrexitconsultants.co.uk

# Check GitHub Actions
open https://github.com/mitchell1972/findbrexitconsultants/actions
```

## Deployment URLs

- **Production (Hostinger)**: https://findbrexitconsultants.co.uk
- **Preview (Vercel)**: https://findbrexitconsultants.vercel.app
- **GitHub Actions**: https://github.com/mitchell1972/findbrexitconsultants/actions
- **Repository Settings**: https://github.com/mitchell1972/findbrexitconsultants/settings/secrets/actions

## Emergency Commands

```bash
# Force push (use carefully)
git push --force origin main

# Reset to last working commit
git reset --hard HEAD~1

# Check workflow status
gh run list  # (requires GitHub CLI)
```
