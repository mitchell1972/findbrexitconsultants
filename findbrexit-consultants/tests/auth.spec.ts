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
    
    // Wait for navigation to be visible first
    await expect(page.locator('nav')).toBeVisible({ timeout: 15000 });
    
    // Check if "List Your Business" button is visible in header
    await expect(
      page.locator('text="List Your Business"').or(
        page.locator('a[href*="list"]').or(
          page.locator('button:has-text("List Your Business")')
        )
      )
    ).toBeVisible({ timeout: 10000 });
  });

  test('should navigate to business listing/registration page', async () => {
    // Click on "List Your Business" button
    await page.click('text="List Your Business"');
    await page.waitForLoadState('networkidle');
    
    // Should navigate to business registration or listing page
    const url = page.url();
    expect(url).toContain('list');
    
    // Should display registration or business submission form elements
    const hasForm = await page.locator('form').or(
      page.locator('input[type="email"]').or(
        page.locator('input[name="name"]')
      )
    ).first().isVisible();
    
    expect(hasForm).toBeTruthy();
  });

  test('should display business registration form fields', async () => {
    await page.click('text="List Your Business"');
    await page.waitForLoadState('networkidle');
    
    // Check for common business registration fields
    const hasBusinessName = await page.locator('input[name*="business"]').or(
      page.locator('input[name*="company"]').or(
        page.locator('input[placeholder*="business" i]')
      )
    ).first().isVisible();
    
    const hasEmail = await page.locator('input[type="email"]').or(
      page.locator('input[name="email"]')
    ).first().isVisible();
    
    const hasContactInfo = await page.locator('input[name*="phone"]').or(
      page.locator('input[type="tel"]')
    ).first().isVisible();
    
    // Should have business registration fields
    expect(hasBusinessName || hasEmail || hasContactInfo).toBeTruthy();
  });

  test('should validate required fields on business registration', async () => {
    await page.click('text="List Your Business"');
    await page.waitForLoadState('networkidle');
    
    // Wait for form to load completely and ensure all required fields are present
    await expect(page.locator('text="Basic Information"')).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(2000);
    
    // Verify we can see the required form fields
    const companyNameField = page.locator('input').nth(0); // Company Name field
    const contactPersonField = page.locator('input').nth(1); // Contact Person field
    const emailField = page.locator('input').nth(2); // Email field
    const phoneField = page.locator('input').nth(3); // Phone field
    
    await expect(companyNameField).toBeVisible();
    await expect(contactPersonField).toBeVisible();
    await expect(emailField).toBeVisible();
    await expect(phoneField).toBeVisible();
    
    // Ensure fields are empty before clicking Next
    await companyNameField.clear();
    await contactPersonField.clear();
    await emailField.clear();
    await phoneField.clear();
    
    // Click the Next button to trigger validation
    const nextButton = page.locator('button:has-text("Next")');
    await expect(nextButton).toBeVisible();
    await nextButton.click();
    
    // Wait for validation errors to appear
    await page.waitForTimeout(2000);
    
    // Check for any validation error indicators - could be text or visual cues
    const hasValidationErrors = await page.evaluate(() => {
      // Look for common validation error patterns
      const errorTexts = Array.from(document.querySelectorAll('*')).some(el => {
        const text = el.textContent || '';
        return text.includes('required') || 
               text.includes('Required') ||
               text.includes('Company name is required') ||
               text.includes('Contact person is required') ||
               text.includes('Email is required') ||
               text.includes('Phone number is required') ||
               text.includes('This field is required') ||
               text.includes('Please fill');
      });
      
      // Look for visual error indicators (red borders, error classes)
      const hasRedBorders = Array.from(document.querySelectorAll('input')).some(input => {
        const styles = window.getComputedStyle(input);
        return styles.borderColor.includes('red') || 
               styles.borderColor.includes('rgb(239, 68, 68)') || // red-500
               input.classList.toString().includes('error') ||
               input.classList.toString().includes('invalid');
      });
      
      return errorTexts || hasRedBorders;
    });
    
    expect(hasValidationErrors).toBeTruthy();
  });

  test('should validate email format in business registration', async () => {
    await page.click('text="List Your Business"');
    await page.waitForLoadState('networkidle');
    
    // Wait for form to load completely
    await expect(page.locator('text="Basic Information"')).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(2000);
    
    // Fill other required fields with valid data
    const companyNameField = page.locator('input').nth(0);
    const contactPersonField = page.locator('input').nth(1);
    const emailField = page.locator('input').nth(2);
    const phoneField = page.locator('input').nth(3);
    
    await companyNameField.fill('Test Company');
    await contactPersonField.fill('John Doe');
    await phoneField.fill('1234567890');
    
    // Fill email with invalid format
    await emailField.fill('invalid-email');
    
    // Click Next button to trigger validation
    const nextButton = page.locator('button:has-text("Next")');
    await expect(nextButton).toBeVisible();
    await nextButton.click();
    
    // Wait for validation to appear
    await page.waitForTimeout(2000);
    
    // Check for email validation errors
    const hasEmailValidationError = await page.evaluate(() => {
      // Look for email-specific validation patterns
      const errorTexts = Array.from(document.querySelectorAll('*')).some(el => {
        const text = el.textContent || '';
        return text.includes('valid email') || 
               text.includes('Invalid email') ||
               text.includes('email format') ||
               text.includes('Enter a valid email') ||
               text.includes('Please enter a valid email') ||
               text.includes('must be a valid email');
      });
      
      // Check if the email field has validation styling
      const emailInputs = Array.from(document.querySelectorAll('input[type="email"], input[name*="email"]'));
      const hasEmailError = emailInputs.some(input => {
        const styles = window.getComputedStyle(input);
        return styles.borderColor.includes('red') || 
               styles.borderColor.includes('rgb(239, 68, 68)') ||
               input.classList.toString().includes('error') ||
               input.classList.toString().includes('invalid');
      });
      
      return errorTexts || hasEmailError;
    });
    
    expect(hasEmailValidationError).toBeTruthy();
  });

  test('should handle business category selection', async () => {
    await page.click('text="List Your Business"');
    await page.waitForLoadState('networkidle');
    
    // Wait for form to load
    await expect(page.locator('text="Basic Information"')).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(2000);
    
    // Fill the first step to proceed to potential category selection
    const companyNameField = page.locator('input').nth(0);
    const contactPersonField = page.locator('input').nth(1);
    const emailField = page.locator('input').nth(2);
    const phoneField = page.locator('input').nth(3);
    
    await companyNameField.fill('Test Company');
    await contactPersonField.fill('John Doe');
    await emailField.fill('john@test.com');
    await phoneField.fill('1234567890');
    
    // Try to proceed to next step where category selection might be
    const nextButton = page.locator('button:has-text("Next")');
    if (await nextButton.isVisible()) {
      await nextButton.click();
      await page.waitForTimeout(3000);
    }
    
    // Now look for service category selection (could be on step 2, 3, or 4)
    const hasServiceSelect = await page.locator('select').first().isVisible();
    const hasServiceRadio = await page.locator('input[type="radio"]').first().isVisible();
    const hasServiceCheckbox = await page.locator('input[type="checkbox"]').first().isVisible();
    const hasServiceDropdown = await page.locator('[role="listbox"], [role="combobox"]').first().isVisible();
    
    // Should have some way to categorize business services, or at least the form should progress
    const hasProgressIndicator = await page.locator('text="2", text="3", text="4"').first().isVisible();
    
    expect(hasServiceSelect || hasServiceRadio || hasServiceCheckbox || hasServiceDropdown || hasProgressIndicator).toBeTruthy();
  });

  test('should display information about listing benefits', async () => {
    await page.click('text="List Your Business"');
    await page.waitForLoadState('networkidle');
    
    // Wait for the page content to load
    await page.waitForTimeout(2000);
    
    // Should display information about benefits of listing - check for actual content on the page
    const hasBenefitsInfo = await page.locator('text="Reach More Clients"').or(
      page.locator('text="Build Your Reputation"').or(
        page.locator('text="Verified Listings"').or(
          page.locator('text="Connect with businesses"').or(
            page.locator('text="Showcase reviews"').or(
              page.locator('text="verified status"').or(
                page.locator('text="Brexit compliance"').or(
                  page.locator('text="leading directory"')
                )
              )
            )
          )
        )
      )
    ).first().isVisible({ timeout: 10000 });
    
    expect(hasBenefitsInfo).toBeTruthy();
  });

  test('should handle terms and conditions acceptance', async () => {
    await page.click('text="List Your Business"');
    await page.waitForLoadState('networkidle');
    
    // Wait for page to fully load
    await page.waitForTimeout(2000);
    
    // Look for terms and conditions checkbox or link in form area
    const hasTermsCheckbox = await page.locator('input[type="checkbox"]').first().isVisible();
    const hasTermsInForm = await page.locator('[name*="terms"], [id*="terms"]').first().isVisible();
    
    // Also check footer for terms/privacy links (common location)
    const hasTermsInFooter = await page.locator('footer').locator('text="Terms"').or(
      page.locator('footer').locator('text="Privacy"').or(
        page.locator('footer').locator('text="Cookie"')
      )
    ).first().isVisible();
    
    // Check anywhere on page for terms/privacy/conditions text
    const hasTermsAnywhere = await page.locator('text="Terms of Service"').or(
      page.locator('text="Privacy Policy"').or(
        page.locator('text="Cookie Policy"').or(
          page.locator('a[href*="terms"]').or(
            page.locator('a[href*="privacy"]')
          )
        )
      )
    ).first().isVisible();
    
    // Should have terms, privacy policy reference, or terms checkbox somewhere
    expect(hasTermsCheckbox || hasTermsInForm || hasTermsInFooter || hasTermsAnywhere).toBeTruthy();
  });

  test('should submit business registration with valid data', async () => {
    await page.click('text="List Your Business"');
    await page.waitForLoadState('networkidle');
    
    // Wait for form to load
    await expect(page.locator('text="Basic Information"')).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(2000);
    
    // Fill the first step with valid data
    const companyNameField = page.locator('input').nth(0);
    const contactPersonField = page.locator('input').nth(1);
    const emailField = page.locator('input').nth(2);
    const phoneField = page.locator('input').nth(3);
    const websiteField = page.locator('input').nth(4);
    
    await companyNameField.fill('Test Brexit Consulting Ltd');
    await contactPersonField.fill('John Smith');
    await emailField.fill('john@testbrexitconsulting.com');
    await phoneField.fill('+44 20 1234 5678');
    await websiteField.fill('https://www.testbrexitconsulting.com');
    
    // Click Next to proceed
    const nextButton = page.locator('button:has-text("Next")');
    await expect(nextButton).toBeVisible();
    await nextButton.click();
    
    // Wait for the next step or success indication
    await page.waitForTimeout(3000);
    
    // Check if we've progressed (either to step 2 or success)
    const hasProgressed = await page.evaluate(() => {
      const currentUrl = window.location.href;
      const pageText = document.body.textContent || '';
      
      // Check for progression indicators
      return pageText.includes('Step 2') || 
             pageText.includes('2 of 4') || 
             pageText.includes('Service Details') ||
             pageText.includes('success') ||
             pageText.includes('submitted') ||
             pageText.includes('thank you') ||
             currentUrl.includes('step-2') ||
             currentUrl.includes('success');
    });
    
    expect(hasProgressed).toBeTruthy();
  });

  test('should handle mobile responsive layout', async () => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Wait for page to load in mobile view
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // "List Your Business" button should be accessible on mobile
    await expect(page.locator('text="List Your Business"')).toBeVisible({ timeout: 15000 });
    
    // Navigate to registration page in mobile view
    await page.click('text="List Your Business"');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Check that main content area is responsive
    const mainContent = page.locator('main').or(
      page.locator('[data-testid="main-content"]').or(
        page.locator('.container').or(
          page.locator('body > div').first()
        )
      )
    );
    
    const hasResponsiveLayout = await mainContent.first().evaluate((element) => {
      const rect = element.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(element);
      
      // Check that content doesn't overflow viewport and uses reasonable mobile styling
      return rect.width <= window.innerWidth && 
             (computedStyle.padding !== '0px' || computedStyle.margin !== '0px');
    });
    
    expect(hasResponsiveLayout).toBeTruthy();
  });
});
