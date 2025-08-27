# Post-Deployment Smoke Test Plan
# FindBrexitConsultants.co.uk - Hostinger Deployment Verification

**Domain**: https://findbrexitconsultants.co.uk  
**Test Duration**: ~10-15 minutes  
**Purpose**: Verify critical functionality after deployment  

---

## 🔍 Critical Path Testing (7 Core Tests)

### Test 1: Homepage Loading & Navigation ✅/❌
**Objective**: Verify main site loads and navigation works

**Steps**:
1. Visit `https://findbrexitconsultants.co.uk`
2. Verify page loads within 3 seconds
3. Check for any console errors (F12 Developer Tools)
4. Click on "Find Consultants" in navigation
5. Verify URL changes to `/find-consultants`

**Expected Results**:
- ✅ Homepage displays hero section with search form
- ✅ Navigation menu visible and functional
- ✅ No JavaScript errors in console
- ✅ "Find Consultants" page loads successfully

**Pass Criteria**: All checkboxes above must be ✅

---

### Test 2: Consultant Directory Search ✅/❌
**Objective**: Verify search functionality and consultant listings

**Steps**:
1. On Find Consultants page, verify consultant cards display
2. Use search bar: enter "customs"
3. Click "Find Consultants" button
4. Verify filtered results appear
5. Click "View Profile" on first consultant

**Expected Results**:
- ✅ 6+ consultant cards visible initially
- ✅ Search filters work (shows relevant results)
- ✅ Individual consultant profiles accessible
- ✅ URLs change correctly (e.g., `/consultant/[id]`)

**Pass Criteria**: Search returns relevant results and profiles load

---

### Test 3: Consultant Profile Functionality ✅/❌
**Objective**: Verify individual consultant pages work correctly

**Steps**:
1. From consultant profile page, check all tabs:
   - Overview (default)
   - Services & Industries 
   - Reviews
   - Contact Information
2. Click "Request Quote" button
3. Verify quote form appears/loads

**Expected Results**:
- ✅ All 4 tabs clickable and display content
- ✅ Consultant information displays correctly
- ✅ "Request Quote" functionality works
- ✅ Contact information visible

**Pass Criteria**: Tabbed navigation and quote request work

---

### Test 4: Quote Request Form ✅/❌
**Objective**: Verify quote submission functionality

**Steps**:
1. From consultant profile or `/request-quote`, fill form:
   - Name: "Test User"
   - Email: "test@example.com"
   - Company: "Test Company Ltd"
   - Message: "Test message for Brexit compliance"
2. Submit form
3. Check for success/error message
4. Verify no console errors during submission

**Expected Results**:
- ✅ Form fields accept input correctly
- ✅ Form validation works (try submitting empty form)
- ✅ Submission shows success message or redirect
- ✅ No JavaScript errors during submission

**Pass Criteria**: Form submits successfully with proper feedback

---

### Test 5: Mobile Responsive Design ✅/❌
**Objective**: Verify mobile compatibility

**Steps**:
1. Open Chrome DevTools (F12)
2. Click device emulation button (phone/tablet icon)
3. Select "iPhone 12" or similar mobile device
4. Navigate through:
   - Homepage
   - Find Consultants
   - Individual consultant profile
5. Test navigation menu on mobile

**Expected Results**:
- ✅ Content fits mobile screen width
- ✅ Navigation menu adapts to mobile (hamburger menu)
- ✅ Text remains readable on small screens
- ✅ Buttons and links easily tappable

**Pass Criteria**: Site fully functional on mobile devices

---

### Test 6: API Integration (Supabase) ✅/❌
**Objective**: Verify database connectivity and data loading

**Steps**:
1. Open browser Developer Tools (F12) → Network tab
2. Refresh Find Consultants page
3. Look for API calls to `zjfilhbczaquokqlcoej.supabase.co`
4. Verify API calls return 200 status (not CORS errors)
5. Check consultant data loads correctly

**Expected Results**:
- ✅ Supabase API calls successful (200 status)
- ✅ No CORS errors in console
- ✅ Consultant data displays correctly
- ✅ Search filtering works with database

**Pass Criteria**: All API calls successful, no CORS issues

---

### Test 7: SEO & Performance Basics ✅/❌
**Objective**: Verify basic SEO elements and performance

**Steps**:
1. View page source (Ctrl+U)
2. Check for proper `<title>` tag
3. Verify meta description exists
4. Test site speed (use built-in browser tools or PageSpeed)
5. Check `/robots.txt` and `/sitemap.xml` accessibility

**Expected Results**:
- ✅ Page titles descriptive and unique
- ✅ Meta descriptions present
- ✅ `/robots.txt` loads correctly
- ✅ `/sitemap.xml` loads correctly
- ✅ Site loads reasonably fast (< 3 seconds)

**Pass Criteria**: Basic SEO elements present and functional

---

## 🚑 Troubleshooting Quick Fixes

### Common Issues & Solutions

**Issue**: Blank page or "Cannot GET /[route]" errors  
**Solution**: Check if `.htaccess` file uploaded correctly

**Issue**: API/CORS errors in console  
**Solution**: Configure Supabase CORS settings (see `SUPABASE_CORS_SETUP.md`)

**Issue**: Forms not submitting  
**Solution**: Verify Supabase environment variables and API connectivity

**Issue**: Slow loading or assets not found  
**Solution**: Check file permissions and ensure all `dist/assets/` uploaded

**Issue**: SSL/HTTPS certificate errors  
**Solution**: Verify Hostinger SSL certificate is active and force HTTPS redirect

---

## 📄 Test Results Template

```
FindBrexitConsultants.co.uk - Post-Deployment Test Results
Date: _______________
Tested by: ___________

□ Test 1: Homepage Loading & Navigation
□ Test 2: Consultant Directory Search  
□ Test 3: Consultant Profile Functionality
□ Test 4: Quote Request Form
□ Test 5: Mobile Responsive Design
□ Test 6: API Integration (Supabase)
□ Test 7: SEO & Performance Basics

Overall Status: ✅ PASS / ❌ FAIL

Notes:
_________________________________
_________________________________
_________________________________

Issues Found:
_________________________________
_________________________________
_________________________________
```

---

## 🔄 Regression Testing (Optional)

If any test fails, re-run all tests after implementing fixes to ensure no new issues were introduced.

**Final Deployment Approval**: All 7 critical tests must PASS ✅ before considering deployment successful.

---

## 📨 Escalation Path

1. **Minor Issues** (1-2 test failures): Fix issues and re-test
2. **Major Issues** (3+ test failures): Review deployment process and configurations
3. **Critical Issues** (Site completely broken): Rollback to previous version if available

**Support Resources**:
- Hostinger Support: For hosting/domain issues
- Supabase Documentation: For API/database issues  
- Browser Developer Tools: For debugging JavaScript errors

---

*Quick Test Completion Time: ~10-15 minutes*  
*Comprehensive Test: ~30-45 minutes*