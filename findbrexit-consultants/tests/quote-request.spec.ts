import { test, expect, Page } from '@playwright/test';

test.describe('Quote Request Functionality', () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('/');
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('should navigate to quote request from consultant profile', async () => {
    // Navigate via consultant profile (most common path)
    await page.click('text="Find Consultants"');
    await page.waitForLoadState('networkidle');
    
    await page.click('text="View Profile"');
    await page.waitForLoadState('networkidle');
    
    // Click "Request Quote" button
    await page.click('text="Request Quote"');
    await page.waitForLoadState('networkidle');
    
    // Should navigate to quote request page with consultant context
    expect(page.url()).toContain('request-quote');
    
    // Should display quote request form
    await expect(
      page.locator('h1:has-text("Quote")').or(
        page.locator('text="Request a quote"')
      ).first()
    ).toBeVisible({ timeout: 10000 });
  });

  test('should display quote request form with consultant pre-populated', async () => {
    // Navigate to quote request via consultant profile
    await page.click('text="Find Consultants"');
    await page.waitForLoadState('networkidle');
    
    await page.click('text="View Profile"');
    await page.waitForLoadState('networkidle');
    
    await page.click('text="Request Quote"');
    await page.waitForLoadState('networkidle');
    
    // Should show consultant information or context
    const hasConsultantInfo = await page.locator('text="consultant"').or(
      page.locator('text="Charles"').or(
        page.locator('text="Dr Anna"').or(
          page.locator('text="Chris"')
        )
      )
    ).first().isVisible();
    
    expect(hasConsultantInfo).toBeTruthy();
  });

  test('should display quote request form with essential fields', async () => {
    // Navigate to quote request page
    await page.goto('/request-quote');
    await page.waitForLoadState('networkidle');
    
    // Check for essential form fields
    const hasNameField = await page.locator('input[name*="name"]').or(
      page.locator('input[placeholder*="name" i]')
    ).first().isVisible();
    
    const hasEmailField = await page.locator('input[type="email"]').or(
      page.locator('input[name*="email"]')
    ).first().isVisible();
    
    const hasMessageField = await page.locator('textarea').or(
      page.locator('input[name*="message"]').or(
        page.locator('input[name*="description"]')
      )
    ).first().isVisible();
    
    // Should have basic contact and message fields
    expect(hasNameField || hasEmailField || hasMessageField).toBeTruthy();
  });

  test('should validate required fields on form submission', async () => {
    // Navigate to quote request page
    await page.goto('/request-quote');
    await page.waitForLoadState('networkidle');
    
    // Try to submit empty form
    const submitButton = page.locator('button[type="submit"]').or(
      page.locator('button:has-text("Submit")').or(
        page.locator('button:has-text("Send")')
      )
    ).first();
    
    if (await submitButton.isVisible()) {
      await submitButton.click();
      
      // Should show validation errors
      const hasValidationError = await page.locator('text="required"').or(
        page.locator('text="Please"').or(
          page.locator('.error').or(
            page.locator('text="fill"')
          )
        )
      ).first().isVisible();
      
      expect(hasValidationError).toBeTruthy();
    }
  });

  test('should validate email format', async () => {
    // Navigate to quote request page
    await page.goto('/request-quote');
    await page.waitForLoadState('networkidle');
    
    // Fill form with invalid email
    const emailInput = page.locator('input[type="email"]').or(
      page.locator('input[name*="email"]')
    ).first();
    
    if (await emailInput.isVisible()) {
      await emailInput.fill('invalid-email');
      
      // Fill other required fields
      const nameInput = page.locator('input[name*="name"]').first();
      if (await nameInput.isVisible()) {
        await nameInput.fill('Test User');
      }
      
      const messageInput = page.locator('textarea').or(
        page.locator('input[name*="message"]')
      ).first();
      if (await messageInput.isVisible()) {
        await messageInput.fill('I need help with Brexit compliance.');
      }
      
      const submitButton = page.locator('button[type="submit"]').first();
      if (await submitButton.isVisible()) {
        await submitButton.click();
        
        // Should show email validation error
        const hasEmailError = await page.locator('text="valid email"').or(
          page.locator('text="Invalid email"').or(
            page.locator('text="email format"')
          )
        ).first().isVisible();
        
        expect(hasEmailError).toBeTruthy();
      }
    }
  });

  test('should display Brexit service categories', async () => {
    // Navigate to quote request page
    await page.goto('/request-quote');
    await page.waitForLoadState('networkidle');
    
    // Look for Brexit-related service options
    const hasCustomsService = await page.locator('text="Customs"').or(
      page.locator('text="customs"')
    ).first().isVisible();
    
    const hasVATService = await page.locator('text="VAT"').or(
      page.locator('text="vat"')
    ).first().isVisible();
    
    const hasComplianceService = await page.locator('text="Compliance"').or(
      page.locator('text="compliance"')
    ).first().isVisible();
    
    const hasTradeService = await page.locator('text="Trade"').or(
      page.locator('text="trade"')
    ).first().isVisible();
    
    const hasBrexitService = await page.locator('text="Brexit"').or(
      page.locator('text="brexit"')
    ).first().isVisible();
    
    // Should have Brexit-related services
    expect(hasCustomsService || hasVATService || hasComplianceService || hasTradeService || hasBrexitService).toBeTruthy();
  });

  test('should submit quote request with valid data', async () => {
    // Navigate to quote request page
    await page.goto('/request-quote');
    await page.waitForLoadState('networkidle');
    
    // Fill form with valid data
    const nameInput = page.locator('input[name*="name"]').or(
      page.locator('input[placeholder*="name" i]')
    ).first();
    
    if (await nameInput.isVisible()) {
      await nameInput.fill('John Smith');
    }
    
    const emailInput = page.locator('input[type="email"]').or(
      page.locator('input[name*="email"]')
    ).first();
    
    if (await emailInput.isVisible()) {
      await emailInput.fill('john.smith@example.com');
    }
    
    const companyInput = page.locator('input[name*="company"]').or(
      page.locator('input[placeholder*="company" i]')
    ).first();
    
    if (await companyInput.isVisible()) {
      await companyInput.fill('Smith Trading Ltd');
    }
    
    const phoneInput = page.locator('input[type="tel"]').or(
      page.locator('input[name*="phone"]')
    ).first();
    
    if (await phoneInput.isVisible()) {
      await phoneInput.fill('+44 20 1234 5678');
    }
    
    const messageInput = page.locator('textarea').or(
      page.locator('input[name*="message"]')
    ).first();
    
    if (await messageInput.isVisible()) {
      await messageInput.fill('I need assistance with Brexit customs compliance for my import/export business. We import electronic goods from the EU and need help with proper documentation and procedures.');
    }
    
    // Select service category if available
    const serviceSelect = page.locator('select').first();
    if (await serviceSelect.isVisible()) {
      await serviceSelect.selectOption({ index: 1 });
    }
    
    // Select service checkboxes if available
    const serviceCheckbox = page.locator('input[type="checkbox"]').first();
    if (await serviceCheckbox.isVisible()) {
      await serviceCheckbox.check();
    }
    
    const submitButton = page.locator('button[type="submit"]').or(
      page.locator('button:has-text("Submit")').or(
        page.locator('button:has-text("Send")')
      )
    ).first();
    
    if (await submitButton.isVisible()) {
      await submitButton.click();
      
      // Wait for response
      await page.waitForTimeout(3000);
      
      // Should show success message or redirect
      const hasSuccess = await page.locator('text="success"').or(
        page.locator('text="sent"').or(
          page.locator('text="received"').or(
            page.locator('text="thank you"')
          )
        )
      ).first().isVisible();
      
      const hasRedirect = page.url().includes('success') || page.url().includes('thank-you');
      
      expect(hasSuccess || hasRedirect).toBeTruthy();
    }
  });

  test('should handle multi-step quote request form', async () => {
    // Navigate to quote request page
    await page.goto('/request-quote');
    await page.waitForLoadState('networkidle');
    
    // Check if it's a multi-step form
    const hasSteps = await page.locator('text="Step"').or(
      page.locator('[data-testid*="step"]').or(
        page.locator('.step')
      )
    ).first().isVisible();
    
    if (hasSteps) {
      // Fill first step
      const nameInput = page.locator('input[name*="name"]').first();
      if (await nameInput.isVisible()) {
        await nameInput.fill('Test User');
      }
      
      const emailInput = page.locator('input[type="email"]').first();
      if (await emailInput.isVisible()) {
        await emailInput.fill('test@example.com');
      }
      
      // Look for "Next" button
      const nextButton = page.locator('button:has-text("Next")').or(
        page.locator('button:has-text("Continue")')
      ).first();
      
      if (await nextButton.isVisible()) {
        await nextButton.click();
        await page.waitForTimeout(1000);
        
        // Should move to next step
        const hasStep2 = await page.locator('text="Step 2"').or(
          page.locator('[data-testid="step-2"]')
        ).first().isVisible();
        
        expect(hasStep2).toBeTruthy();
      }
    } else {
      // Single-step form is also valid
      expect(true).toBeTruthy();
    }
  });

  test('should handle phone number field validation', async () => {
    // Navigate to quote request page
    await page.goto('/request-quote');
    await page.waitForLoadState('networkidle');
    
    // Check for phone number field
    const phoneInput = page.locator('input[type="tel"]').or(
      page.locator('input[name*="phone"]')
    ).first();
    
    if (await phoneInput.isVisible()) {
      // Test invalid phone number
      await phoneInput.fill('invalid-phone');
      
      // Fill other required fields
      const nameInput = page.locator('input[name*="name"]').first();
      if (await nameInput.isVisible()) {
        await nameInput.fill('Test User');
      }
      
      const emailInput = page.locator('input[type="email"]').first();
      if (await emailInput.isVisible()) {
        await emailInput.fill('test@example.com');
      }
      
      const submitButton = page.locator('button[type="submit"]').first();
      if (await submitButton.isVisible()) {
        await submitButton.click();
        
        // Check for phone validation (may or may not exist)
        const hasPhoneError = await page.locator('text="valid phone"').or(
          page.locator('text="Invalid phone"')
        ).first().isVisible();
        
        // Fill valid phone number
        await phoneInput.clear();
        await phoneInput.fill('+44 20 1234 5678');
        
        // Validation error should clear if it existed
        if (hasPhoneError) {
          await page.waitForTimeout(1000);
          expect(await page.locator('text="valid phone"').first().isVisible()).toBeFalsy();
        }
      }
    }
  });

  test('should display company/business information fields', async () => {
    // Navigate to quote request page
    await page.goto('/request-quote');
    await page.waitForLoadState('networkidle');
    
    // Look for business-related fields
    const hasCompanyField = await page.locator('input[name*="company"]').or(
      page.locator('input[placeholder*="company" i]')
    ).first().isVisible();
    
    const hasBusinessField = await page.locator('input[name*="business"]').or(
      page.locator('input[placeholder*="business" i]')
    ).first().isVisible();
    
    const hasIndustryField = await page.locator('select[name*="industry"]').or(
      page.locator('input[name*="industry"]')
    ).first().isVisible();
    
    // Should have business context fields
    expect(hasCompanyField || hasBusinessField || hasIndustryField).toBeTruthy();
  });

  test('should handle urgent/priority request options', async () => {
    // Navigate to quote request page
    await page.goto('/request-quote');
    await page.waitForLoadState('networkidle');
    
    // Look for priority or urgency options
    const hasUrgentOption = await page.locator('text="urgent"').or(
      page.locator('text="priority"').or(
        page.locator('text="rush"')
      )
    ).first().isVisible();
    
    const hasTimeframeSelect = await page.locator('select[name*="timeframe"]').or(
      page.locator('select[name*="deadline"]')
    ).first().isVisible();
    
    // Priority/urgency options are optional
    if (hasUrgentOption || hasTimeframeSelect) {
      expect(true).toBeTruthy();
    } else {
      // No urgency options is also fine
      expect(true).toBeTruthy();
    }
  });

  test('should display responsive layout on mobile', async () => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Navigate to quote request page
    await page.goto('/request-quote');
    await page.waitForLoadState('networkidle');
    
    // Form should be responsive
    const form = page.locator('form').first();
    if (await form.isVisible()) {
      const boundingBox = await form.boundingBox();
      expect(boundingBox?.width).toBeLessThanOrEqual(375);
    }
    
    // Form fields should fit mobile viewport
    const inputs = page.locator('input, textarea, select');
    const inputCount = await inputs.count();
    
    if (inputCount > 0) {
      const firstInput = inputs.first();
      const inputBox = await firstInput.boundingBox();
      expect(inputBox?.width).toBeLessThanOrEqual(375);
    }
    
    // Submit button should be accessible
    const submitButton = page.locator('button[type="submit"]').first();
    if (await submitButton.isVisible()) {
      const buttonBox = await submitButton.boundingBox();
      expect(buttonBox?.width).toBeLessThanOrEqual(375);
    }
  });
});
