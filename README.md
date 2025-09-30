# Game of Life — TDD with JavaScript and Jest

A practical, test-driven implementation of Conway’s Game of Life, starting from the engine rules to a minimal browser UI, with Jest as the testing framework and jsdom for DOM-focused tests.

### Why this project
- Practice disciplined TDD: write a failing test, make it pass, then refactor, repeatedly.
- Build a clean, modular engine that’s easy to extend to a UI or microfrontend later.
- Keep the feedback loop tight with watch mode and coverage to ensure confidence in changes.

## Prerequisites

- Node.js v18+ recommended (v8.4+ minimum noted historically; modern LTS preferred for Jest ecosystem).
- npm or yarn installed.
- VS Code or similar IDE with Jest and ESLint extensions suggested.
- Modern browser (Chrome/Firefox/Edge) for demo page.

## Project structure

- src/
  - game.js — core rules and utilities (pure functions)
  - ui.js — DOM bindings and rendering helpers (browser demo)
- src/__tests__/
  - game.spec.js — unit tests for rules
  - ui.spec.js — integration-like tests with jsdom
- public/
  - index.html — minimal grid and controls (Play/Pause/Step/Reset)
  - styles.css — simple grid styling
- jest.config.(js|mjs|cjs) — Jest configuration with jsdom testEnvironment
- package.json — scripts and dependencies.

## Quick start

- Install dependencies:
  - npm install
- Run tests once:
  - npm test
- Watch tests:
  - npm run test:watch
- Coverage:
  - npm run test:coverage
- Open demo (simple static file server examples):
  - npm run dev (if configured) or open public/index.html with a live server extension.

## Scripts

- test: Runs the full suite once.
- test:watch: Runs Jest in watch mode for TDD workflow.
- test:coverage: Generates coverage reports to ./coverage.
- dev: Optional script to serve public/ for quick UI checks (e.g., using serve/http-server).

Example package.json snippets:
- "test": "jest"
- "test:watch": "jest --watch"
- "test:coverage": "jest --coverage"
- "dev": "npx serve public -l 5173".

## TDD workflow

1. Write the smallest failing test (red) focusing on a single rule or behavior.
2. Implement the minimal code to pass it (green).
3. Refactor to remove duplication and clarify intent while keeping tests green.

This project favors “AAA” test structure (Arrange, Act, Assert) and uses toBe/toEqual appropriately (primitives vs deep equality).

## Game rules

- Any live cell with fewer than two live neighbours dies (underpopulation).
- Any live cell with two or three live neighbours lives on.
- Any live cell with more than three live neighbours dies (overpopulation).
- Any dead cell with exactly three live neighbours becomes a live cell (reproduction).

The engine exposes a pure function such as:
- isAlive(currentState, neighborCount) → 0|1
- next(grid) → newGrid (no mutation).

## Example: starting tests

- Simple rule tests:
  - expect(isAlive(0, 0)).toBe(0)
  - expect(isAlive(0, 3)).toBe(1)
  - expect(isAlive(1, 2)).toBe(1)
  - expect(isAlive(1, 4)).toBe(0).
- Grid progression:
  - Given a small seed, next(grid) should produce the known next generation (e.g., blinker).

## DOM tests (jsdom)

- ui.spec.js uses the jsdom environment to simulate document/window, verifying:
  - Rendering of a grid from state arrays.
  - Interaction of controls (Start/Stop/Step).
  - The engine is decoupled from the DOM (pure, testable core).

## Code style and design

- Keep the engine framework-agnostic to enable portability to React or microfrontends later (single-spa friendly).
- Prefer pure functions and immutable updates in the engine for deterministic tests.
- Keep DOM manipulation and state timing (requestAnimationFrame or setInterval) in ui.js.

## Extending the project

- TypeScript: Introduce type declarations and strict mode for safer refactors without changing the TDD cadence.
- React UI: Wrap the engine with a React component and test with React Testing Library for stateful UI behaviors.
- Performance: Add benchmarks or property-based tests for larger grids and rule invariants.
- Patterns: Add presets (glider, pulsar) and snapshot tests for known evolutions.

## Troubleshooting

- Jest fails to find DOM globals: ensure testEnvironment: "jsdom" is set in jest.config.
- Flaky DOM timers: prefer fake timers (jest.useFakeTimers()) and drive time deterministically in tests.
- Coverage excludes public/: only source files in src/ are instrumented; ensure correct collectCoverageFrom in config.

## References

- Jest docs for expect, mocks, spies, and jsdom environment.
- Accessibility-first testing with Testing Library for future React UI layers.
- Clean, incremental refactors encouraged by a watch-and-refactor cycle common in VS Code workflows.
