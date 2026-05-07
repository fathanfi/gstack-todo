# QA Report - localhost:3000 - 2026-05-07

- Mode: manual scenario QA
- Scope: Todo page (`/`)
- Scenarios: add, delete, toggle, refresh persistence, empty input, long text, mobile layout

## Baseline Findings

### ISSUE-001 (High) - Hydration mismatch on refresh
- Symptom: Next.js overlay shows `Hydration failed because the server rendered HTML didn't match the client`.
- Repro:
  1. Open app with existing todos in localStorage.
  2. Refresh `http://localhost:3000/`.
  3. Observe hydration error and Next issue badge.
- Impact: First render is unstable and the page re-renders client-side with a runtime error in dev.

## Fix Applied

- Commit: `8e6960d`
- Files:
  - `src/app/page.tsx`
  - `src/components/todo-app.tsx`
  - `src/app/page.test.tsx`
- Change:
  - Added a client-runtime render gate in `page.tsx` using `useSyncExternalStore`.
  - Moved todo UI/state logic into dedicated `todo-app` client component.
  - Updated page test target to validate todo behavior through `todo-app`.

## Verification After Fix

- Add todo: pass
- Delete todo: pass
- Toggle complete: pass
- Refresh persistence: pass
- Empty input: pass (no new item created)
- Long todo text: pass (truncated visually, no overflow)
- Mobile layout (375x812): pass (no functional regressions observed)
- Console/runtime: no hydration errors after fix

## Summary

QA found 1 issue, fixed 1, deferred 0.
