# How to Update Supabase CORS Settings for findbrexitconsultants.com

## What is CORS?
CORS (Cross-Origin Resource Sharing) controls which domains can access your Supabase database from a web browser. You need to add your custom domain to allow your website to connect to the database.

## Step-by-Step Instructions

### Step 1: Login to Supabase Dashboard
1. Go to https://supabase.com/dashboard
2. Login with your Supabase account credentials
3. You should see your project listed

### Step 2: Select Your Project
1. Click on your project: `zjfilhbczaquokqlcoej`
2. This will open your project dashboard

### Step 3: Navigate to API Settings
1. In the left sidebar, click on "Settings" (gear icon)
2. Click on "API" in the settings menu
3. Scroll down to find the "CORS Settings" section

### Step 4: Update CORS Settings
In the CORS settings section, you'll see a text area with allowed origins. You need to add your domain:

**Current CORS settings likely include:**
```
https://findbrexitconsultants-git-main-mitchells-projects-99699068.vercel.app
https://findbrexitconsultants-i8mi4pcy1-mitchells-projects-99699068.vercel.app
```

**Add these new entries:**
```
https://findbrexitconsultants.com
https://www.findbrexitconsultants.com
```

**Final CORS settings should look like:**
```
https://findbrexitconsultants-git-main-mitchells-projects-99699068.vercel.app
https://findbrexitconsultants-i8mi4pcy1-mitchells-projects-99699068.vercel.app
https://findbrexitconsultants.com
https://www.findbrexitconsultants.com
```

### Step 5: Save Changes
1. Click the "Save" button at the bottom of the CORS settings section
2. You should see a confirmation message that the settings were updated

### Step 6: Test the Connection
1. Wait 1-2 minutes for the changes to take effect
2. Visit https://findbrexitconsultants.com
3. Try to sign up or sign in to test the database connection
4. If authentication works, the CORS settings are correct

## Visual Guide

When you're in the Supabase dashboard:

```
Dashboard → Settings → API → Scroll to "CORS Settings"

┌─────────────────────────────────────────────────────────┐
│ CORS Settings                                           │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ https://findbrexitconsultants-git-main-mitchells... │ │
│ │ https://findbrexitconsultants-i8mi4pcy1-mitchells...│ │
│ │ https://findbrexitconsultants.com                   │ │ ← Add this
│ │ https://www.findbrexitconsultants.com               │ │ ← Add this
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ [Save]                                                  │
└─────────────────────────────────────────────────────────┘
```

## Important Notes

- **One URL per line**: Each domain should be on its own line
- **Include https://**: Always use the full URL with protocol
- **Include both www and non-www**: This ensures both versions work
- **No trailing slashes**: Don't add "/" at the end of URLs
- **Case sensitive**: Use exact domain spelling

## Troubleshooting

### If you get CORS errors after updating:
1. **Wait 2-3 minutes**: Changes can take time to propagate
2. **Clear browser cache**: Hard refresh with Ctrl+F5 or Cmd+Shift+R
3. **Check spelling**: Ensure domains are spelled exactly right
4. **Try incognito mode**: To bypass browser cache

### If you can't find the CORS settings:
1. Make sure you're in the correct project (`zjfilhbczaquokqlcoej`)
2. Look for "Settings" in the left sidebar (gear icon)
3. Click "API" in the settings submenu
4. Scroll down - CORS settings are usually near the bottom

## Expected Result
After updating CORS settings:
- ✅ Authentication will work on findbrexitconsultants.com
- ✅ All database operations will function properly
- ✅ No more CORS-related errors in browser console
- ✅ Full application functionality on custom domain

This is the final step needed to make your custom domain fully functional!
