# Hostinger Deployment Configuration

## Domain Setup
- **Production Domain**: https://findbrexitconsultants.co.uk
- **Hosting Provider**: Hostinger
- **Server Type**: Apache (shared/premium hosting)

## Required Files in dist/ folder:
- index.html (main entry point)
- .htaccess (Apache configuration for SPA routing)
- assets/ folder (JS, CSS, images)
- robots.txt
- sitemap.xml

## Environment Variables for Production:
```
VITE_SITE_URL=https://findbrexitconsultants.co.uk
VITE_SUPABASE_URL=https://zjfilhbczaquokqlcoej.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqZmlsaGJjemFxdW9rcWxjb2VqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MzQ2MjIsImV4cCI6MjA3MTExMDYyMn0.b6YATor8UyDwYSiSagOQUxM_4sqfCv-89CBXVgC2hP0
BUILD_MODE=prod
NODE_ENV=production
```

## Build Commands:
```bash
# Install dependencies
npm install

# Build for production
npm run build:hostinger

# Preview production build locally (optional)
npm run preview:prod
```

## Deployment Steps:
1. Run `npm run build:hostinger` to create optimized production build
2. Upload entire contents of `dist/` folder to Hostinger public_html directory
3. Ensure .htaccess file is uploaded and accessible
4. Verify domain DNS settings point to Hostinger servers
5. Test website functionality after deployment

## Supabase CORS Configuration:
Ensure the following domain is added to Supabase CORS settings:
- https://findbrexitconsultants.co.uk
- https://*.findbrexitconsultants.co.uk (for subdomains)

## SSL Certificate:
Hostinger typically provides free SSL certificates. Ensure HTTPS is enabled for the domain.

## Performance Optimizations Applied:
- Code splitting with manual chunks
- Terser minification
- Gzip compression via .htaccess
- Static asset caching
- Removed source maps for production

## File Structure After Build:
```
dist/
├── index.html
├── .htaccess
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   ├── vendor-[hash].js
│   ├── supabase-[hash].js
│   └── ui-[hash].js
└── [other static assets]
```