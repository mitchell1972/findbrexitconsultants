# Directory Filter Testing Script

## Purpose
This script comprehensively tests the directory filtering system to validate that the critical location filter bug has been fixed.

## Critical Bug
**Issue**: When users selected "Birmingham" location filter, they received results from Edinburgh, London, Cardiff, Belfast, Manchester, AND Birmingham instead of just Birmingham results.

**Expected After Fix**: Birmingham filter should show ONLY Birmingham consultants.

## Usage

### Prerequisites
```bash
# Ensure Node.js is installed
node --version

# Install fetch if not available (Node.js < 18)
npm install node-fetch  # if needed
```

### Running Tests

```bash
# Run the comprehensive test suite
node comprehensive_directory_filter_tests.js
```

### Test Categories

1. **CRITICAL Location Filters**
   - Birmingham → Should show only Birmingham
   - London → Should show only London  
   - Manchester → Should show only Manchester
   - Scotland, Wales, Northern Ireland

2. **Service Type Filters**
   - Customs Declarations
   - VAT/Tax Compliance
   - Northern Ireland Protocol
   - Regulatory Compliance
   - Import/Export Documentation
   - Supply Chain Consulting

3. **Industry Filters**
   - Food & Beverage
   - Manufacturing
   - Automotive
   - Pharmaceuticals
   - Technology
   - Retail/E-commerce

4. **Combined Filters**
   - Location + Service Type
   - Location + Industry
   - Location + Service Type + Industry

5. **Special Options**
   - Verified consultants only
   - Free consultation available
   - Pricing level filters

6. **Edge Cases**
   - No filters applied
   - Invalid filter combinations
   - Empty result sets

## Expected Output

### Successful Fix
```
🔍 Testing CRITICAL location filter: birmingham → should show only Birmingham
   Found 5 consultants
   ✅ Filter working correctly - all 5 results from Birmingham
   Companies: Brexit Solutions Ltd, UK Trade Experts, Manchester Customs Ltd

📊 FINAL TEST RESULTS
================================
📈 SUMMARY:
   ✅ Passed: 25
   ❌ Failed: 0
   ⚠️  Warnings: 2
   💥 Errors: 0
   📊 Total Tests: 27

✅ OVERALL STATUS: ALL FILTERS WORKING CORRECTLY
   Critical bug fix successful - Birmingham filter now works!
```

### Still Broken
```
🔍 Testing CRITICAL location filter: birmingham → should show only Birmingham
   Found 12 consultants
   ❌ FILTER FAILED: Found consultants from other cities: Birmingham, London, Edinburgh, Manchester
   Expected: Birmingham only

🚨 CRITICAL FAILURES:
   ❌ Location Filter: birmingham: Filter not working - found consultants from: Birmingham, London, Edinburgh, Manchester

🚨 OVERALL STATUS: CRITICAL BUG NOT FIXED
   Location filters are still broken. Fix required.
```

## Integration with CI/CD

```bash
# Exit code 0 = success, 1 = critical failure
node comprehensive_directory_filter_tests.js
if [ $? -eq 0 ]; then
  echo "All filters working correctly"
else
  echo "Critical filter bug still present"
  exit 1
fi
```

## Manual Testing Steps

1. Go to `/find-consultants`
2. Click "Filters" button
3. Select "Birmingham" under Location
4. Click search
5. **VERIFY**: All results show "Birmingham" in location field
6. **FAIL CONDITION**: Any results showing Edinburgh, London, Cardiff, Belfast, Manchester, etc.

## Debugging

If tests fail, check:
1. Edge function deployment status
2. Database consultant data
3. Network connectivity
4. Console logs in browser dev tools
5. Edge function logs in Supabase dashboard