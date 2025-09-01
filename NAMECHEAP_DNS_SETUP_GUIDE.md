# Namecheap DNS Configuration for findbrexitconsultants.com

## Current Issue
Your Vercel dashboard shows "Invalid Configuration" because your Namecheap DNS records are not pointing to Vercel's servers.

## Step-by-Step Namecheap DNS Configuration

### Step 1: Login to Namecheap
1. Go to https://www.namecheap.com
2. Click "Sign In" and login with your Namecheap credentials
3. Go to "Domain List" in your account dashboard

### Step 2: Access DNS Management
1. Find "findbrexitconsultants.com" in your domain list
2. Click "Manage" next to the domain
3. Click on the "Advanced DNS" tab

### Step 3: Configure DNS Records

You need to add/update these specific records:

#### Record 1: Main Domain (A Record)
```
Type: A Record
Host: @
Value: 76.76.19.61
TTL: Automatic (or 3600)
```

#### Record 2: WWW Subdomain (CNAME Record)
```
Type: CNAME Record
Host: www
Value: cname.vercel-dns.com
TTL: Automatic (or 3600)
```

### Step 4: Remove Conflicting Records
**IMPORTANT:** Remove any existing records that might conflict:
- Delete any existing A records for "@" or "www"
- Delete any existing CNAME records for "@" or "www"
- Keep only the two records specified above

### Step 5: Save Changes
1. Click "Save all changes" in Namecheap
2. You should see a confirmation message

### Step 6: Wait for Propagation
- DNS changes typically take 1-24 hours to propagate
- Most changes are visible within 1-2 hours
- You can check propagation status at: https://dnschecker.org

## Visual Guide for Namecheap

When you're in the "Advanced DNS" tab, you should see:

```
Host Records
┌─────────────┬──────────┬─────────────────────┬─────┐
│ Type        │ Host     │ Value               │ TTL │
├─────────────┼──────────┼─────────────────────┼─────┤
│ A Record    │ @        │ 76.76.19.61         │ Auto│
│ CNAME Record│ www      │ cname.vercel-dns.com│ Auto│
└─────────────┴──────────┴─────────────────────┴─────┘
```

## Verification Steps

### Step 1: Check DNS Propagation
Use these tools to verify your DNS records are working:
- https://dnschecker.org (enter findbrexitconsultants.com)
- https://whatsmydns.net (enter findbrexitconsultants.com)

### Step 2: Check Vercel Dashboard
1. Go back to your Vercel project settings
2. Navigate to "Domains" section
3. Click "Refresh" next to each domain
4. Both domains should now show as "Valid" instead of "Invalid Configuration"

### Step 3: Test Your Website
Once Vercel shows the domains as valid:
1. Visit https://findbrexitconsultants.com
2. Visit https://www.findbrexitconsultants.com
3. Both should load your application

## Troubleshooting

### If domains still show "Invalid Configuration" after 24 hours:

1. **Check DNS Records Again:**
   - Ensure A record points to exactly: 76.76.19.61
   - Ensure CNAME record points to exactly: cname.vercel-dns.com
   - No extra spaces or characters

2. **Remove and Re-add Domain in Vercel:**
   - In Vercel dashboard, remove both domains
   - Wait 5 minutes
   - Add them back again

3. **Contact Namecheap Support:**
   - If DNS records look correct but still not working
   - Namecheap has 24/7 live chat support

## Expected Timeline
- **DNS Configuration:** 5-10 minutes
- **DNS Propagation:** 1-24 hours (usually 1-2 hours)
- **Vercel Recognition:** Immediate after propagation
- **Website Live:** Immediate after Vercel recognizes the domain

## Final Result
Once completed, your website will be accessible at:
- https://findbrexitconsultants.com
- https://www.findbrexitconsultants.com

Both URLs will load your FindBrexit Consultants application with full functionality.
