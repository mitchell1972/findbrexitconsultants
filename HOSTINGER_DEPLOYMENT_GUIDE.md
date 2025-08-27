# FindBrexit Consultants - Hostinger Deployment Guide

## Complete Migration to FindBrexitConsultants.co.uk

This guide provides step-by-step instructions to deploy your FindBrexit Consultants application to your Hostinger hosting account using your domain **FindBrexitConsultants.co.uk**.

---

## 📋 Pre-Deployment Checklist

### ✅ What You Have
- ✅ Hostinger hosting account
- ✅ Domain: FindBrexitConsultants.co.uk
- ✅ Complete production build files
- ✅ Stripe integration fully configured
- ✅ Supabase backend ready

### ✅ What's Included in This Package
- ✅ Complete `dist/` folder with production build
- ✅ Configured `.htaccess` file for Apache/Hostinger
- ✅ Security headers and performance optimizations
- ✅ HTTPS redirect configuration
- ✅ React SPA routing support

---

## 🚀 Step-by-Step Deployment Instructions

### Step 1: Access Your Hostinger Control Panel
1. Log in to your Hostinger account
2. Navigate to **File Manager** or use **FTP/SFTP**
3. Locate your domain's root directory (usually `/public_html/` or `/domains/FindBrexitConsultants.co.uk/public_html/`)

### Step 2: Clear Existing Files (If Any)
1. **BACKUP** any existing files you want to keep
2. Remove all files from your domain's root directory
3. Ensure the directory is completely clean

### Step 3: Upload Production Files
1. Upload **ALL contents** from the `dist/` folder to your domain's root directory
2. The structure should look like this in your Hostinger file manager:
   ```
   /public_html/ (or your domain root)
   ├── index.html
   ├── .htaccess
   ├── robots.txt
   ├── sitemap.xml
   ├── use.txt
   └── assets/
       ├── index-CI3IbpB4.js
       ├── index-DL8T8n5G.css
       ├── supabase-BkTJ-oRS.js
       ├── vendor-CGeUl3AT.js
       └── ui-DuwH06Sf.js
   ```

### Step 4: Verify .htaccess Configuration
1. Ensure the `.htaccess` file is uploaded correctly
2. The file contains all necessary configurations:
   - ✅ React Router support
   - ✅ Security headers
   - ✅ HTTPS redirect
   - ✅ Gzip compression
   - ✅ Browser caching

### Step 5: Test Your Deployment
1. Open your browser and navigate to: **https://FindBrexitConsultants.co.uk**
2. Test the following features:
   - ✅ Homepage loads correctly
   - ✅ Navigation between pages works
   - ✅ Direct URL access (e.g., `/pricing`, `/find-consultants`) works
   - ✅ HTTPS is enforced (HTTP redirects to HTTPS)
   - ✅ Payment system is functional
   - ✅ Consultant search works
   - ✅ User registration/login works

---

## 🔧 Hostinger-Specific Configuration

### Domain Setup
- **Domain**: FindBrexitConsultants.co.uk
- **SSL Certificate**: Enable SSL/TLS in Hostinger control panel
- **DNS**: Ensure your domain points to your Hostinger hosting

### File Upload Methods
Choose one of these methods to upload files:

#### Method 1: Hostinger File Manager (Recommended)
1. Use Hostinger's built-in File Manager
2. Upload files directly through the web interface
3. Extract ZIP files if needed

#### Method 2: FTP/SFTP
1. Use FTP credentials from your Hostinger account
2. Use clients like FileZilla, WinSCP, or VS Code SFTP extension
3. Upload files to the correct directory

#### Method 3: ZIP Upload
1. Create a ZIP file of all contents in the `dist/` folder
2. Upload the ZIP file to your domain root
3. Extract the ZIP file using Hostinger's File Manager

---

## 🔍 Troubleshooting Common Issues

### Issue 1: 404 Errors on Direct URLs
**Problem**: Pages like `/pricing` show 404 errors when accessed directly
**Solution**: Ensure `.htaccess` file is uploaded and contains the React Router configuration

