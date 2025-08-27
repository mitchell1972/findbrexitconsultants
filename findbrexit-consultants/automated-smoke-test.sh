#!/bin/bash

# Automated Smoke Test Script for FindBrexitConsultants.co.uk
# Performs basic connectivity and endpoint testing after deployment

DOMAIN="https://findbrexitconsultants.co.uk"
TEST_RESULTS_FILE="smoke_test_results_$(date +%Y%m%d_%H%M%S).txt"

echo "🔍 FindBrexitConsultants.co.uk - Automated Smoke Test"
echo "Domain: $DOMAIN"
echo "Started: $(date)"
echo "==========================================" | tee $TEST_RESULTS_FILE
echo "" | tee -a $TEST_RESULTS_FILE

# Test 1: Homepage connectivity
echo "🏠 Test 1: Homepage Loading..." | tee -a $TEST_RESULTS_FILE
if curl -s --max-time 10 "$DOMAIN" > /dev/null; then
    echo "✅ Homepage accessible" | tee -a $TEST_RESULTS_FILE
    HOMEPAGE_STATUS="PASS"
else
    echo "❌ Homepage not accessible" | tee -a $TEST_RESULTS_FILE
    HOMEPAGE_STATUS="FAIL"
fi

# Test 2: Critical pages
echo "" | tee -a $TEST_RESULTS_FILE
echo "📄 Test 2: Critical Pages..." | tee -a $TEST_RESULTS_FILE

CRITICAL_PAGES=(
    "/find-consultants"
    "/request-quote"
    "/how-it-works"
    "/about"
    "/contact"
)

PAGES_PASSED=0
for page in "${CRITICAL_PAGES[@]}"; do
    if curl -s --max-time 10 "$DOMAIN$page" > /dev/null; then
        echo "✅ $page accessible" | tee -a $TEST_RESULTS_FILE
        ((PAGES_PASSED++))
    else
        echo "❌ $page not accessible" | tee -a $TEST_RESULTS_FILE
    fi
done

