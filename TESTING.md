# Testing Guide

Tests make vibe coding safe. Without tests, you move fast and break things silently. With tests, you move fast and keep confidence high.

## Framework

- Runner: `vitest`
- DOM testing: `@testing-library/react`
- Environment: `jsdom`

## Run Tests

```bash
npm run test
```

## Test Layers

- Unit tests: pure helpers and storage logic (`src/**/*.test.ts`)
- Component tests: user interactions and rendering behavior (`src/**/*.test.tsx`)
- Integration/E2E: add later when multi-page flows or backend APIs are introduced

## Conventions

- Name test files as `*.test.ts` or `*.test.tsx`
- Prefer behavioral assertions over implementation details
- Include edge cases for invalid input and storage failures