### Issue 2: HTTPS Not Working
**Problem**: Site loads with HTTP instead of HTTPS
**Solution**: 
1. Enable SSL in Hostinger control panel
2. Verify `.htaccess` contains HTTPS redirect rules
3. Wait up to 24 hours for SSL propagation

### Issue 3: Static Assets Not Loading
**Problem**: CSS/JS files return 404 errors
**Solution**: 
1. Verify the `assets/` folder is uploaded completely
2. Check file permissions (should be 644 for files, 755 for directories)

### Issue 4: Slow Loading Times
**Problem**: Website loads slowly
**Solution**: 
1. Verify Gzip compression is enabled in `.htaccess`
2. Check browser caching headers
3. Consider upgrading Hostinger plan for better performance

### Issue 5: Payment System Issues
**Problem**: Stripe payments not working
**Solution**: 
1. Verify your domain is added to Stripe dashboard settings
2. Update Stripe webhook endpoints to your new domain
3. Test payment flows thoroughly

---

## 🔐 Security Considerations

### SSL/TLS Certificate
- ✅ SSL is automatically handled by Hostinger
- ✅ HTTPS redirect is configured in `.htaccess`
- ✅ Security headers are implemented

### CORS Configuration
Your Supabase configuration should include your new domain:
- Add `https://FindBrexitConsultants.co.uk` to allowed origins
- Update any API whitelist configurations

### Stripe Webhook Updates
Update your Stripe webhook endpoints:
1. Log in to Stripe Dashboard
2. Go to Developers → Webhooks
3. Update webhook URLs from temporary domain to `https://FindBrexitConsultants.co.uk`

---

## 🚀 Post-Deployment Tasks

### 1. Update External Services
- [ ] **Stripe**: Update webhook URLs and allowed domains
- [ ] **Supabase**: Add new domain to CORS settings
- [ ] **Google Analytics** (if used): Update tracking configuration
- [ ] **Search Console**: Submit new sitemap

### 2. SEO Setup
- [ ] Submit `https://FindBrexitConsultants.co.uk/sitemap.xml` to Google Search Console
- [ ] Update any business listings with new domain
- [ ] Set up Google Analytics for the new domain

### 3. Monitor and Test
- [ ] Monitor error logs in Hostinger control panel
- [ ] Test all payment flows end-to-end
- [ ] Verify email notifications work correctly
- [ ] Check mobile responsiveness

---

## 📞 Support Information

### Hostinger Support
- **Documentation**: Hostinger Knowledge Base
- **Support**: Available through Hostinger control panel
- **Community**: Hostinger Community Forum

### Application Support
- **Supabase**: Check Supabase status and documentation
- **Stripe**: Monitor Stripe dashboard for webhook status
- **General**: Review browser console for any JavaScript errors

---

## 📁 File Structure Reference

Your final hosting directory should contain:

```
/public_html/ (or domain root)
├── index.html                 # Main application entry point
├── .htaccess                  # Apache configuration for routing/security
├── robots.txt                 # Search engine crawler instructions
├── sitemap.xml                # SEO sitemap
├── use.txt                    # Usage/terms file
└── assets/                    # Static assets
    ├── index-CI3IbpB4.js      # Main application bundle
    ├── index-DL8T8n5G.css     # Stylesheet bundle  
    ├── supabase-BkTJ-oRS.js   # Supabase client bundle
    ├── vendor-CGeUl3AT.js     # Third-party vendor libraries
    └── ui-DuwH06Sf.js         # UI component library
```

---

## ✅ Final Checklist

Before going live, verify:
- [ ] All files uploaded successfully
- [ ] `.htaccess` file is present and configured
- [ ] SSL certificate is active
- [ ] Domain resolves to your site
- [ ] All pages are accessible
- [ ] Payment system works correctly
- [ ] User registration/login functions
- [ ] Search functionality operates properly
- [ ] Mobile responsiveness verified
- [ ] External service integrations updated

---

**🎉 Congratulations!** Your FindBrexit Consultants application should now be live at **https://FindBrexitConsultants.co.uk** with full Stripe integration and all features functional.

---

*Generated on: 2025-08-28*  
*Author: MiniMax Agent*
