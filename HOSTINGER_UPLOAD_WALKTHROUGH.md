# 🚀 Step-by-Step Hostinger Upload Guide
## Getting FindBrexitConsultants.co.uk Live

### Prerequisites ✅
- Hostinger account login credentials
- FindBrexitConsultants.co.uk domain pointed to your hosting
- Downloaded and extracted `FindBrexitConsultants-Hostinger-Deployment.zip`

---

## 📁 Method 1: Using Hostinger File Manager (Recommended)

### Step 1: Access Your Hosting Control Panel
1. **Go to**: https://hpanel.hostinger.com/
2. **Log in** with your Hostinger credentials
3. **Select** your hosting plan/account

### Step 2: Navigate to File Manager
1. In your hosting control panel, look for **"File Manager"**
2. Click on **File Manager** 
3. You'll see your domain structure

### Step 3: Locate Your Domain Directory
1. **Look for**: `domains/FindBrexitConsultants.co.uk/public_html/`
   - OR it might be: `public_html/FindBrexitConsultants.co.uk/`
   - OR simply: `public_html/` (if it's your primary domain)
2. **Double-click** to open your domain's root directory

### Step 4: Clear Existing Files (IMPORTANT)
1. **Select all existing files** in the directory (if any)
2. **Right-click** → **Delete** (or use Delete button)
3. **Confirm deletion**
4. **Ensure the directory is completely empty**

### Step 5: Upload Your Files
1. **Click** the "Upload Files" button (usually a cloud/arrow icon)
2. **Navigate** to your extracted deployment package folder
3. **Select ALL files**:
   ```
   ✓ index.html
   ✓ .htaccess
   ✓ robots.txt  
   ✓ sitemap.xml
   ✓ use.txt
   ✓ assets/ (entire folder)
   ```
4. **Upload** all files at once
5. **Wait** for upload to complete (progress bar will show)

### Step 6: Verify File Structure
After upload, your directory should look like:
```
/public_html/ (or your domain root)
├── index.html ✓
├── .htaccess ✓
├── robots.txt ✓
├── sitemap.xml ✓
├── use.txt ✓
└── assets/ ✓
    ├── index-CI3IbpB4.js
    ├── index-DL8T8n5G.css
    ├── supabase-BkTJ-oRS.js
    ├── vendor-CGeUl3AT.js
    └── ui-DuwH06Sf.js
```

---

## 📁 Method 2: Using FTP/SFTP (Alternative)

### Step 1: Get Your FTP Credentials
1. In Hostinger control panel, go to **"FTP Accounts"**
2. **Copy** your FTP details:
   - **Host**: usually `ftp.yourhosting.com` or your domain
   - **Username**: your FTP username  
   - **Password**: your FTP password
   - **Port**: 21 (FTP) or 22 (SFTP)

### Step 2: Connect Using FTP Client
**Popular FTP Clients:**
- **FileZilla** (Free) - https://filezilla-project.org/
- **WinSCP** (Windows) - https://winscp.net/
- **Cyberduck** (Mac) - https://cyberduck.io/

### Step 3: Upload Files
1. **Connect** to your FTP server
2. **Navigate** to your domain's root directory
3. **Clear** existing files
4. **Upload** all files from your deployment package

---

## 🔍 Post-Upload Verification

### Step 1: Test Your Website
1. **Open browser** and go to: **https://FindBrexitConsultants.co.uk**
2. **Check that**:
   - Homepage loads correctly ✓
   - CSS styling is applied ✓
   - No 404 errors ✓

### Step 2: Test Key Features
1. **Navigation**: Click between pages (Pricing, Find Consultants, etc.)
2. **Direct URLs**: Try typing `FindBrexitConsultants.co.uk/pricing` directly
3. **Mobile**: Test on your phone
4. **HTTPS**: Ensure it redirects from HTTP to HTTPS

### Step 3: Test Critical Functions
1. **Search**: Try searching for consultants
2. **Registration**: Test user signup
3. **Payments**: Test subscription signup (use Stripe test mode)

---

## ⚠️ Common Issues & Solutions

### Issue: "Site Not Found" or Shows Hostinger Default
**Solution**: 
- Verify files are in the correct directory
- Check domain DNS settings (may take 24 hours to propagate)
- Ensure you're uploading to the right domain folder

### Issue: 404 Errors on Internal Pages
**Solution**:
- Verify `.htaccess` file is uploaded
- Check `.htaccess` file isn't corrupted
- Ensure Apache mod_rewrite is enabled (contact Hostinger if needed)

### Issue: CSS/JS Not Loading
**Solution**:
- Verify `assets/` folder uploaded completely
- Check file permissions (should be 644 for files, 755 for folders)
- Clear browser cache

### Issue: HTTPS Not Working
**Solution**:
- Enable SSL in Hostinger control panel
- Wait up to 24 hours for SSL activation
- Verify `.htaccess` contains HTTPS redirect rules

---

## 🎯 Final Checklist

Before considering deployment complete:

### Technical Checks
- [ ] All files uploaded successfully
- [ ] `.htaccess` file present and working
- [ ] SSL certificate active (https://)
- [ ] All pages accessible
- [ ] Assets loading correctly

### Functional Checks  
- [ ] Homepage displays properly
- [ ] Navigation between pages works
- [ ] Search functionality works
- [ ] User registration/login works
- [ ] Payment system functional (test mode)
- [ ] Mobile responsiveness verified

### External Services
- [ ] Update Stripe webhook URLs to new domain
- [ ] Add FindBrexitConsultants.co.uk to Supabase CORS
- [ ] Test payment flows end-to-end

---

## 🎉 You're Live!

Once all checks pass, your **FindBrexit Consultants** application will be fully operational at:

**https://FindBrexitConsultants.co.uk** 

With all features including:
- ✅ Stripe payment processing
- ✅ User authentication  
- ✅ Consultant directory
- ✅ Quote request system
- ✅ Mobile-responsive design
- ✅ SEO optimization

---

**Need Help?** 
- Check the detailed troubleshooting in `HOSTINGER_DEPLOYMENT_GUIDE.md`
- Contact Hostinger support for hosting-related issues
- Test thoroughly before going fully live!
