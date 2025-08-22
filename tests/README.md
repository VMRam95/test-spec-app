# Testing Documentation

## Overview

This project includes comprehensive testing coverage with unit tests, integration tests, and end-to-end (E2E) tests.

## Test Structure

```
tests/
├── unit/              # Unit tests for individual components and utilities
├── integration/       # Integration tests for component interactions
├── e2e/              # End-to-end tests using Playwright
└── setup.ts          # Test configuration and setup
```

## Running Tests

### Unit Tests (Vitest)

```bash
# Run all unit tests
npm run test:unit

# Run tests in watch mode
npm run test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### E2E Tests (Playwright)

```bash
# Run all E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run E2E tests in headed mode (see browser)
npm run test:e2e:headed

# Run specific test file
npx playwright test tests/e2e/landing-page.spec.ts
```

### Run All Tests

```bash
npm run test:all
```

## Test Coverage

### Unit Tests
- **Components**: Hero, ContactForm, Button, Card, ThemeProvider
- **Utilities**: Email validation, class names, date formatting, debounce, throttle
- **Coverage**: Form validation, user interactions, responsive behavior, dark mode

### Integration Tests
- Complete form submission flow
- Validation error handling and recovery
- Edge cases (long input, special characters, paste events)
- Performance testing (debouncing, multiple instances)

### E2E Tests
- **Acceptance Criteria**:
  - Page loads without errors
  - Form validates email correctly
  - All sections are responsive
  - Tailwind styles work properly
  - TypeScript has no errors

- **Features**:
  - Hero section with call-to-action
  - Features grid with icons
  - Contact form with email validation
  - Responsive design for mobile/desktop
  - Dark mode support

- **Non-functional Requirements**:
  - Performance testing (load times, optimization)
  - Accessibility (WCAG 2.1 AA compliance)
  - SEO optimization (meta tags, structured data)

## Test Configuration

### Vitest Configuration
- Environment: Happy DOM
- Coverage: V8 provider
- React Testing Library integration
- Path aliases support

### Playwright Configuration
- Browsers: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari
- Base URL: http://localhost:3000
- Screenshots on failure
- Trace on retry
- Parallel execution

## Writing New Tests

### Unit Test Example

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MyComponent } from '@/components/MyComponent'

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

### E2E Test Example

```typescript
import { test, expect } from '@playwright/test'

test('feature description', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toBeVisible()
})
```

## Debugging Tests

### Unit Tests
- Use `test.only()` to run a single test
- Use `console.log()` for debugging
- Use VS Code's debugger with breakpoints

### E2E Tests
- Use `--debug` flag: `npx playwright test --debug`
- Use `page.pause()` to pause execution
- Use `--headed` to see the browser

## CI/CD Integration

Tests are configured to run in CI environments:
- Unit tests run first for fast feedback
- E2E tests run against built application
- Coverage reports are generated
- Tests retry on failure in CI

## Accessibility Testing

We use axe-playwright for automated accessibility testing:
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader compatibility
- Color contrast validation

## Performance Testing

Basic performance metrics are tested:
- Page load time < 3 seconds
- Images have proper dimensions
- Lazy loading implementation
- Font optimization