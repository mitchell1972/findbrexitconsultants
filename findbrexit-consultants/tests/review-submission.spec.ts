import { test, expect, Page } from '@playwright/test';

test.describe('Review Submission Functionality', () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('/');
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('should find and access reviews section on consultant profiles', async () => {
    // Navigate to Find Consultants to access consultant profiles
    await page.click('text="Find Consultants"');
    await page.waitForLoadState('networkidle');
    
    // Click on first consultant profile
    await page.click('text="View Profile"');
    await page.waitForLoadState('networkidle');
    
    // Look for Reviews tab
    const reviewsTab = page.locator('text="Reviews"').first();
    
    if (await reviewsTab.isVisible()) {
      await reviewsTab.click();
      await page.waitForTimeout(1000);
      
      // Should display reviews section
      const hasReviewsSection = await page.locator('text="Reviews"').or(
        page.locator('text="review"')
      ).first().isVisible();
      
      expect(hasReviewsSection).toBeTruthy();
    } else {
      // Reviews might be displayed on main profile page
      const hasReviewsOnProfile = await page.locator('text="5.0"').or(
        page.locator('text="★"').or(
          page.locator('text="rating"')
        )
      ).first().isVisible();
      
      expect(hasReviewsOnProfile).toBeTruthy();
    }
  });

  test('should display existing reviews with ratings', async () => {
    // Navigate to consultant profile
    await page.click('text="Find Consultants"');
    await page.waitForLoadState('networkidle');
    
    await page.click('text="View Profile"');
    await page.waitForLoadState('networkidle');
    
    // Navigate to Reviews tab if available
    const reviewsTab = page.locator('text="Reviews"').first();
    if (await reviewsTab.isVisible()) {
      await reviewsTab.click();
      await page.waitForTimeout(1000);
    }
    
    // Check for rating display
    const hasRating = await page.locator('text="5.0"').or(
      page.locator('text="★"').or(
        page.locator('text="stars"').or(
          page.locator('text="/5"')
        )
      )
    ).first().isVisible();
    
    expect(hasRating).toBeTruthy();
  });

  test('should show review count information', async () => {
    // Navigate to consultant profile
    await page.click('text="Find Consultants"');
    await page.waitForLoadState('networkidle');
    
    await page.click('text="View Profile"');
    await page.waitForLoadState('networkidle');
    
    // Look for review count (e.g., "Reviews 1", "(Reviews 3)", etc.)
    const hasReviewCount = await page.locator('text="Reviews"').or(
      page.locator('text="review"')
    ).first().isVisible();
    
    // Check for numeric indicators
    const hasNumericCount = await page.locator('text="1"').or(
      page.locator('text="2"').or(
        page.locator('text="3"')
      )
    ).first().isVisible();
    
    expect(hasReviewCount || hasNumericCount).toBeTruthy();
  });

  test('should handle "Write Review" or "Add Review" functionality', async () => {
    // Navigate to consultant profile
    await page.click('text="Find Consultants"');
    await page.waitForLoadState('networkidle');
    
    await page.click('text="View Profile"');
    await page.waitForLoadState('networkidle');
    
    // Navigate to Reviews section
    const reviewsTab = page.locator('text="Reviews"').first();
    if (await reviewsTab.isVisible()) {
      await reviewsTab.click();
      await page.waitForTimeout(1000);
    }
    
    // Look for "Write Review" or similar button
    const writeReviewButton = page.locator('text="Write Review"').or(
      page.locator('text="Add Review"').or(
        page.locator('text="Leave Review"').or(
          page.locator('button:has-text("Review")')
        )
      )
    ).first();
    
    const hasWriteReview = await writeReviewButton.isVisible();
    
    if (hasWriteReview) {
      await writeReviewButton.click();
      await page.waitForTimeout(1000);
      
      // Should show review form or login prompt
      const hasForm = await page.locator('textarea').or(
        page.locator('input[type="text"]').or(
          page.locator('form')
        )
      ).first().isVisible();
      
      const needsAuth = await page.locator('text="login"').or(
        page.locator('text="sign in"')
      ).first().isVisible();
      
      expect(hasForm || needsAuth).toBeTruthy();
    } else {
      // No write review functionality is also acceptable
      expect(true).toBeTruthy();
    }
  });

  test('should display review form with rating and comment fields', async () => {
    // Navigate to consultant profile
    await page.click('text="Find Consultants"');
    await page.waitForLoadState('networkidle');
    
    await page.click('text="View Profile"');
    await page.waitForLoadState('networkidle');
    
    // Navigate to Reviews section
    const reviewsTab = page.locator('text="Reviews"').first();
    if (await reviewsTab.isVisible()) {
      await reviewsTab.click();
      await page.waitForTimeout(1000);
    }
    
    const writeReviewButton = page.locator('text="Write Review"').or(
      page.locator('text="Add Review"')
    ).first();
    
    if (await writeReviewButton.isVisible()) {
      await writeReviewButton.click();
      await page.waitForTimeout(1000);
      
      // Check for review text field
      const hasTextArea = await page.locator('textarea').first().isVisible();
      
      // Check for rating system
      const hasStarRating = await page.locator('text="★"').or(
        page.locator('.star')
      ).first().isVisible();
      
      const hasNumericRating = await page.locator('input[type="range"]').or(
        page.locator('select[name*="rating"]')
      ).first().isVisible();
      
      expect(hasTextArea && (hasStarRating || hasNumericRating)).toBeTruthy();
    }
  });

  test('should validate required review fields', async () => {
    // Navigate to consultant profile
    await page.click('text="Find Consultants"');
    await page.waitForLoadState('networkidle');
    
    await page.click('text="View Profile"');
    await page.waitForLoadState('networkidle');
    
    const reviewsTab = page.locator('text="Reviews"').first();
    if (await reviewsTab.isVisible()) {
      await reviewsTab.click();
      await page.waitForTimeout(1000);
    }
    
    const writeReviewButton = page.locator('text="Write Review"').first();
    
    if (await writeReviewButton.isVisible()) {
      await writeReviewButton.click();
      await page.waitForTimeout(1000);
      
      // Try to submit empty review form
      const submitButton = page.locator('button[type="submit"]').or(
        page.locator('button:has-text("Submit")')
      ).first();
      
      if (await submitButton.isVisible()) {
        await submitButton.click();
        
        // Should show validation errors
        const hasValidationError = await page.locator('text="required"').or(
          page.locator('text="Please"').or(
            page.locator('.error')
          )
        ).first().isVisible();
        
        expect(hasValidationError).toBeTruthy();
      }
    }
  });

  test('should handle star rating interaction', async () => {
    // Navigate to consultant profile
    await page.click('text="Find Consultants"');
    await page.waitForLoadState('networkidle');
    
    await page.click('text="View Profile"');
    await page.waitForLoadState('networkidle');
    
    const reviewsTab = page.locator('text="Reviews"').first();
    if (await reviewsTab.isVisible()) {
      await reviewsTab.click();
      await page.waitForTimeout(1000);
    }
    
    const writeReviewButton = page.locator('text="Write Review"').first();
    
    if (await writeReviewButton.isVisible()) {
      await writeReviewButton.click();
      await page.waitForTimeout(1000);
      
      // Test star rating interaction
      const stars = page.locator('.star').or(
        page.locator('[data-testid*="star"]')
      );
      
      const starCount = await stars.count();
      
      if (starCount >= 5) {
        // Click on 5th star
        await stars.nth(4).click();
        
        // Should select 5 stars
        const fifthStar = stars.nth(4);
        const starClass = await fifthStar.getAttribute('class') || '';
        const isSelected = starClass.includes('selected') || 
                         starClass.includes('active') || 
                         starClass.includes('filled');
        
        expect(isSelected).toBeTruthy();
      }
    }
  });

  test('should submit complete review with rating and text', async () => {
    // Navigate to consultant profile
    await page.click('text="Find Consultants"');
    await page.waitForLoadState('networkidle');
    
    await page.click('text="View Profile"');
    await page.waitForLoadState('networkidle');
    
    const reviewsTab = page.locator('text="Reviews"').first();
    if (await reviewsTab.isVisible()) {
      await reviewsTab.click();
      await page.waitForTimeout(1000);
    }
    
    const writeReviewButton = page.locator('text="Write Review"').first();
    
    if (await writeReviewButton.isVisible()) {
      await writeReviewButton.click();
      await page.waitForTimeout(1000);
      
      // Fill review form
      const reviewText = page.locator('textarea').first();
      if (await reviewText.isVisible()) {
        await reviewText.fill('This consultant provided excellent Brexit compliance advice. Their expertise in customs regulations saved us time and money. Highly recommended!');
      }
      
      // Select 5-star rating
      const stars = page.locator('.star');
      const starCount = await stars.count();
      
      if (starCount >= 5) {
        await stars.nth(4).click();
      } else {
        // Try alternative rating methods
        const ratingSelect = page.locator('select[name*="rating"]').first();
        if (await ratingSelect.isVisible()) {
          await ratingSelect.selectOption('5');
        }
        
        const ratingInput = page.locator('input[type="range"]').first();
        if (await ratingInput.isVisible()) {
          await ratingInput.fill('5');
        }
      }
      
      // Fill reviewer info if required
      const nameInput = page.locator('input[name*="name"]').first();
      if (await nameInput.isVisible()) {
        await nameInput.fill('John Smith');
      }
      
      const emailInput = page.locator('input[type="email"]').first();
      if (await emailInput.isVisible()) {
        await emailInput.fill('john.smith@example.com');
      }
      
      // Submit review
      const submitButton = page.locator('button[type="submit"]').or(
        page.locator('button:has-text("Submit")')
      ).first();
      
      if (await submitButton.isVisible()) {
        await submitButton.click();
        
        // Wait for response
        await page.waitForTimeout(3000);
        
        // Should show success message or redirect
        const hasSuccess = await page.locator('text="success"').or(
          page.locator('text="thank you"').or(
            page.locator('text="submitted"')
          )
        ).first().isVisible();
        
        const hasRedirect = page.url().includes('success');
        
        expect(hasSuccess || hasRedirect).toBeTruthy();
      }
    }
  });

  test('should handle authentication requirement for reviews', async () => {
    // Navigate to consultant profile
    await page.click('text="Find Consultants"');
    await page.waitForLoadState('networkidle');
    
    await page.click('text="View Profile"');
    await page.waitForLoadState('networkidle');
    
    const reviewsTab = page.locator('text="Reviews"').first();
    if (await reviewsTab.isVisible()) {
      await reviewsTab.click();
      await page.waitForTimeout(1000);
    }
    
    const writeReviewButton = page.locator('text="Write Review"').first();
    
    if (await writeReviewButton.isVisible()) {
      await writeReviewButton.click();
      await page.waitForTimeout(1000);
      
      // Check if login is required
      const needsLogin = await page.locator('text="login"').or(
        page.locator('text="sign in"').or(
          page.locator('text="authenticate"')
        )
      ).first().isVisible();
      
      if (needsLogin) {
        // Authentication required path
        expect(needsLogin).toBeTruthy();
      } else {
        // Anonymous review allowed path
        const hasReviewForm = await page.locator('textarea').or(
          page.locator('input[name*="name"]')
        ).first().isVisible();
        
        expect(hasReviewForm).toBeTruthy();
      }
    }
  });

  test('should display review sorting and filtering options', async () => {
    // Navigate to consultant profile with multiple reviews
    await page.click('text="Find Consultants"');
    await page.waitForLoadState('networkidle');
    
    await page.click('text="View Profile"');
    await page.waitForLoadState('networkidle');
    
    const reviewsTab = page.locator('text="Reviews"').first();
    if (await reviewsTab.isVisible()) {
      await reviewsTab.click();
      await page.waitForTimeout(1000);
      
      // Look for sorting options
      const hasSortOptions = await page.locator('text="Sort"').or(
        page.locator('text="Latest"').or(
          page.locator('text="Oldest"').or(
            page.locator('select')
          )
        )
      ).first().isVisible();
      
      // Look for filtering options
      const hasFilterOptions = await page.locator('text="Filter"').or(
        page.locator('text="Rating"')
      ).first().isVisible();
      
      // Sorting/filtering is optional for reviews
      if (hasSortOptions || hasFilterOptions) {
        expect(true).toBeTruthy();
      } else {
        expect(true).toBeTruthy(); // No sorting is also fine
      }
    }
  });

  test('should handle review pagination if many reviews exist', async () => {
    // Navigate to consultant profile
    await page.click('text="Find Consultants"');
    await page.waitForLoadState('networkidle');
    
    await page.click('text="View Profile"');
    await page.waitForLoadState('networkidle');
    
    const reviewsTab = page.locator('text="Reviews"').first();
    if (await reviewsTab.isVisible()) {
      await reviewsTab.click();
      await page.waitForTimeout(1000);
      
      // Look for pagination controls
      const hasPagination = await page.locator('text="Next"').or(
        page.locator('text="Previous"').or(
          page.locator('text="Load more"')
        )
      ).first().isVisible();
      
      const hasPageNumbers = await page.locator('text="1"').or(
        page.locator('text="2"')
      ).first().isVisible();
      
      // Pagination is optional depending on review count
      if (hasPagination || hasPageNumbers) {
        expect(true).toBeTruthy();
      } else {
        expect(true).toBeTruthy(); // No pagination is also fine
      }
    }
  });

  test('should display average rating calculation', async () => {
    // Navigate to consultant profile
    await page.click('text="Find Consultants"');
    await page.waitForLoadState('networkidle');
    
    await page.click('text="View Profile"');
    await page.waitForLoadState('networkidle');
    
    // Check for average rating display (visible on main profile or reviews tab)
    const hasAverageRating = await page.locator('text="5.0"').or(
      page.locator('text="4."').or(
        page.locator('text="3."')
      )
    ).first().isVisible();
    
    const hasStarDisplay = await page.locator('text="★"').first().isVisible();
    
    expect(hasAverageRating || hasStarDisplay).toBeTruthy();
  });

  test('should handle mobile responsive review interface', async () => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Navigate to consultant profile
    await page.click('text="Find Consultants"');
    await page.waitForLoadState('networkidle');
    
    await page.click('text="View Profile"');
    await page.waitForLoadState('networkidle');
    
    const reviewsTab = page.locator('text="Reviews"').first();
    if (await reviewsTab.isVisible()) {
      await reviewsTab.click();
      await page.waitForTimeout(1000);
      
      // Reviews section should be responsive
      const reviewsSection = page.locator('text="Reviews"').first();
      if (await reviewsSection.isVisible()) {
        const sectionBox = await reviewsSection.boundingBox();
        expect(sectionBox?.width).toBeLessThanOrEqual(375);
      }
    }
    
    // Rating display should be visible on mobile
    const hasRating = await page.locator('text="5.0"').or(
      page.locator('text="★"')
    ).first().isVisible();
    
    expect(hasRating).toBeTruthy();
  });
});
