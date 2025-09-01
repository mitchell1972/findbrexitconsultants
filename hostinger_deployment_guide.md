# Complete Guide: Moving FindBrexit Consultants to Your Hostinger Domain

## 🎯 Overview
This guide will help you deploy your FindBrexit Consultants platform with complete Stripe integration to your Hostinger hosting account at **findbrexitconsultants.com**.

## 📋 Prerequisites

### What You Need:
- ✅ Hostinger hosting account with domain **findbrexitconsultants.com**
- ✅ FTP/File Manager access to your Hostinger account
- ✅ The built application files (already prepared)
- ✅ Supabase project with Stripe integration (already configured)

## 🚀 Step-by-Step Deployment Process

### Step 1: Prepare Production Build
The application is already built for production with Hostinger-optimized settings. The build includes:
- ✅ Stripe payment integration
- ✅ 14-day free trial system  
- ✅ Subscription management
- ✅ Optimized for Hostinger Apache servers

### Step 2: Access Your Hostinger Account

1. **Login to Hostinger hPanel**
   - Go to: https://hpanel.hostinger.com/
   - Login with your Hostinger credentials

2. **Navigate to File Manager**
   - Click on "File Manager" in the hPanel dashboard
   - Navigate to `public_html` folder (this is your website root)

### Step 3: Upload Website Files

#### Option A: Using Hostinger File Manager
1. **Clear existing files** (if any) in `public_html`
2. **Upload all files** from the `/workspace/findbrexit-consultants/dist/` folder:
   ```
   📁 Files to upload:
   ├── index.html
   ├── .htaccess (CRITICAL for React routing)
   ├── robots.txt
   ├── sitemap.xml
   └── assets/ (entire folder with all JS/CSS files)
   ```

#### Option B: Using FTP Client (FileZilla, etc.)
1. **FTP Credentials** (find in hPanel → FTP Accounts):
   - Host: your-domain.com or IP address
   - Username: your FTP username
   - Password: your FTP password
   - Port: 21

2. **Upload Process**:
   - Connect to FTP
   - Navigate to `public_html/`
   - Upload all files from `dist/` folder

### Step 4: Configure Domain & SSL

1. **Domain Settings**:
   - Ensure **findbrexitconsultants.com** points to your Hostinger servers
   - DNS should be managed by Hostinger nameservers

2. **Enable SSL Certificate**:
   - In hPanel → SSL → Enable free SSL for your domain
   - Force HTTPS redirect (should be automatic)

### Step 5: Configure Supabase CORS

1. **Login to Supabase Dashboard**:
   - Go to: https://supabase.com/dashboard
   - Select your project: `zjfilhbczaquokqlcoej`

2. **Update CORS Settings**:
   - Navigate to: Settings → API
   - In "CORS Settings", add your domain:
```
VITE_SITE_URL=https://findbrexitconsultants.com
VITE_SUPABASE_URL=https://zjfilhbczaquokqlcoej.supabase.co
```

### Step 6: Update Stripe Webhook URL

1. **Access Stripe Dashboard**:
   - Go to: https://dashboard.stripe.com
   - Navigate to: Developers → Webhooks

2. **Update Webhook Endpoint**:
   - Find your existing webhook
   - Update URL to: `https://zjfilhbczaquokqlcoej.supabase.co/functions/v1/stripe-webhook`
   - Ensure these events are selected:
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`

### Step 7: Test Deployment

#### Critical Tests to Perform:
1. **Website Loading**: Visit https://findbrexitconsultants.com
2. **React Routing**: Test navigation (should work without 404 errors)
3. **Authentication**: Test sign up/sign in functionality
4. **Payment System**: 
   - Test subscription signup (use Stripe test mode)
   - Verify 14-day free trial workflow
   - Test customer portal access

#### Test Payment Flow:
1. Go to pricing page
2. Click "Start Free Trial" on any plan
3. Complete Stripe Checkout (use test card: 4242424242424242)
4. Verify subscription appears in dashboard
5. Test customer portal access

## 🔧 Configuration Files Already Optimized

### .htaccess Configuration
Your site includes an optimized `.htaccess` file for:
- ✅ React SPA routing support
- ✅ HTTPS redirect
- ✅ Gzip compression
- ✅ Browser caching
- ✅ Security headers

### Environment Variables
Production build uses:
```
VITE_SITE_URL=https://findbrexitconsultants.com
VITE_SUPABASE_URL=https://zjfilhbczaquokqlcoej.supabase.co
VITE_SUPABASE_ANON_KEY=[your-key]
BUILD_MODE=prod
NODE_ENV=production
```

## 🛡️ Security Features Included

- ✅ **PCI Compliance**: Stripe handles all payment data
- ✅ **SSL/TLS**: HTTPS encryption for all traffic
- ✅ **CORS Protection**: Configured for your domain only
- ✅ **Webhook Security**: Stripe signature verification
- ✅ **Authentication**: Supabase secure user management

## 💳 Stripe Integration Features Live

- ✅ **14-Day Free Trials**: No upfront payment required
- ✅ **Three Subscription Tiers**: Starter (£29), Professional (£99), Enterprise (£249)
- ✅ **Customer Portal**: Self-service billing management
- ✅ **Automated Invoicing**: Stripe handles all billing
- ✅ **Subscription Management**: Upgrade/downgrade/cancel functionality

## 🚨 Troubleshooting

### Common Issues & Solutions:

**1. 404 Errors on Page Refresh**
- **Problem**: `.htaccess` file missing or not working
- **Solution**: Ensure `.htaccess` file is uploaded and contains React routing rules

**2. Payment Not Working**
- **Problem**: CORS or webhook configuration
- **Solution**: Check Supabase CORS settings and Stripe webhook URL

**3. Site Not Loading**
- **Problem**: DNS or SSL issues
- **Solution**: Wait up to 24 hours for DNS propagation, verify SSL certificate

**4. Authentication Issues**
- **Problem**: Supabase CORS settings
- **Solution**: Ensure your domain is added to Supabase CORS whitelist

## 📞 Support Resources

- **Hostinger Support**: Available 24/7 via hPanel chat
- **Supabase Docs**: https://supabase.com/docs
- **Stripe Support**: https://support.stripe.com

## 🎉 Go Live Checklist

Before announcing your site:
- [ ] Website loads correctly at your domain
- [ ] All pages navigate properly (no 404s)
- [ ] User registration/login works
- [ ] Payment system processes test transactions
- [ ] Customer portal accessible
- [ ] SSL certificate active (green padlock)
- [ ] Contact forms working
- [ ] Mobile responsiveness verified

---

Your FindBrexit Consultants platform with complete Stripe integration is ready for production! 🚀

**Live URL**: https://findbrexitconsultants.com (once deployed)
**Admin Dashboard**: Accessible after deployment for managing consultants and subscriptions