if [ $PAGES_PASSED -eq ${#CRITICAL_PAGES[@]} ]; then
    PAGES_STATUS="PASS"
else
    PAGES_STATUS="FAIL"
fi

# Test 3: Static assets
echo "" | tee -a $TEST_RESULTS_FILE
echo "📦 Test 3: Static Assets..." | tee -a $TEST_RESULTS_FILE

STATIC_FILES=(
    "/robots.txt"
    "/sitemap.xml"
)

STATIC_PASSED=0
for file in "${STATIC_FILES[@]}"; do
    if curl -s --max-time 5 "$DOMAIN$file" | head -1 | grep -E "(User-agent|<?xml)" > /dev/null; then
        echo "✅ $file accessible and valid" | tee -a $TEST_RESULTS_FILE
        ((STATIC_PASSED++))
    else
        echo "❌ $file missing or invalid" | tee -a $TEST_RESULTS_FILE
    fi
done

if [ $STATIC_PASSED -eq ${#STATIC_FILES[@]} ]; then
    STATIC_STATUS="PASS"
else
    STATIC_STATUS="FAIL"
fi

# Test 4: HTTPS and SSL
echo "" | tee -a $TEST_RESULTS_FILE
echo "🔒 Test 4: HTTPS/SSL..." | tee -a $TEST_RESULTS_FILE

if curl -s --max-time 10 -I "$DOMAIN" | grep -E "HTTP/[12]\.[012] 200" > /dev/null; then
    echo "✅ HTTPS connection successful" | tee -a $TEST_RESULTS_FILE
    SSL_STATUS="PASS"
else
    echo "❌ HTTPS connection failed" | tee -a $TEST_RESULTS_FILE
    SSL_STATUS="FAIL"
fi

# Test 5: HTTP to HTTPS redirect
echo "" | tee -a $TEST_RESULTS_FILE
echo "🔄 Test 5: HTTP to HTTPS Redirect..." | tee -a $TEST_RESULTS_FILE

HTTP_DOMAIN="http://findbrexitconsultants.co.uk"
if curl -s --max-time 5 -I "$HTTP_DOMAIN" | grep -E "301|302" > /dev/null; then
    echo "✅ HTTP to HTTPS redirect working" | tee -a $TEST_RESULTS_FILE
    REDIRECT_STATUS="PASS"
else
    echo "❌ HTTP to HTTPS redirect not working" | tee -a $TEST_RESULTS_FILE
    REDIRECT_STATUS="FAIL"
fi

# Test 6: API endpoint check (basic)
echo "" | tee -a $TEST_RESULTS_FILE
echo "🔗 Test 6: API Connectivity..." | tee -a $TEST_RESULTS_FILE

# Check if the page contains Supabase references (indicates successful loading)
if curl -s --max-time 10 "$DOMAIN" | grep -o "supabase" > /dev/null; then
    echo "✅ Site appears to load with API integration" | tee -a $TEST_RESULTS_FILE
    API_STATUS="PASS"
else
    echo "❌ API integration may have issues" | tee -a $TEST_RESULTS_FILE
    API_STATUS="FAIL"
fi

# Test 7: Response time check
echo "" | tee -a $TEST_RESULTS_FILE
echo "⚡ Test 7: Performance Check..." | tee -a $TEST_RESULTS_FILE

RESPONSE_TIME=$(curl -o /dev/null -s -w "%{time_total}" "$DOMAIN")
if (( $(echo "$RESPONSE_TIME < 3.0" | bc -l) )); then
    echo "✅ Response time: ${RESPONSE_TIME}s (< 3s target)" | tee -a $TEST_RESULTS_FILE
    PERFORMANCE_STATUS="PASS"
else
    echo "⚠️  Response time: ${RESPONSE_TIME}s (> 3s, consider optimization)" | tee -a $TEST_RESULTS_FILE
    PERFORMANCE_STATUS="WARN"
fi

# Summary
echo "" | tee -a $TEST_RESULTS_FILE
echo "==========================================" | tee -a $TEST_RESULTS_FILE
echo "📊 SMOKE TEST SUMMARY" | tee -a $TEST_RESULTS_FILE
echo "==========================================" | tee -a $TEST_RESULTS_FILE
echo "Homepage Loading: $HOMEPAGE_STATUS" | tee -a $TEST_RESULTS_FILE
echo "Critical Pages: $PAGES_STATUS ($PAGES_PASSED/${#CRITICAL_PAGES[@]} passed)" | tee -a $TEST_RESULTS_FILE
echo "Static Assets: $STATIC_STATUS ($STATIC_PASSED/${#STATIC_FILES[@]} passed)" | tee -a $TEST_RESULTS_FILE
echo "HTTPS/SSL: $SSL_STATUS" | tee -a $TEST_RESULTS_FILE
echo "HTTP Redirect: $REDIRECT_STATUS" | tee -a $TEST_RESULTS_FILE
echo "API Integration: $API_STATUS" | tee -a $TEST_RESULTS_FILE
echo "Performance: $PERFORMANCE_STATUS (${RESPONSE_TIME}s)" | tee -a $TEST_RESULTS_FILE
echo "" | tee -a $TEST_RESULTS_FILE

# Overall status
FAIL_COUNT=0
if [ "$HOMEPAGE_STATUS" = "FAIL" ]; then ((FAIL_COUNT++)); fi
if [ "$PAGES_STATUS" = "FAIL" ]; then ((FAIL_COUNT++)); fi
if [ "$STATIC_STATUS" = "FAIL" ]; then ((FAIL_COUNT++)); fi
if [ "$SSL_STATUS" = "FAIL" ]; then ((FAIL_COUNT++)); fi
if [ "$REDIRECT_STATUS" = "FAIL" ]; then ((FAIL_COUNT++)); fi
if [ "$API_STATUS" = "FAIL" ]; then ((FAIL_COUNT++)); fi

if [ $FAIL_COUNT -eq 0 ]; then
    echo "🎉 OVERALL STATUS: PASS - Deployment successful!" | tee -a $TEST_RESULTS_FILE
    OVERALL_STATUS="PASS"
elif [ $FAIL_COUNT -le 2 ]; then
    echo "⚠️  OVERALL STATUS: PARTIAL - Minor issues detected" | tee -a $TEST_RESULTS_FILE
    OVERALL_STATUS="PARTIAL"
else
    echo "❌ OVERALL STATUS: FAIL - Major issues require attention" | tee -a $TEST_RESULTS_FILE
    OVERALL_STATUS="FAIL"
fi

echo "" | tee -a $TEST_RESULTS_FILE
echo "Completed: $(date)" | tee -a $TEST_RESULTS_FILE
echo "Results saved to: $TEST_RESULTS_FILE" | tee -a $TEST_RESULTS_FILE
echo "" | tee -a $TEST_RESULTS_FILE

if [ "$OVERALL_STATUS" = "FAIL" ]; then
    echo "🛠️  Next Steps:" | tee -a $TEST_RESULTS_FILE
    echo "1. Check Hostinger file uploads" | tee -a $TEST_RESULTS_FILE
    echo "2. Verify SSL certificate configuration" | tee -a $TEST_RESULTS_FILE
    echo "3. Review .htaccess file for routing issues" | tee -a $TEST_RESULTS_FILE
    echo "4. Configure Supabase CORS (see SUPABASE_CORS_SETUP.md)" | tee -a $TEST_RESULTS_FILE
    echo "5. Run manual smoke tests (see POST_DEPLOYMENT_SMOKE_TESTS.md)" | tee -a $TEST_RESULTS_FILE
elif [ "$OVERALL_STATUS" = "PARTIAL" ]; then
    echo "📋 Recommended Actions:" | tee -a $TEST_RESULTS_FILE
    echo "1. Review failed tests above" | tee -a $TEST_RESULTS_FILE
    echo "2. Run manual verification of affected areas" | tee -a $TEST_RESULTS_FILE
    echo "3. Monitor site performance" | tee -a $TEST_RESULTS_FILE
else
    echo "✅ No action required - deployment successful!" | tee -a $TEST_RESULTS_FILE
    echo "💡 Consider running manual smoke tests for full validation" | tee -a $TEST_RESULTS_FILE
fi

echo ""
echo "📁 Full results saved to: $TEST_RESULTS_FILE"

# Exit with appropriate code
if [ "$OVERALL_STATUS" = "PASS" ]; then
    exit 0
elif [ "$OVERALL_STATUS" = "PARTIAL" ]; then
    exit 1
else
    exit 2
fi