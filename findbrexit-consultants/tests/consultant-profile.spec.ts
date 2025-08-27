import { test, expect, Page } from '@playwright/test';

test.describe('Consultant Profile Pages', () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('/');
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('should navigate to consultant profiles from search results', async () => {
    // Navigate to Find Consultants page
    await page.click('text="Find Consultants"');
    await page.waitForLoadState('networkidle');
    
    // Wait for consultant cards to load
    await expect(page.locator('text="6 consultants found"').or(
      page.locator('text="consultants found"')
    ).first()).toBeVisible({ timeout: 15000 });
    
    // Click on the first "View Profile" link
    const viewProfileLink = page.locator('text="View Profile"').first();
    await expect(viewProfileLink).toBeVisible({ timeout: 10000 });
    await viewProfileLink.click();
    
    await page.waitForLoadState('networkidle');
    
    // Should navigate to consultant profile page with UUID structure
    expect(page.url()).toContain('/consultant/');
    
    // Should display consultant profile content
    await expect(page.locator('h1').or(page.locator('h2')).first()).toBeVisible({ timeout: 10000 });
  });

  test('should display consultant profile with tabbed navigation', async () => {
    // Navigate to consultant profile
    await page.click('text="Find Consultants"');
    await page.waitForLoadState('networkidle');
    
    await page.click('text="View Profile"');
    await page.waitForLoadState('networkidle');
    
    // Should display tabbed navigation structure
    await expect(page.locator('text="Overview"')).toBeVisible({ timeout: 10000 });
    
    // Check for other expected tabs
    const hasServicesTab = await page.locator('text="Services"').or(
      page.locator('text="Industries"')
    ).first().isVisible();
    
    const hasReviewsTab = await page.locator('text="Reviews"').first().isVisible();
    
    const hasContactTab = await page.locator('text="Contact"').or(
      page.locator('text="Information"')
    ).first().isVisible();
    
    // Should have tabbed navigation system
    expect(hasServicesTab || hasReviewsTab || hasContactTab).toBeTruthy();
  });

  test('should display consultant key metrics and information', async () => {
    // Navigate to consultant profile
    await page.click('text="Find Consultants"');
    await page.waitForLoadState('networkidle');
    
    await page.click('text="View Profile"');
    await page.waitForLoadState('networkidle');
    
    // Wait for consultant profile content to fully load
    await expect(page.locator('h1, h2').first()).toBeVisible({ timeout: 15000 });
    
    // Wait specifically for key metrics section to load
    await page.waitForTimeout(2000);
    
    // Check for key metrics that should be displayed
    const hasExperience = await page.locator('text="15 Years"').or(
      page.locator('text="years"').or(
        page.locator('text="experience"').or(
          page.locator('text="Years"')
        )
      )
    ).first().isVisible();
    
    const hasTeamSize = await page.locator('text="25+"').or(
      page.locator('text="Team"').or(
        page.locator('text="Size"')
      )
    ).first().isVisible();
    
    const hasResponseTime = await page.locator('text="2 hours"').or(
      page.locator('text="Response"').or(
        page.locator('text="Time"').or(
          page.locator('text="hours"')
        )
      )
    ).first().isVisible();
    
    const hasPricing = await page.locator('text="£££"').or(
      page.locator('text="Premium"').or(
        page.locator('text="£"')
      )
    ).first().isVisible();
    
    // Should display consultant metrics
    expect(hasExperience || hasTeamSize || hasResponseTime || hasPricing).toBeTruthy();
  });

  test('should display "Request Quote" functionality', async () => {
    // Navigate to consultant profile
    await page.click('text="Find Consultants"');
    await page.waitForLoadState('networkidle');
    
    await page.click('text="View Profile"');
    await page.waitForLoadState('networkidle');
    
    // Should have "Request Quote" button or link
    await expect(page.locator('text="Request Quote"').first()).toBeVisible({ timeout: 10000 });
  });

  test('should display contact information and methods', async () => {
    // Navigate to consultant profile
    await page.click('text="Find Consultants"');
    await page.waitForLoadState('networkidle');
    
    await page.click('text="View Profile"');
    await page.waitForLoadState('networkidle');
    
    // Wait for consultant profile content to fully load
    await expect(page.locator('h1, h2').first()).toBeVisible({ timeout: 15000 });
    await page.waitForTimeout(2000);
    
    // Check for "Contact" button or navigate to contact tab
    const contactButton = page.locator('text="Contact"').first();
    
    if (await contactButton.isVisible()) {
      await contactButton.click();
      await page.waitForTimeout(1000);
    }
    
    // Look for contact methods
    const hasPhone = await page.locator('[href^="tel:"]').or(
      page.locator('text="+44 131"').or(
        page.locator('text="+44"')
      )
    ).first().isVisible();
    
    const hasEmail = await page.locator('[href^="mailto:"]').or(
      page.locator('text="@gov.uk"').or(
        page.locator('text="@"')
      )
    ).first().isVisible();
    
    const hasWebsite = await page.locator('[href^="https://www.gov.uk"]').or(
      page.locator('text="gov.uk"').or(
        page.locator('text="www"').or(
          page.locator('text="http"').or(
            page.locator('[href^="http"]')
          )
        )
      )
    ).first().isVisible();
    
    // Should have at least one contact method
    expect(hasPhone || hasEmail || hasWebsite).toBeTruthy();
  });

  test('should display consultant ratings and reviews section', async () => {
    // Navigate to consultant profile
    await page.click('text="Find Consultants"');
    await page.waitForLoadState('networkidle');
    
    await page.click('text="View Profile"');
    await page.waitForLoadState('networkidle');
    
    // Wait for consultant profile content to fully load
    await expect(page.locator('h1, h2').first()).toBeVisible({ timeout: 15000 });
    await page.waitForTimeout(2000);
    
    // Check for rating display
    const hasRating = await page.locator('text="5.0/5"').or(
      page.locator('text="5.0"').or(
        page.locator('text="★"').or(
          page.locator('text="review"').or(
            page.locator('text="stars"')
          )
        )
      )
    ).first().isVisible();
    
    // Navigate to Reviews tab if available
    const reviewsTab = page.locator('text="Reviews"').first();
    if (await reviewsTab.isVisible()) {
      await reviewsTab.click();
      await page.waitForTimeout(1000);
      
      // Should show reviews section
      const hasReviewsSection = await page.locator('text="Reviews"').or(
        page.locator('text="review"')
      ).first().isVisible();
      
      expect(hasReviewsSection).toBeTruthy();
    }
    
    expect(hasRating).toBeTruthy();
  });

  test('should display consultant services and industries', async () => {
    // Navigate to consultant profile
    await page.click('text="Find Consultants"');
    await page.waitForLoadState('networkidle');
    
    await page.click('text="View Profile"');
    await page.waitForLoadState('networkidle');
    
    // Check for Services & Industries tab
    const servicesTab = page.locator('text="Services"').or(
      page.locator('text="Industries"')
    ).first();
    
    if (await servicesTab.isVisible()) {
      await servicesTab.click();
      await page.waitForTimeout(1000);
    }
    
    // Look for Brexit-related services
    const hasBrexitServices = await page.locator('text="Customs Declarations"').or(
      page.locator('text="VAT/Tax Compliance"').or(
        page.locator('text="Northern Ireland Protocol"').or(
          page.locator('text="Regulatory Compliance"').or(
            page.locator('text="Brexit"').or(
              page.locator('text="Customs"').or(
                page.locator('text="VAT"').or(
                  page.locator('text="Trade"')
                )
              )
            )
          )
        )
      )
    ).first().isVisible();
    
    expect(hasBrexitServices).toBeTruthy();
  });

  test('should navigate between profile tabs', async () => {
    // Navigate to consultant profile
    await page.click('text="Find Consultants"');
    await page.waitForLoadState('networkidle');
    
    await page.click('text="View Profile"');
    await page.waitForLoadState('networkidle');
    
    // Start on Overview tab (should be default)
    await expect(page.locator('text="Overview"')).toBeVisible({ timeout: 10000 });
    
    // Click on Services tab if available
    const servicesTab = page.locator('text="Services"').first();
    if (await servicesTab.isVisible()) {
      await servicesTab.click();
      await page.waitForTimeout(1000);
      
      // Should show services content
      const hasServicesContent = await page.locator('text="service"').or(
        page.locator('text="expertise"')
      ).first().isVisible();
      
      expect(hasServicesContent).toBeTruthy();
    }
    
    // Click on Reviews tab if available
    const reviewsTab = page.locator('text="Reviews"').first();
    if (await reviewsTab.isVisible()) {
      await reviewsTab.click();
      await page.waitForTimeout(1000);
      
      // Should show reviews content
      const hasReviewsContent = await page.locator('text="review"').first().isVisible();
      expect(hasReviewsContent).toBeTruthy();
    }
  });

  test('should handle "Request Quote" button click', async () => {
    // Navigate to consultant profile
    await page.click('text="Find Consultants"');
    await page.waitForLoadState('networkidle');
    
    await page.click('text="View Profile"');
    await page.waitForLoadState('networkidle');
    
    // Click on "Request Quote" button
    await page.click('text="Request Quote"');
    await page.waitForLoadState('networkidle');
    
    // Should navigate to quote request page with consultant context
    const url = page.url();
    expect(url).toContain('request-quote');
    
    // Should show quote request form
    const hasQuoteForm = await page.locator('form').or(
      page.locator('textarea').or(
        page.locator('input[name="name"]')
      )
    ).first().isVisible();
    
    expect(hasQuoteForm).toBeTruthy();
  });

  test('should display professional credentials and verification', async () => {
    // Navigate to consultant profile
    await page.click('text="Find Consultants"');
    await page.waitForLoadState('networkidle');
    
    await page.click('text="View Profile"');
    await page.waitForLoadState('networkidle');
    
    // Look for professional credentials
    const hasCredentials = await page.locator('text="Government"').or(
      page.locator('text="Certified"').or(
        page.locator('text="Verified"').or(
          page.locator('text="PhD"')
        )
      )
    ).first().isVisible();
    
    const hasWebsiteVerification = await page.locator('text=".gov"').or(
      page.locator('text=".ac.uk"')
    ).first().isVisible();
    
    // Should display professional credentials or verification
    expect(hasCredentials || hasWebsiteVerification).toBeTruthy();
  });

  test('should handle multiple consultant profiles', async () => {
    // Navigate to Find Consultants page
    await page.click('text="Find Consultants"');
    await page.waitForLoadState('networkidle');
    
    // Count available consultant profiles
    const viewProfileLinks = page.locator('text="View Profile"');
    const profileCount = await viewProfileLinks.count();
    
    expect(profileCount).toBeGreaterThan(0);
    
    // Test accessing different consultants
    if (profileCount > 1) {
      // Click on second consultant profile
      await viewProfileLinks.nth(1).click();
      await page.waitForLoadState('networkidle');
      
      // Should load different consultant
      await expect(page.locator('h1').or(page.locator('h2')).first()).toBeVisible({ timeout: 10000 });
      expect(page.url()).toContain('/consultant/');
      
      // Go back and try first consultant
      await page.goBack();
      await page.waitForLoadState('networkidle');
      
      await viewProfileLinks.first().click();
      await page.waitForLoadState('networkidle');
      
      // Should load first consultant
      await expect(page.locator('h1').or(page.locator('h2')).first()).toBeVisible({ timeout: 10000 });
    }
  });

  test('should display responsive layout on mobile', async () => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Navigate to consultant profile
    await page.click('text="Find Consultants"');
    await page.waitForLoadState('networkidle');
    
    await page.click('text="View Profile"');
    await page.waitForLoadState('networkidle');
    
    // Should display properly on mobile
    await expect(page.locator('h1').or(page.locator('h2')).first()).toBeVisible({ timeout: 10000 });
    
    // Tabs should be accessible on mobile
    const overviewTab = page.locator('text="Overview"');
    if (await overviewTab.isVisible()) {
      const tabBox = await overviewTab.boundingBox();
      expect(tabBox?.width).toBeLessThanOrEqual(375);
    }
    
    // "Request Quote" should be visible and accessible
    await expect(page.locator('text="Request Quote"')).toBeVisible({ timeout: 10000 });
  });
});
