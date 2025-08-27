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
    // Check if "List Your Business" button is visible in header
    await expect(page.locator('text="List Your Business"')).toBeVisible({ timeout: 10000 });
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
    
    // Fill with invalid email
    const emailInput = page.locator('input[type="email"]').or(
      page.locator('input[name="email"]')
    ).first();
    
    if (await emailInput.isVisible()) {
      await emailInput.fill('invalid-email');
      
      const submitButton = page.locator('button[type="submit"]').or(
        page.locator('button:has-text("Submit")')
      ).first();
      
      if (await submitButton.isVisible()) {
        await submitButton.click();
        
        // Should show email validation error
        await expect(
          page.locator('text="valid email"').or(
            page.locator('text="Invalid email"')
          ).first()
        ).toBeVisible({ timeout: 5000 });
      }
    }
  });

  test('should handle business category selection', async () => {
    await page.click('text="List Your Business"');
    await page.waitForLoadState('networkidle');
    
    // Look for service category selection
    const hasServiceSelect = await page.locator('select').or(
      page.locator('[data-testid="service-category"]')
    ).first().isVisible();
    
    const hasServiceRadio = await page.locator('input[type="radio"]').first().isVisible();
    const hasServiceCheckbox = await page.locator('input[type="checkbox"]').first().isVisible();
    
    // Should have some way to categorize business services
    expect(hasServiceSelect || hasServiceRadio || hasServiceCheckbox).toBeTruthy();
  });

  test('should display information about listing benefits', async () => {
    await page.click('text="List Your Business"');
    await page.waitForLoadState('networkidle');
    
    // Should display information about benefits of listing
    const hasBenefitsInfo = await page.locator('text="benefit"').or(
      page.locator('text="advantage"').or(
        page.locator('text="feature"').or(
          page.locator('text="why list"')
        )
      )
    ).first().isVisible();
    
    expect(hasBenefitsInfo).toBeTruthy();
  });

  test('should handle terms and conditions acceptance', async () => {
    await page.click('text="List Your Business"');
    await page.waitForLoadState('networkidle');
    
    // Look for terms and conditions checkbox or link
    const hasTermsCheckbox = await page.locator('input[type="checkbox"]').or(
      page.locator('[name*="terms"]')
    ).first().isVisible();
    
    const hasTermsLink = await page.locator('text="Terms"').or(
      page.locator('text="Privacy"').or(
        page.locator('text="conditions"')
      )
    ).first().isVisible();
    
    // Should have terms or privacy policy reference
    expect(hasTermsCheckbox || hasTermsLink).toBeTruthy();
  });

  test('should submit business registration with valid data', async () => {
    await page.click('text="List Your Business"');
    await page.waitForLoadState('networkidle');
    
    // Fill form with valid data if fields are available
    const businessNameInput = page.locator('input[name*="business"]').or(
      page.locator('input[name*="company"]')
    ).first();
    
    if (await businessNameInput.isVisible()) {
      await businessNameInput.fill('Test Brexit Consulting Ltd');
    }
    
    const emailInput = page.locator('input[type="email"]').first();
    if (await emailInput.isVisible()) {
      await emailInput.fill('test@testbrexitconsulting.com');
    }
    
    const phoneInput = page.locator('input[type="tel"]').or(
      page.locator('input[name*="phone"]')
    ).first();
    if (await phoneInput.isVisible()) {
      await phoneInput.fill('+44 20 1234 5678');
    }
    
    // Select service category if available
    const serviceSelect = page.locator('select').first();
    if (await serviceSelect.isVisible()) {
      await serviceSelect.selectOption({ index: 1 });
    }
    
    // Accept terms if checkbox exists
    const termsCheckbox = page.locator('input[type="checkbox"]').first();
    if (await termsCheckbox.isVisible()) {
      await termsCheckbox.check();
    }
    
    const submitButton = page.locator('button[type="submit"]').or(
      page.locator('button:has-text("Submit")')
    ).first();
    
    if (await submitButton.isVisible()) {
      await submitButton.click();
      
      // Wait for response
      await page.waitForTimeout(3000);
      
      // Should show success message or redirect
      const hasSuccess = await page.locator('text="success"').or(
        page.locator('text="submitted"').or(
          page.locator('text="thank you"')
        )
      ).first().isVisible();
      
      const hasRedirect = page.url().includes('success') || page.url().includes('thank-you');
      
      expect(hasSuccess || hasRedirect).toBeTruthy();
    }
  });

  test('should handle mobile responsive layout', async () => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.click('text="List Your Business"');
    await page.waitForLoadState('networkidle');
    
    // Form should be responsive
    const form = page.locator('form').first();
    if (await form.isVisible()) {
      const boundingBox = await form.boundingBox();
      expect(boundingBox?.width).toBeLessThanOrEqual(375);
    }
    
    // "List Your Business" button should be accessible on mobile
    await page.goto('/');
    await expect(page.locator('text="List Your Business"')).toBeVisible({ timeout: 10000 });
  });
});
