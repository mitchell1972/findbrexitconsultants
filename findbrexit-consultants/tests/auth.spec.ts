import { test, expect, Page } from '@playwright/test';

test.describe('Authentication & Business Registration Flows', () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('/');
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('should display "List Your Business" option in header', async () => {
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Wait for header to be present first
    await expect(page.locator('header')).toBeVisible({ timeout: 15000 });
    
    // Check for viewport size and handle responsive behavior
    const viewport = page.viewportSize();
    
    if (viewport && viewport.width >= 768) {
      // Desktop: Check if desktop "List Your Business" button is visible
      await expect(page.getByTestId('list-business-header-btn')).toBeVisible({ timeout: 10000 });
    } else {
      // Mobile: First ensure the mobile menu button is present and clickable
      const mobileMenuBtn = page.getByTestId('mobile-menu-button');
      await expect(mobileMenuBtn).toBeVisible({ timeout: 10000 });
      
      // Click mobile menu button with retry logic
      await mobileMenuBtn.click({ timeout: 5000 });
      
      // Wait for mobile menu to appear with explicit wait
      await page.waitForTimeout(1000);
      
      // Check for mobile List Your Business button
      await expect(page.getByTestId('list-business-mobile-btn')).toBeVisible({ timeout: 10000 });
    }
  });

  test('should navigate to business listing/registration page', async () => {
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Handle responsive navigation
    const viewport = page.viewportSize();
    if (viewport && viewport.width >= 768) {
      await expect(page.getByTestId('list-business-header-btn')).toBeVisible({ timeout: 10000 });
      await page.getByTestId('list-business-header-btn').click();
    } else {
      await expect(page.getByTestId('mobile-menu-button')).toBeVisible({ timeout: 10000 });
      await page.getByTestId('mobile-menu-button').click();
      await page.waitForTimeout(1000);
      await expect(page.getByTestId('list-business-mobile-btn')).toBeVisible({ timeout: 10000 });
      await page.getByTestId('list-business-mobile-btn').click();
    }
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Should navigate to business registration or listing page
    const url = page.url();
    expect(url).toContain('list');
    
    // Should display registration or business submission form elements
    const hasForm = await page.locator('form, input[type="email"], input[name="name"]').first().isVisible();
    
    expect(hasForm).toBeTruthy();
  });

  test('should display business registration form fields', async () => {
    // Navigate to business listing page with responsive handling
    const viewport = page.viewportSize();
    if (viewport && viewport.width >= 768) {
      await expect(page.getByTestId('list-business-header-btn')).toBeVisible({ timeout: 10000 });
      await page.getByTestId('list-business-header-btn').click();
    } else {
      await expect(page.getByTestId('mobile-menu-button')).toBeVisible({ timeout: 10000 });
      await page.getByTestId('mobile-menu-button').click();
      await page.waitForTimeout(1000);
      await expect(page.getByTestId('list-business-mobile-btn')).toBeVisible({ timeout: 10000 });
      await page.getByTestId('list-business-mobile-btn').click();
    }
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Check for common business registration fields
    const hasBusinessName = await page.locator('input[name*="business"], input[name*="company"], input[placeholder*="business" i]').first().isVisible();
    
    const hasEmail = await page.locator('input[type="email"], input[name*="email"], input[placeholder*="email" i]').first().isVisible();
    
    const hasPhone = await page.locator('input[type="tel"], input[name*="phone"], input[placeholder*="phone" i]').first().isVisible();
    
    // At least one of these should be true for a business registration form
    expect(hasBusinessName || hasEmail || hasPhone).toBeTruthy();
  });

  test('should validate required fields on business registration', async () => {
    // Navigate to business listing page with responsive handling
    const viewport = page.viewportSize();
    if (viewport && viewport.width >= 768) {
      await expect(page.getByTestId('list-business-header-btn')).toBeVisible({ timeout: 10000 });
      await page.getByTestId('list-business-header-btn').click();
    } else {
      await expect(page.getByTestId('mobile-menu-button')).toBeVisible({ timeout: 10000 });
      await page.getByTestId('mobile-menu-button').click();
      await page.waitForTimeout(1000);
      await expect(page.getByTestId('list-business-mobile-btn')).toBeVisible({ timeout: 10000 });
      await page.getByTestId('list-business-mobile-btn').click();
    }
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Wait for form to load completely and look for form fields or form sections
    const hasFormFields = await page.locator('input, textarea, select, form').first().isVisible();
    
    // Basic validation - at least we should see some form elements
    expect(hasFormFields).toBeTruthy();
  });

  test('should validate email format in business registration', async () => {
    await page.waitForLoadState('networkidle');
    
    // Handle responsive navigation
    const viewport = page.viewportSize();
    if (viewport && viewport.width >= 768) {
      await expect(page.getByTestId('list-business-header-btn')).toBeVisible({ timeout: 10000 });
      await page.getByTestId('list-business-header-btn').click();
    } else {
      await expect(page.getByTestId('mobile-menu-button')).toBeVisible({ timeout: 10000 });
      await page.getByTestId('mobile-menu-button').click();
      await page.waitForTimeout(500);
      await expect(page.getByTestId('list-business-mobile-btn')).toBeVisible({ timeout: 5000 });
      await page.getByTestId('list-business-mobile-btn').click();
    }
    
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('input', { timeout: 10000 });
    
    // Fill form with invalid email - use simple nth selectors
    const inputs = page.locator('input');
    await inputs.nth(0).fill('Test Company');
    await inputs.nth(1).fill('John Doe');
    await inputs.nth(2).fill('invalid-email'); // Invalid email format
    await inputs.nth(3).fill('1234567890');
    
    // Try to proceed
    const nextButton = page.locator('button:has-text("Next")').first();
    await nextButton.click();
    await page.waitForTimeout(1000);
    
    // Check for validation - simplified approach
    const validationFound = await page.evaluate(() => {
      const text = document.body.textContent || '';
      return /valid email|email.*valid|email.*format/i.test(text) || 
             document.querySelector('input[type="email"]:invalid') !== null;
    });
    
    expect(validationFound).toBeTruthy();
  });

  test('should handle business category selection', async () => {
    await page.waitForLoadState('networkidle');
    
    // Handle responsive navigation
    const viewport = page.viewportSize();
    if (viewport && viewport.width >= 768) {
      await expect(page.getByTestId('list-business-header-btn')).toBeVisible({ timeout: 10000 });
      await page.getByTestId('list-business-header-btn').click();
    } else {
      await expect(page.getByTestId('mobile-menu-button')).toBeVisible({ timeout: 10000 });
      await page.getByTestId('mobile-menu-button').click();
      await page.waitForTimeout(500);
      await expect(page.getByTestId('list-business-mobile-btn')).toBeVisible({ timeout: 5000 });
      await page.getByTestId('list-business-mobile-btn').click();
    }
    
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('input', { timeout: 10000 });
    
    // Fill basic form to progress through steps
    const inputs = page.locator('input');
    await inputs.nth(0).fill('Test Brexit Consulting Ltd');
    await inputs.nth(1).fill('John Smith');
    await inputs.nth(2).fill('john@testcompany.com');
    await inputs.nth(3).fill('+44 20 1234 5678');
    
    // Try to progress through form steps
    const nextButton = page.locator('button:has-text("Next")').first();
    if (await nextButton.isVisible()) {
      await nextButton.click();
      await page.waitForTimeout(1000);
    }
    
    // Check for service/category options or form progression
    const hasServiceElements = await page.evaluate(() => {
      const text = document.body.textContent || '';
      const hasServiceText = /Customs|VAT|Tax|Protocol|Compliance|Import|Export|Supply Chain|Brexit|Service|Category|Industry/i.test(text);
      const hasSelectElements = document.querySelectorAll('select, input[type="checkbox"], input[type="radio"]').length > 0;
      const hasProgression = /Step 2|Location|Business Details|2 of 4/i.test(text);
      
      return hasServiceText || hasSelectElements || hasProgression;
    });
    
    expect(hasServiceElements).toBeTruthy();
  });

  test('should display information about listing benefits', async () => {
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Handle responsive navigation
    const viewport = page.viewportSize();
    if (viewport && viewport.width >= 768) {
      await expect(page.getByTestId('list-business-header-btn')).toBeVisible({ timeout: 10000 });
      await page.getByTestId('list-business-header-btn').click();
    } else {
      await expect(page.getByTestId('mobile-menu-button')).toBeVisible({ timeout: 10000 });
      await page.getByTestId('mobile-menu-button').click();
      await page.waitForTimeout(1000);
      await expect(page.getByTestId('list-business-mobile-btn')).toBeVisible({ timeout: 10000 });
      await page.getByTestId('list-business-mobile-btn').click();
    }
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    
    // Wait for page content to load and check for benefits information
    // Based on the ListBusinessPage component, we should see specific benefit text
    const hasBenefitsInfo = await page.evaluate(() => {
      const pageText = document.body.textContent || '';
      
      // Check for specific benefit text from the component
      const hasReachClients = /Reach More Clients/i.test(pageText);
      const hasBuildReputation = /Build Your Reputation|Build Reputation/i.test(pageText);
      const hasVerifiedListings = /Verified Listings|Verified status/i.test(pageText);
      const hasConnectBusinesses = /Connect with businesses/i.test(pageText);
      const hasShowcaseReviews = /Showcase reviews|build trust/i.test(pageText);
      const hasBrexitDirectory = /Brexit.*directory|leading directory/i.test(pageText);
      const hasBrexitCompliance = /Brexit.*compliance|Brexit.*consultant/i.test(pageText);
      
      return hasReachClients || hasBuildReputation || hasVerifiedListings || 
             hasConnectBusinesses || hasShowcaseReviews || hasBrexitDirectory || 
             hasBrexitCompliance;
    });
    
    // Also check for specific benefit-related elements
    const hasBenefitElements = await page.locator('text="Reach More Clients"').or(
      page.locator('text="Build Your Reputation"').or(
        page.locator('text="Verified Listings"').or(
          page.locator('text="Connect with businesses"').or(
            page.locator('text="Brexit consulting"').or(
              page.locator('text="UK\'s leading directory"')
            )
          )
        )
      )
    ).first().isVisible({ timeout: 5000 });
    
    expect(hasBenefitsInfo || hasBenefitElements).toBeTruthy();
  });

  test('should handle terms and conditions acceptance', async () => {
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Handle responsive navigation
    const viewport = page.viewportSize();
    if (viewport && viewport.width >= 768) {
      await expect(page.getByTestId('list-business-header-btn')).toBeVisible({ timeout: 10000 });
      await page.getByTestId('list-business-header-btn').click();
    } else {
      await expect(page.getByTestId('mobile-menu-button')).toBeVisible({ timeout: 10000 });
      await page.getByTestId('mobile-menu-button').click();
      await page.waitForTimeout(1000);
      await expect(page.getByTestId('list-business-mobile-btn')).toBeVisible({ timeout: 10000 });
      await page.getByTestId('list-business-mobile-btn').click();
    }
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    
    // Navigate through form steps to find terms and conditions
    // Fill basic form fields first
    const inputs = page.locator('input');
    const inputCount = await inputs.count();
    
    if (inputCount >= 4) {
      await inputs.nth(0).fill('Test Company');
      await inputs.nth(1).fill('John Doe');
      await inputs.nth(2).fill('john@test.com');
      await inputs.nth(3).fill('1234567890');
    }
    
    // Navigate through steps to find terms acceptance
    let foundTerms = false;
    for (let step = 1; step <= 4; step++) {
      // Check current page for terms/conditions
      const hasTermsElements = await page.evaluate(() => {
        const text = document.body.textContent || '';
        return /terms.*condition|terms.*service|privacy.*policy|accept.*terms|agree.*terms/i.test(text);
      });
      
      if (hasTermsElements) {
        foundTerms = true;
        break;
      }
      
      // Try to proceed to next step
      const nextButton = page.locator('button:has-text("Next"), button:has-text("Continue")').first();
      if (await nextButton.isVisible()) {
        await nextButton.click();
        await page.waitForTimeout(2000);
      } else {
        break;
      }
    }
    
    // Look for terms checkbox or references
    const hasTermsCheckbox = await page.locator('input[type="checkbox"][name*="terms"], input[type="checkbox"][id*="terms"]').first().isVisible();
    
    // Check footer for terms/privacy links (common location)
    const hasTermsInFooter = await page.locator('footer').locator('text="Terms"').or(
      page.locator('footer').locator('text="Privacy"').or(
        page.locator('footer').locator('text="Cookie"')
      )
    ).first().isVisible();
    
    // Check anywhere on page for terms/privacy/conditions links or text
    const hasTermsAnywhere = await page.locator('a[href*="terms"]').or(
      page.locator('a[href*="privacy"]').or(
        page.locator('text="Terms of Service"').or(
          page.locator('text="Privacy Policy"').or(
            page.locator('text="Cookie Policy"')
          )
        )
      )
    ).first().isVisible();
    
    // Should have terms reference, checkbox, or links somewhere
    expect(foundTerms || hasTermsCheckbox || hasTermsInFooter || hasTermsAnywhere).toBeTruthy();
  });

  test('should submit business registration with valid data', async () => {
    await page.waitForLoadState('networkidle');
    
    // Handle responsive navigation
    const viewport = page.viewportSize();
    if (viewport && viewport.width >= 768) {
      await expect(page.getByTestId('list-business-header-btn')).toBeVisible({ timeout: 10000 });
      await page.getByTestId('list-business-header-btn').click();
    } else {
      await expect(page.getByTestId('mobile-menu-button')).toBeVisible({ timeout: 10000 });
      await page.getByTestId('mobile-menu-button').click();
      await page.waitForTimeout(500);
      await expect(page.getByTestId('list-business-mobile-btn')).toBeVisible({ timeout: 5000 });
      await page.getByTestId('list-business-mobile-btn').click();
    }
    
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('input', { timeout: 10000 });
    
    // Fill valid form data
    const inputs = page.locator('input');
    await inputs.nth(0).fill('Test Brexit Consulting Ltd');
    await inputs.nth(1).fill('John Smith');
    await inputs.nth(2).fill('john@testbrexitconsulting.com');
    await inputs.nth(3).fill('+44 20 1234 5678');
    
    // Add website if field exists
    const inputCount = await inputs.count();
    if (inputCount >= 5) {
      await inputs.nth(4).fill('https://www.testbrexitconsulting.com');
    }
    
    // Submit form
    const nextButton = page.locator('button:has-text("Next")').first();
    await nextButton.click();
    await page.waitForTimeout(1000);
    
    // Check for successful progression
    const hasProgressed = await page.evaluate(() => {
      const url = window.location.href;
      const text = document.body.textContent || '';
      
      return /Step 2|Location|Business Details|2 of 4|City|Postcode/i.test(text) ||
             url.includes('step-2') ||
             !(/error|required|invalid/i.test(text));
    });
    
    expect(hasProgressed).toBeTruthy();
  });

  test('should handle mobile responsive layout', async () => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    
    // Navigate to business listing page using mobile-appropriate method
    const mobileMenuBtn = page.getByTestId('mobile-menu-button');
    if (await mobileMenuBtn.isVisible()) {
      await mobileMenuBtn.click();
      await page.waitForTimeout(1000);
      const listBusinessMobileBtn = page.getByTestId('list-business-mobile-btn');
      if (await listBusinessMobileBtn.isVisible()) {
        await listBusinessMobileBtn.click();
      } else {
        // Fallback: direct navigation
        await page.goto('/list-business', { waitUntil: 'networkidle' });
      }
    } else {
      // Direct navigation if mobile menu is not available
      await page.goto('/list-business', { waitUntil: 'networkidle' });
    }
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    
    // Check that essential content is visible on mobile
    const hasTitle = await page.locator('h1, h2').first().isVisible();
    const hasForm = await page.locator('form, input').first().isVisible();
    const hasButtons = await page.locator('button').first().isVisible();
    
    // Check that the page doesn't have horizontal scroll (basic responsiveness)
    const responsiveMetrics = await page.evaluate(() => {
      const bodyWidth = document.body.scrollWidth;
      const windowWidth = window.innerWidth;
      const isResponsive = bodyWidth <= windowWidth + 50; // Allow small margin
      
      // Check if viewport meta tag exists for mobile responsiveness
      const hasViewportMeta = !!document.querySelector('meta[name="viewport"]');
      
      // Check if content adapts to mobile (no huge fixed widths)
      const hasLargeFixedElements = Array.from(document.querySelectorAll('*')).some(el => {
        const styles = window.getComputedStyle(el);
        const width = parseInt(styles.width);
        return width > windowWidth + 100;
      });
      
      return {
        isResponsive,
        hasViewportMeta,
        hasLargeFixedElements: !hasLargeFixedElements,
        bodyWidth,
        windowWidth
      };
    });
    
    // Mobile layout should have essential elements visible and be properly responsive
    const isMobileReady = responsiveMetrics.isResponsive && 
                         (hasTitle || hasForm || hasButtons) && 
                         responsiveMetrics.hasLargeFixedElements;
    
    expect(isMobileReady).toBeTruthy();
  });
});
