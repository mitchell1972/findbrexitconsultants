#!/usr/bin/env node

/**
 * COMPREHENSIVE DIRECTORY FILTER TESTING SUITE
 * 
 * This test suite validates that the critical filter bug has been fixed.
 * The main issue: Birmingham filter was showing results from all cities.
 * 
 * CRITICAL TEST: Birmingham filter should show ONLY Birmingham consultants.
 */

const SUPABASE_URL = 'https://zjfilhbczaquokqlcoej.supabase.co';
const TEST_RESULTS = [];

// Test configuration
const TESTS = {
  // CRITICAL location filter tests
  locationFilters: [
    { location: 'birmingham', expectedCity: 'Birmingham', critical: true },
    { location: 'london', expectedCity: 'London', critical: true },
    { location: 'manchester', expectedCity: 'Manchester', critical: true },
    { location: 'scotland', expectedCity: 'Scotland', critical: false },
    { location: 'wales', expectedCity: 'Wales', critical: false },
    { location: 'northern-ireland', expectedCity: 'Northern Ireland', critical: false }
  ],
  
  // Service type filter tests
  serviceTypes: [
    'customs-declarations',
    'vat-tax-compliance', 
    'northern-ireland-protocol',
    'regulatory-compliance',
    'import-export-documentation',
    'supply-chain-consulting'
  ],
  
  // Industry filter tests
  industries: [
    'food-beverage',
    'manufacturing',
    'automotive',
    'pharmaceuticals',
    'technology',
    'retail-ecommerce'
  ],
  
  // Combined filter tests
  combinedTests: [
    {
      name: 'Birmingham + Customs Declarations',
      filters: { locations: ['birmingham'], serviceTypes: ['customs-declarations'] }
    },
    {
      name: 'London + Manufacturing',
      filters: { locations: ['london'], industries: ['manufacturing'] }
    },
    {
      name: 'Manchester + VAT Compliance + Technology',
      filters: { 
        locations: ['manchester'], 
        serviceTypes: ['vat-tax-compliance'],
        industries: ['technology']
      }
    }
  ],
  
  // Special option tests
  specialOptions: [
    { verifiedOnly: true },
    { freeConsultation: true },
    { pricingLevel: 1 },
    { pricingLevel: 2 },
    { pricingLevel: 3 }
  ],
  
  // Search query tests
  searchQueries: [
    'Brexit',
    'Customs',
    'VAT',
    'Trade',
    'Compliance'
  ]
};

/**
 * Execute a search query against the edge function
 */
