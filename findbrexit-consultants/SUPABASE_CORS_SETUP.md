# Supabase CORS Configuration for FindBrexitConsultants.co.uk

## Overview
When deploying FindBrexitConsultants to the custom domain `findbrexitconsultants.co.uk`, you need to update the Supabase CORS (Cross-Origin Resource Sharing) settings to allow requests from the new domain.

## Required CORS Domains
Add these domains to your Supabase project's CORS settings:

### Primary Domain
```
https://FindBrexitConsultants.co.uk
```

### Subdomains (if needed)
```
https://www.FindBrexitConsultants.co.uk
https://*.findbrexitconsultants.co.uk
```

### Development/Testing (optional - remove in production)
```
http://localhost:3000
http://localhost:5173
https://4zco4jfuq9jq.space.minimax.io
```

## How to Update CORS Settings

### Method 1: Supabase Dashboard
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `zjfilhbczaquokqlcoej`
3. Navigate to `Settings` → `API`
4. Scroll down to `CORS Configuration`
5. Add the domains listed above
6. Save changes

### Method 2: Supabase CLI (if available)
```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref zjfilhbczaquokqlcoej

# Update CORS settings
supabase projects update-cors --origins "https://FindBrexitConsultants.co.uk,https://www.FindBrexitConsultants.co.uk"
```

## Verification Steps

### 1. Test API Connection
After updating CORS settings, test the connection:
```javascript
// Open browser console on findbrexitconsultants.co.uk and run:
fetch('https://zjfilhbczaquokqlcoej.supabase.co/rest/v1/brexit_consultants?select=id,company_name&limit=1', {
  headers: {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqZmlsaGJjemFxdW9rcWxjb2VqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MzQ2MjIsImV4cCI6MjA3MTExMDYyMn0.b6YATor8UyDwYSiSagOQUxM_4sqfCv-89CBXVgC2hP0',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqZmlsaGJjemFxdW9rcWxjb2VqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MzQ2MjIsImV4cCI6MjA3MTExMDYyMn0.b6YATor8UyDwYSiSagOQUxM_4sqfCv-89CBXVgC2hP0'
  }
}).then(response => response.json()).then(data => console.log(data));
```

### 2. Test Authentication
Try the authentication flow on the new domain to ensure it works properly.

### 3. Test Edge Functions
If using Supabase Edge Functions, test them individually:
```javascript
// Test quote request function
fetch('https://zjfilhbczaquokqlcoej.supabase.co/functions/v1/submit-quote-request', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqZmlsaGJjemFxdW9rcWxjb2VqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MzQ2MjIsImV4cCI6MjA3MTExMDYyMn0.b6YATor8UyDwYSiSagOQUxM_4sqfCv-89CBXVgC2hP0'
  },
  body: JSON.stringify({ test: true })
});
```

## Common CORS Issues & Solutions

### Issue 1: CORS Error Still Persists
**Solution**: 
- Wait 5-10 minutes for changes to propagate
- Clear browser cache and cookies
- Try in incognito/private browsing mode

### Issue 2: Wildcard Domain Not Working
**Solution**:
- Add specific subdomains individually instead of using wildcards
- Ensure HTTPS is used for all domains

### Issue 3: Development vs Production
**Solution**:
- Keep development URLs separate from production
- Use environment-specific CORS settings if possible

## Edge Functions CORS
If you're using Supabase Edge Functions, they inherit the project's CORS settings. However, you may need to handle CORS in the function code:

```typescript
// Example Edge Function CORS handling
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://FindBrexitConsultants.co.uk',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders })
  }
  
  // Your function logic here
  
  return new Response(JSON.stringify({ success: true }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})
```

## Security Considerations

1. **Remove Development URLs**: After deployment, remove development and staging URLs from CORS settings
2. **Use HTTPS Only**: Never allow HTTP origins in production
3. **Specific Domains**: Avoid wildcards in production; use specific domains
4. **Regular Audits**: Periodically review and clean up CORS settings

## Troubleshooting Checklist

- [ ] CORS domains added to Supabase project settings
- [ ] HTTPS used for all domains
- [ ] Changes have propagated (wait 5-10 minutes)
- [ ] Browser cache cleared
- [ ] Test in different browsers/incognito mode
- [ ] Edge functions (if used) handle CORS properly
- [ ] Authentication redirects work with new domain
- [ ] All API endpoints accessible from new domain

## Contact Support
If issues persist, contact Supabase support with:
- Project reference: `zjfilhbczaquokqlcoej`
- Domain: `findbrexitconsultants.co.uk`
- Specific error messages
- Browser network tab screenshots