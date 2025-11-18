# Ride Advisor - Frontend

Frontend application for Ride Advisor, built with React, TypeScript, and modern web technologies.

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TanStack Router** - Type-safe routing with auto-generated route tree
- **TanStack Query** - Server state management
- **Mantine** - UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

## Architecture

This project follows the **Layered Architecture** pattern with three distinct layers:

### Layers

1. **View Layer**: Presentation and user interactions (components, hooks)
2. **Domain Layer**: Business logic (entities, repositories interfaces, factories)
3. **Infrastructure Layer**: Data persistence and external services (API clients, repository implementations)

### Data Flow

```
API → api → query → useUseCaseQuery → Presenter
API → api → mutation → useUseCaseMutation → Presenter
API → service → Presenter
```

### Module Structure

Each module follows this organization:

```
modules/
  {module-name}/
    application/        # View layer
      components/       # React components
      hooks/           # Custom hooks
      mutations/       # TanStack Query mutations
      queries/         # TanStack Query queries
      utils/           # Utilities
    domain/            # Domain layer
      {entity}.domain.ts
      {entity}.factory.ts
      {entity}.repository.ts
    infrastructure/    # Infrastructure layer
      stub-{entity}.repository.ts
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm

### Installation

```bash
pnpm install
```

### Development

Start the development server:

```bash
pnpm dev
```

The app will be available at `http://localhost:5173`

### Build

Build for production:

```bash
pnpm build
```

Preview production build:

```bash
pnpm preview
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm typecheck` - Run TypeScript type checking

## Code Style and Conventions

### General Principles

- Write TypeScript with proper typing (avoid `any`)
- Use functional programming patterns; avoid classes
- Prefer iteration and modularization over code duplication
- Use descriptive variable names with auxiliary verbs (`isLoading`, `hasError`)
- Use named exports; avoid default exports
- Structure files logically: logic, component, types, styles

### Naming Conventions

- Variables and functions: `camelCase` (`searchResults`, `fetchData`)
- React components: `PascalCase` (`DashboardMenu`, `GearList`)
- Props types: `PascalCase` ending with `Props` (`DashboardMenuProps`)
- Files: Named according to their main export
  - Components: `DashboardMenu.tsx`
  - Logic: `dashboardLogic.ts`
  - Styles: `Dashboard.scss`
- Avoid generic names like `index.ts`, `styles.css`

### Project Structure

- API contracts: shared package (ts-rest)
- API calls: `*.api.ts` in module's infrastructure folder
- Queries: `*.query.ts` in module's infrastructure folder
- Custom hooks: Use TanStack Query hooks, prefixed with `use` (`useQueryGears`, `useMutationCreateGear`)

## Dependency Injection

The project uses a simple dependency injection pattern via React Context:

```tsx
import { useDependencies } from "@/modules/di";

const { gearRepository } = useDependencies();
```

Repositories are configured in `modules/di/depencies.tsx`.

## Path Aliases

The `@` alias points to the `src` directory:

```typescript
import { Component } from "@/components/Component";
import { useDependencies } from "@/modules/di";
```

## UI Components

This project uses **Mantine** as the primary design system. Refer to the [Mantine documentation](https://mantine.dev/) for component usage.

## Contributing

- Prioritize maintainability over development speed
- Keep data layer separate from view hierarchy
- Write clear, understandable code
- Think data first, implement views second
- Don't write comments in code (code should be self-documenting)
- Don't use `any` types - use placeholders to create TypeScript errors instead