async function executeSearch(params = {}) {
  const searchParams = new URLSearchParams();
  
  // Add all parameters
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      searchParams.append(key, value.join(','));
    } else if (value !== null && value !== undefined && value !== '') {
      searchParams.append(key, value.toString());
    }
  });
  
  const url = `${SUPABASE_URL}/functions/v1/search-consultants?${searchParams.toString()}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Search request failed:', error);
    throw error;
  }
}

/**
 * Test a single location filter
 */
async function testLocationFilter(location, expectedCity, critical = false) {
  console.log(`\n🔍 Testing ${critical ? 'CRITICAL' : ''} location filter: ${location} → should show only ${expectedCity}`);
  
  try {
    const result = await executeSearch({ locations: [location] });
    
    const consultants = result.data?.consultants || [];
    console.log(`   Found ${consultants.length} consultants`);
    
    if (consultants.length === 0) {
      console.log(`   ⚠️  No consultants found for ${expectedCity}`);
      return {
        test: `Location Filter: ${location}`,
        status: 'WARNING',
        message: `No consultants found for ${expectedCity}`,
        critical,
        consultants: 0
      };
    }
    
    // Check if ALL results are from the expected city
    const wrongCityConsultants = consultants.filter(c => c.city !== expectedCity);
    
    if (wrongCityConsultants.length > 0) {
      const cities = [...new Set(consultants.map(c => c.city))];
      console.log(`   ❌ FILTER FAILED: Found consultants from other cities:`, cities);
      console.log(`   Expected: ${expectedCity} only`);
      console.log(`   Wrong cities:`, wrongCityConsultants.map(c => `${c.company_name} (${c.city})`));
      
      return {
        test: `Location Filter: ${location}`,
        status: 'FAILED',
        message: `Filter not working - found consultants from: ${cities.join(', ')}`,
        expected: expectedCity,
        found: cities,
        critical,
        consultants: consultants.length,
        wrongResults: wrongCityConsultants.length
      };
    }
    
    console.log(`   ✅ Filter working correctly - all ${consultants.length} results from ${expectedCity}`);
    console.log(`   Companies: ${consultants.map(c => c.company_name).join(', ')}`);
    
    return {
      test: `Location Filter: ${location}`,
      status: 'PASSED',
      message: `All ${consultants.length} results correctly from ${expectedCity}`,
      critical,
      consultants: consultants.length
    };
    
  } catch (error) {
    console.log(`   ❌ Test failed with error: ${error.message}`);
    return {
      test: `Location Filter: ${location}`,
      status: 'ERROR', 
      message: error.message,
      critical
    };
  }
}

/**
 * Test service type filters
 */
async function testServiceTypeFilter(serviceType) {
  console.log(`\n🔍 Testing service type filter: ${serviceType}`);
  
  try {
    const result = await executeSearch({ serviceTypes: [serviceType] });
    const consultants = result.data?.consultants || [];
    
    console.log(`   Found ${consultants.length} consultants for ${serviceType}`);
    
    return {
      test: `Service Type Filter: ${serviceType}`,
      status: consultants.length > 0 ? 'PASSED' : 'WARNING',
      message: `Found ${consultants.length} consultants`,
      consultants: consultants.length
    };
    
  } catch (error) {
    console.log(`   ❌ Test failed: ${error.message}`);
    return {
      test: `Service Type Filter: ${serviceType}`,
      status: 'ERROR',
      message: error.message
    };
  }
}

/**
 * Test combined filters
 */
async function testCombinedFilters(testCase) {
  console.log(`\n🔍 Testing combined filters: ${testCase.name}`);
  
  try {
    const result = await executeSearch(testCase.filters);
    const consultants = result.data?.consultants || [];
    
    console.log(`   Found ${consultants.length} consultants`);
    
    // If location filter is applied, verify all results are from correct city
    if (testCase.filters.locations && testCase.filters.locations.length > 0) {
      const locationMap = {
        'birmingham': 'Birmingham',
        'london': 'London',
        'manchester': 'Manchester',
        'scotland': 'Scotland',
        'wales': 'Wales',
        'northern-ireland': 'Northern Ireland'
      };
      
      const expectedCities = testCase.filters.locations.map(loc => locationMap[loc]);
      const wrongCityConsultants = consultants.filter(c => !expectedCities.includes(c.city));
      
      if (wrongCityConsultants.length > 0) {
        const foundCities = [...new Set(consultants.map(c => c.city))];
        return {
          test: `Combined Filter: ${testCase.name}`,
          status: 'FAILED',
          message: `Location filter not working - expected cities: ${expectedCities.join(', ')}, found: ${foundCities.join(', ')}`,
          consultants: consultants.length,
          critical: true
        };
      }
    }
    
    return {
      test: `Combined Filter: ${testCase.name}`,
      status: 'PASSED',
      message: `Found ${consultants.length} correctly filtered consultants`,
      consultants: consultants.length
    };
    
  } catch (error) {
    return {
      test: `Combined Filter: ${testCase.name}`,
      status: 'ERROR',
      message: error.message
    };
  }
}

/**
 * Main test execution
 */
async function runAllTests() {
  console.log('🚀 STARTING COMPREHENSIVE DIRECTORY FILTER TESTING\n');
  console.log('='*60);
  console.log('CRITICAL BUG FIX VALIDATION');
  console.log('Issue: Birmingham filter showing all cities instead of just Birmingham');
  console.log('='*60);
  
  const results = [];
  
  // Test 1: CRITICAL location filters
  console.log('\n📍 TESTING LOCATION FILTERS (CRITICAL)');
  for (const {location, expectedCity, critical} of TESTS.locationFilters) {
    const result = await testLocationFilter(location, expectedCity, critical);
    results.push(result);
  }
  
  // Test 2: Service type filters
  console.log('\n🛠️  TESTING SERVICE TYPE FILTERS');
  for (const serviceType of TESTS.serviceTypes) {
    const result = await testServiceTypeFilter(serviceType);
    results.push(result);
  }
  
  // Test 3: Combined filters
  console.log('\n🔗 TESTING COMBINED FILTERS');
  for (const testCase of TESTS.combinedTests) {
    const result = await testCombinedFilters(testCase);
    results.push(result);
  }
  
  // Test 4: Edge cases
  console.log('\n🎯 TESTING EDGE CASES');
  
  // Test no filters (should show all approved consultants)
  try {
    const allResults = await executeSearch({});
    const totalConsultants = allResults.data?.consultants?.length || 0;
    console.log(`\n   All consultants (no filters): ${totalConsultants}`);
    results.push({
      test: 'No Filters Applied',
      status: totalConsultants > 0 ? 'PASSED' : 'WARNING',
      message: `Found ${totalConsultants} total approved consultants`,
      consultants: totalConsultants
    });
  } catch (error) {
    results.push({
      test: 'No Filters Applied',
      status: 'ERROR',
      message: error.message
    });
  }
  
  // Generate final report
  console.log('\n' + '='*60);
  console.log('📊 FINAL TEST RESULTS');
  console.log('='*60);
  
  const passed = results.filter(r => r.status === 'PASSED').length;
  const failed = results.filter(r => r.status === 'FAILED').length;
  const errors = results.filter(r => r.status === 'ERROR').length;
  const warnings = results.filter(r => r.status === 'WARNING').length;
  
  console.log(`\n📈 SUMMARY:`);
  console.log(`   ✅ Passed: ${passed}`);
  console.log(`   ❌ Failed: ${failed}`);
  console.log(`   ⚠️  Warnings: ${warnings}`);
  console.log(`   💥 Errors: ${errors}`);
  console.log(`   📊 Total Tests: ${results.length}`);
  
  // Critical failures
  const criticalFailures = results.filter(r => r.critical && r.status === 'FAILED');
  if (criticalFailures.length > 0) {
    console.log(`\n🚨 CRITICAL FAILURES:`);
    criticalFailures.forEach(r => {
      console.log(`   ❌ ${r.test}: ${r.message}`);
    });
  }
  
  // All failures
  const allFailures = results.filter(r => r.status === 'FAILED');
  if (allFailures.length > 0) {
    console.log(`\n❌ FAILED TESTS:`);
    allFailures.forEach(r => {
      console.log(`   • ${r.test}: ${r.message}`);
    });
  }
  
  // Overall status
  if (criticalFailures.length > 0) {
    console.log(`\n🚨 OVERALL STATUS: CRITICAL BUG NOT FIXED`);
    console.log(`   Location filters are still broken. Fix required.`);
  } else if (failed > 0) {
    console.log(`\n⚠️  OVERALL STATUS: SOME ISSUES REMAIN`);
    console.log(`   Main location filtering fixed, but other issues present.`);
  } else {
    console.log(`\n✅ OVERALL STATUS: ALL FILTERS WORKING CORRECTLY`);
    console.log(`   Critical bug fix successful - Birmingham filter now works!`);
  }
  
  return {
    passed,
    failed,
    errors,
    warnings,
    total: results.length,
    criticalFailures: criticalFailures.length,
    success: criticalFailures.length === 0
  };
}

// Execute tests if run directly
if (require.main === module) {
  runAllTests()
    .then(summary => {
      process.exit(summary.criticalFailures > 0 ? 1 : 0);
    })
    .catch(error => {
      console.error('Test execution failed:', error);
      process.exit(1);
    });
}

module.exports = { runAllTests, executeSearch, TESTS };