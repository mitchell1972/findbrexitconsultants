# DNS Configuration Guide for findbrexitconsultants.com

## Current Issue
Your Vercel dashboard shows "Invalid Configuration" for both:
- findbrexitconsultants.com
- www.findbrexitconsultants.com

This means the DNS records for your domain are not pointing to Vercel's servers.

## Step-by-Step DNS Configuration

### Step 1: Access Your Domain Provider
Log into the control panel where you purchased findbrexitconsultants.com (e.g., GoDaddy, Namecheap, Google Domains, etc.)

### Step 2: Navigate to DNS Management
Look for one of these sections in your domain provider's dashboard:
- DNS Management
- DNS Records
- DNS Settings
- Domain Management
- Advanced DNS

### Step 3: Configure DNS Records

You need to add/update these DNS records:

#### For the main domain (findbrexitconsultants.com):
```
Type: A
Name: @ (or leave blank)
Value: 76.76.19.61
TTL: 3600 (or Auto)
```

#### For the www subdomain (www.findbrexitconsultants.com):
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (or Auto)
```

### Step 4: Alternative Configuration (if ALIAS/ANAME is supported)
Some DNS providers support ALIAS or ANAME records, which can be used instead of the A record:

```
Type: ALIAS (or ANAME)
Name: @ (or leave blank)
Value: cname.vercel-dns.com
TTL: 3600 (or Auto)
```

### Step 5: Save and Wait for Propagation
1. Save your DNS changes
2. Wait for DNS propagation (typically 1-24 hours)
3. You can check propagation status using online tools like:
   - https://dnschecker.org
   - https://whatsmydns.net

### Step 6: Verify in Vercel
Once DNS propagation is complete:
1. Go back to your Vercel dashboard
2. Click "Refresh" next to each domain
3. The "Invalid Configuration" errors should disappear
4. Your domains should show as "Valid" or "Active"

## Common DNS Provider Instructions

### GoDaddy:
1. Login to GoDaddy account
2. Go to "My Products" → "Domains"
3. Click "DNS" next to your domain
4. Add the A and CNAME records as specified above

### Namecheap:
1. Login to Namecheap account
2. Go to "Domain List"
3. Click "Manage" next to your domain
4. Go to "Advanced DNS" tab
5. Add the A and CNAME records as specified above

### Google Domains:
1. Login to Google Domains
2. Select your domain
3. Go to "DNS" in the left sidebar
4. Scroll to "Custom resource records"
5. Add the A and CNAME records as specified above

### Cloudflare:
1. Login to Cloudflare dashboard
2. Select your domain
3. Go to "DNS" → "Records"
4. Add the A and CNAME records as specified above
5. Make sure the cloud icon is "gray" (DNS only, not proxied)

## Troubleshooting

### If you still see "Invalid Configuration" after 24 hours:
1. Double-check that the DNS records are exactly as specified
2. Ensure there are no conflicting DNS records
3. Try removing and re-adding the domain in Vercel
4. Contact your DNS provider's support if needed

### Common mistakes to avoid:
- Don't include "http://" or "https://" in DNS record values
- Make sure the A record points to 76.76.19.61 (not a different IP)
- Ensure the CNAME record points to cname.vercel-dns.com (not a different value)
- Don't set up both A and ALIAS/ANAME records for the same domain

## Next Steps After DNS Configuration
Once your domains show as valid in Vercel:
1. Test that your website loads at https://findbrexitconsultants.com
2. Test that https://www.findbrexitconsultants.com also works
3. Update Supabase CORS settings to include your domain
4. Test all functionality (authentication, payments, etc.)

Your website should then be fully accessible at findbrexitconsultants.com!
