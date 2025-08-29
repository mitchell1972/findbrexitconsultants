# Testing Guide

## Running Playwright E2E Tests

This project supports running tests in both development and production environments.

### Test Commands

#### Default Testing (Auto-detects Environment)
```bash
# Runs against localhost:3000 with auto-started dev server
pnpm test:e2e
```

#### Development Environment
```bash
# Explicitly run against local development server
pnpm test:e2e:dev

# Run with UI interface for debugging
pnpm test:e2e:ui:dev
```

#### Production Environment
```bash
# Run against production URL
pnpm test:e2e:prod
```

#### Interactive Testing
```bash
# Run with Playwright UI (uses default environment)
pnpm test:e2e:ui

# View test results
pnpm test:e2e:report
```

### Environment Variables

You can control the testing environment using these variables:

- `PLAYWRIGHT_BASE_URL`: Primary URL for tests
- `BASE_URL`: Fallback URL if PLAYWRIGHT_BASE_URL is not set
- `CI`: Set to `true` in CI environments (auto-detected)

### Environment Behavior

1. **Default Behavior** (no env vars set):
   - Tests run against `http://localhost:3000`
   - Dev server automatically starts before tests
   - Dev server reuses existing instance if already running

2. **Development Environment**:
   - Set `PLAYWRIGHT_BASE_URL=http://localhost:3000`
   - Dev server starts automatically
   - Fast feedback loop for development

3. **Production Environment**:
   - Set `PLAYWRIGHT_BASE_URL=https://FindBrexitConsultants.co.uk`
   - No dev server started
   - Tests run against live production site

4. **CI Environment**:
   - Automatically detected via `CI=true`
   - Optimized for CI performance (single worker, retries enabled)
   - No server reuse

### Test Structure

- **240 total tests** across 4 test files:
  - `tests/auth.spec.ts` - Authentication and business registration
  - `tests/consultant-profile.spec.ts` - Consultant profile pages
  - `tests/quote-request.spec.ts` - Quote request functionality
  - `tests/review-submission.spec.ts` - Review submission features

- **5 browsers tested**:
  - Desktop: Chrome, Firefox, Safari
  - Mobile: Chrome (Pixel 5), Safari (iPhone 12)

### Troubleshooting

If tests fail due to missing browsers:
```bash
pnpm exec playwright install
```

If dev server fails to start:
```bash
# Check if port 3000 is available
netstat -tulpn | grep :3000

# Kill existing processes if needed
pkill -f "vite"
```
