# GitHub Actions Hostinger Deployment Setup

This repository is configured to automatically deploy to **both Vercel and Hostinger** when changes are pushed to the main/master branch.

## Hostinger Deployment Workflow

The `.github/workflows/hostinger-deploy.yml` workflow will:
1. Build the project for production
2. Upload the built files directly to your Hostinger hosting via FTP
3. Deploy to your live domain: **FindBrexitConsultants.co.uk**

## Required GitHub Secrets for Hostinger

You need to add these secrets to your GitHub repository settings:

### Hostinger FTP Credentials

**1. HOSTINGER_FTP_HOST**
- Your Hostinger FTP server hostname
- Usually in format: `ftp.yourdomain.com` or provided by Hostinger
- Found in: Hostinger Control Panel → File Manager → FTP Access

**2. HOSTINGER_FTP_USERNAME**
- Your FTP username
- Found in: Hostinger Control Panel → FTP Access

**3. HOSTINGER_FTP_PASSWORD**
- Your FTP password
- Found in: Hostinger Control Panel → FTP Access (or create new)

### Supabase Environment Variables

**4. VITE_SUPABASE_URL**
- Your Supabase project URL
- Example: `https://zjfilhbczaquokqlcoej.supabase.co`

**5. VITE_SUPABASE_ANON_KEY**
- Your Supabase anonymous key
- Found in: Supabase Dashboard → Settings → API

## Getting Hostinger FTP Credentials

1. **Log into Hostinger Control Panel**
2. **Navigate to File Manager or FTP Access**
3. **Get/Create FTP Account:**
   - Host: Usually `ftp.yourdomain.com`
   - Username: Your FTP username
   - Password: Create/get FTP password
   - Port: Usually 21 (standard FTP)

## Adding Secrets to GitHub

1. Go to your repository: `https://github.com/mitchell1972/findbrexitconsultants`
2. Click **Settings** tab
3. Click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Add each secret with the exact names above

## Deployment Process

Once configured, every push to main/master will:

### Vercel Deployment (for staging/preview)
- Builds and deploys to Vercel hosting
- Fast global CDN distribution
- Automatic previews for branches

### Hostinger Deployment (for production)
- Builds production-optimized version
- Uploads directly to your Hostinger hosting
- Updates live site at FindBrexitConsultants.co.uk

## File Structure on Hostinger

The workflow uploads the built files to:
```
public_html/
├── index.html           # Main entry point
├── .htaccess           # Apache routing configuration
├── robots.txt          # SEO robots file
├── sitemap.xml         # SEO sitemap
└── assets/             # JS, CSS, and static assets
    ├── index-[hash].js
    ├── index-[hash].css
    ├── vendor-[hash].js
    └── [other assets]
```

## Manual Deployment (Alternative)

If you prefer manual deployment:
1. Run: `npm run build:hostinger`
2. Upload `dist/` contents to Hostinger `public_html/`
3. Ensure `.htaccess` is uploaded for React routing

## Troubleshooting

**If deployment fails:**
1. Check GitHub Actions logs for detailed errors
2. Verify FTP credentials are correct
3. Ensure Hostinger hosting is active
4. Check file permissions on Hostinger

**If site doesn't load properly:**
1. Verify `.htaccess` file is uploaded
2. Check Hostinger error logs
3. Ensure SSL certificate is configured
4. Verify domain DNS points to Hostinger

## SSL Certificate

Make sure HTTPS is enabled:
1. Hostinger Control Panel → SSL
2. Enable free SSL certificate
3. Force HTTPS redirects (handled by `.htaccess`)

Your site will be live at: **https://FindBrexitConsultants.co.uk**
