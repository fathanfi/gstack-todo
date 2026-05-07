# TODOS

## P1

- [ ] Add a `TodoRepository` adapter boundary around persistence (localStorage today, swappable later).
  - Context: Deferred from `~/.gstack/projects/todo-gstack/ceo-plans/2026-05-07-todo-architecture.md`
  - Suggested shape: `src/lib/todo-repository.ts` with `load()` / `save()` implemented by localStorage adapter.

- [ ] Add lightweight observability hooks for todo actions and persistence failures.
  - Context: Deferred from `~/.gstack/projects/todo-gstack/ceo-plans/2026-05-07-todo-architecture.md`
  - Suggested shape: `src/lib/telemetry.ts` with `track(event, data)` no-op by default.

