# Livee Frontend Web

A modern React + TypeScript + Vite application with professional structure, state management, and development tooling. Built following SOLID principles and clean architecture patterns.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Configuration](#environment-configuration)
- [Development](#development)
- [Linting & Code Quality](#linting--code-quality)
- [Pre-commit Hooks](#pre-commit-hooks)
- [Architecture](#architecture)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd livee-frontend-web
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

Then edit `.env` with your local configuration (or use defaults for development).

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint to check code quality |
| `npm run lint:fix` | Run ESLint and automatically fix issues |
| `npm run type-check` | Run TypeScript type checking |
| `npm run preview` | Preview production build locally |

## 📁 Project Structure

```
src/
├── api/                          # API layer
│   ├── client.ts                # Axios instances with interceptors
│   ├── queryClient.ts           # React Query configuration
│   └── services/                # Service layer with dependency injection
│       ├── interfaces.ts        # Service interfaces (contracts)
│       ├── implementation.ts    # Service implementations
│       └── index.ts
├── app/                          # Application root
│   ├── providers.tsx            # AppProvider with all context providers
│   └── routes.tsx               # Application routes configuration
├── features/                     # Feature modules
│   ├── auth/                    # Authentication feature
│   │   ├── api.ts
│   │   ├── hooks.ts
│   │   ├── store.ts            # Zustand store
│   │   ├── types.ts
│   │   ├── components/
│   │   │   └── ProtectedRoutes.tsx
│   │   └── pages/
│   │       └── LoginPage.tsx
│   ├── business/               # Business feature
│   │   ├── api.ts
│   │   ├── hooks.ts
│   │   ├── types.ts
│   │   ├── components/
│   │   └── pages/
│   │       └── BusinessListPage.tsx
│   └── branches/               # Branches feature
├── shared/                       # Shared utilities and components
│   ├── config/
│   │   └── env.ts              # Environment variable validation
│   ├── constants/
│   │   ├── appConstants.ts     # App-wide constants
│   │   └── index.ts
│   ├── layout/                 # Layout components
│   ├── ui/                     # UI configuration
│   │   ├── theme.ts            # Material-UI theme
│   │   └── uiStore.ts          # UI state (Zustand)
│   └── utils/                  # Shared utilities
│       ├── errors.ts           # Error handling
│       └── index.ts
├── App.tsx                       # Root component
└── main.tsx                      # Application entry point
```

## 🔧 Environment Configuration

The application uses environment variables for configuration. All environment variables must be prefixed with `VITE_` to be exposed by Vite.

### Supported Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VITE_AUTH_API_URL` | ✓ | - | Authentication service base URL |
| `VITE_ADMIN_API_URL` | ✓ | - | Admin service base URL |
| `VITE_APP_NAME` | ✗ | `Livee` | Application name |
| `VITE_APP_ENV` | ✗ | `development` | Environment (`development`, `staging`, `production`) |
| `VITE_ENABLE_DEVTOOLS` | ✗ | `false` | Enable React Query DevTools in UI |

### Environment Files

- `.env` - Local development (not committed, created from .env.example)
- `.env.example` - Template for required variables
- `.env.production` - Production environment variables

### Example `.env` Setup

```bash
VITE_AUTH_API_URL=http://localhost:3001
VITE_ADMIN_API_URL=http://localhost:3008
VITE_APP_NAME=Livee
VITE_APP_ENV=development
VITE_ENABLE_DEVTOOLS=true
```

## 💻 Development

### Starting the Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173` with Hot Module Replacement (HMR) enabled.

### Development Features

- **Hot Module Replacement**: Code changes instantly reflect in the browser
- **Type Safety**: Full TypeScript support with strict mode
- **React Query DevTools**: Inspect React Query cache state (in development)
- **Dark Mode Support**: Toggle theme via UI store

## 🎯 Linting & Code Quality

### ESLint Configuration

The project uses ESLint with TypeScript support for code quality. Current configurations include:
- JavaScript best practices
- TypeScript recommended rules
- React hooks linting
- React refresh plugin

To expand ESLint with type-aware linting, see ESLint configuration in `eslint.config.js`.

### Running Linters

```bash
# Check for lint errors
npm run lint

# Fix auto-fixable lint errors
npm run lint:fix

# Type check without building
npm run type-check
```

## 🪝 Pre-commit Hooks

The project uses **Husky** for Git pre-commit hooks and **lint-staged** to run linters only on staged files.

### Automatic Code Quality on Commit

When you commit code, the following checks run automatically:

1. **ESLint**: Lints and fixes TypeScript/React files
2. **TypeScript**: Type checking on modified files

If checks fail, the commit is blocked. Fix issues and try again.

### Manual Hook Setup

If hooks don't work after cloning, run:

```bash
npm install
npm run prepare
```

### Bypassing Hooks (Not Recommended)

If necessary, bypass hooks with:

```bash
git commit --no-verify
```

However, this is discouraged as it bypasses quality checks.

## 🏗️ Architecture

### Design Patterns & Principles

The project follows **SOLID principles** and modern React best practices:

#### Single Responsibility Principle (SRP)
- Each module has one reason to change
- Services, hooks, and components have focused responsibilities

#### Open/Closed Principle (OCP)
- Code is open for extension via service interfaces
- Closed for modification through abstractions

#### Liskov Substitution Principle (LSP)
- Service implementations are interchangeable via interfaces
- API service factory ensures consistency

#### Interface Segregation Principle (ISP)
- `IAuthApiService` and `IAdminApiService` are specific, not generic
- Services expose only necessary methods

#### Dependency Inversion Principle (DIP)
- Services depend on abstractions (interfaces), not concrete implementations
- `ApiServiceFactory` manages dependency creation

### Layered Architecture

```
┌─────────────────────────────┐
│   UI Components             │
├─────────────────────────────┤
│   Features & Pages          │
├─────────────────────────────┤
│   Hooks & State (Zustand)   │
├─────────────────────────────┤
│   API Services              │
├─────────────────────────────┤
│   HTTP Client (Axios)       │
└─────────────────────────────┘
```

### API Layer

- **`src/api/client.ts`**: Raw Axios instances with interceptors for auth and error handling
- **`src/api/services/`**: High-level service interfaces and implementations
- **`src/api/queryClient.ts`**: React Query configuration with cache policies

### State Management

- **Zustand**: Simple, scalable state management for auth and UI state
- **React Query**: Server state management and caching
- **Local Storage**: Persisted state via Zustand middleware

### Error Handling

- **`src/shared/utils/errors.ts`**: Type-safe error handling utilities
- **`ApiErrorHandler`**: Custom error class for consistent error processing
- **Error type guards**: `isAuthError()`, `isValidationError()`, etc.

## 📚 Technologies

- **React 19**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **React Router v7**: Routing
- **React Query**: Server state management
- **Zustand**: Client state management
- **Material-UI**: Component library
- **Axios**: HTTP client
- **Husky**: Git hooks
- **lint-staged**: Staged file linting
- **ESLint**: Code linting
- **Emotion**: CSS-in-JS

## 🤝 Contributing

When contributing to this project:

1. Follow the established project structure
2. Write TypeScript with strict type checking
3. Ensure code passes ESLint and TypeScript checks
4. Use meaningful commit messages
5. Keep components and services focused (SRP)

## 📝 License

[Add license information]
