# Vercel Deployment Guide for FindBrexitConsultants.co.uk

## Prerequisites
- Vercel account (you mentioned you already have one)
- Vercel CLI installed on your local machine (optional, can also deploy via web interface)

## Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Prepare the Project
The project is already configured with:
- ✅ Domain set to FindBrexitConsultants.co.uk in all configuration files
- ✅ Vercel configuration file (`vercel.json`) created
- ✅ Built files ready in the `dist` folder
- ✅ All meta tags, sitemap, and robots.txt configured with correct domain

### Step 2: Deploy to Vercel

1. **Upload to Git Repository** (if not already done):
   - Create a new repository on GitHub/GitLab/Bitbucket
   - Push the `findbrexit-consultants` folder to your repository

2. **Import Project to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Vercel will automatically detect it's a Vite project

3. **Configure Build Settings**:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Add Environment Variables** (Important):
   Add these environment variables in Vercel dashboard:
   ```
   VITE_SUPABASE_URL=https://zjfilhbczaquokqlcoej.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqZmlsaGJjemFxdW9rcWxjb2VqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MzQ2MjIsImV4cCI6MjA3MTExMDYyMn0.b6YATor8UyDwYSiSagOQUxM_4sqfCv-89CBXVgC2hP0
   VITE_STRIPE_PUBLISHABLE_KEY=[Your Stripe Publishable Key]
   ```

5. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy your application
   - You'll get a `.vercel.app` URL initially

### Step 3: Configure Custom Domain

1. **Add Custom Domain**:
   - In your Vercel dashboard, go to your project
   - Navigate to "Settings" → "Domains"
   - Add `FindBrexitConsultants.co.uk`
   - Add `www.FindBrexitConsultants.co.uk` (recommended for SEO)

2. **Update DNS Settings**:
   You'll need to update your domain's DNS settings with your domain provider:
   
   **For Apex Domain (FindBrexitConsultants.co.uk):**
   - Type: `A`
   - Name: `@` or leave blank
   - Value: `76.76.19.61` (Vercel's IP)
   
   **For WWW Subdomain:**
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`

   **Alternative (if your provider supports ALIAS/ANAME):**
   - Type: `ALIAS` or `ANAME`
   - Name: `@`
   - Value: `cname.vercel-dns.com`

## Method 2: Deploy via Vercel CLI (Alternative)

If you prefer using the command line:

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   Navigate to the `findbrexit-consultants` folder and run:
   ```bash
   vercel --prod
   ```

4. **Follow the prompts** and configure your custom domain as described above.

## Post-Deployment Checklist

After deployment, verify:
- [ ] Application loads correctly at your domain
- [ ] All pages are accessible
- [ ] Supabase connection works (test registration/login)
- [ ] Stripe integration works (if applicable)
- [ ] SEO meta tags are correct
- [ ] Sitemap.xml is accessible at `/sitemap.xml`
- [ ] Robots.txt is accessible at `/robots.txt`

## Deployment Status

✅ **Project Configuration**: Complete
✅ **Domain Configuration**: Complete (FindBrexitConsultants.co.uk)
✅ **Build Files**: Ready
✅ **Vercel Configuration**: Created
✅ **Environment Variables**: Identified (need to be added in Vercel dashboard)

## Support

If you encounter any issues during deployment:
1. Check the Vercel deployment logs in your dashboard
2. Ensure all environment variables are properly set
3. Verify your DNS settings with your domain provider
4. Test the application functionality after deployment

## Next Steps

1. Follow the deployment steps above
2. Configure your custom domain DNS settings
3. Test the deployed application thoroughly
4. Set up any additional monitoring or analytics if needed

The application is ready for deployment with the correct domain configuration!
