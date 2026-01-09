# Livee Frontend Web

A modern, professional React + TypeScript + Vite admin console application. Built with clean architecture, SOLID principles, and best practices for enterprise-level frontend development.

**Platform:** Modern management interface for the Livee ecosystem
**Target Users:** System administrators and business operators

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Configuration](#environment-configuration)
- [Development](#development)
- [Linting & Code Quality](#linting--code-quality)
- [Pre-commit Hooks](#pre-commit-hooks)
- [Architecture](#architecture)
- [Technologies](#-technologies)
- [Contributing](#-contributing)

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9+ or **pnpm** v8+

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Liveeapp/livee-frontend-web.git
   cd livee-frontend-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your local configuration.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (http://localhost:5173) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint checks |
| `npm run lint:fix` | Fix ESLint issues automatically |
| `npm run type-check` | TypeScript type checking |

## 📁 Project Structure

```
src/
├── api/                              # API Layer
│   ├── client.ts                    # Axios instances with interceptors
│   ├── queryClient.ts               # React Query/TanStack Query config
│   └── services/                    # Service layer (dependency injection)
│       ├── interfaces.ts            # Service contracts
│       ├── implementation.ts        # Service implementations
│       └── index.ts
├── app/                              # Application Root
│   ├── providers.tsx                # Context providers & wrappers
│   └── routes.tsx                   # Route configuration
├── features/                         # Feature Modules
│   ├── auth/                        # Authentication
│   │   ├── api.ts
│   │   ├── hooks.ts
│   │   ├── store.ts                # Zustand store
│   │   ├── types.ts
│   │   ├── components/
│   │   │   └── ProtectedRoutes.tsx
│   │   └── pages/
│   │       └── LoginPage.tsx
│   ├── business/                    # Business Management
│   │   ├── api.ts
│   │   ├── hooks.ts
│   │   ├── types.ts
│   │   ├── utils.ts
│   │   ├── components/
│   │   │   ├── AvatarIcon.tsx
│   │   │   ├── BranchList.tsx
│   │   │   ├── GradientBox.tsx
│   │   │   ├── StatusBadge.tsx
│   │   │   ├── TableHeaderCell.tsx
│   │   │   └── index.ts
│   │   └── pages/
│   │       └── BusinessListPage.tsx
│   ├── branches/                    # Branch Management
│   │   └── ...
│   ├── dashboard/                   # Dashboard
│   │   ├── components/
│   │   │   ├── ChartSection.tsx
│   │   │   ├── ProgressCard.tsx
│   │   │   ├── StatCard.tsx
│   │   │   └── index.ts
│   │   └── pages/
│   │       └── DashboardPage.tsx
│   ├── home/                        # Home Page
│   │   └── pages/
│   │       └── HomePage.tsx
│   └── profile/                     # User Profile
│       └── pages/
│           └── ProfilePage.tsx
├── shared/                           # Shared Utilities & Components
│   ├── config/
│   │   └── env.ts                  # Environment validation
│   ├── constants/
│   │   ├── appConstants.ts         # App-wide constants
│   │   └── index.ts
│   ├── layout/                     # Layout Components
│   │   ├── MainLayout.tsx
│   │   ├── Sidebar.tsx
│   │   └── TopBar.tsx
│   ├── ui/                         # Design System
│   │   ├── theme.ts                # Material-UI theme
│   │   ├── tokens.ts               # Design tokens
│   │   └── uiStore.ts              # UI state (Zustand)
│   └── utils/                      # Utilities
│       ├── errors.ts               # Error handling
│       └── index.ts
├── App.tsx                          # Root component
└── main.tsx                         # Entry point
```

## 🔧 Environment Configuration

All environment variables must be prefixed with `VITE_` to be exposed by Vite.

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_AUTH_API_URL` | Authentication service endpoint | `http://localhost:3001` |
| `VITE_ADMIN_API_URL` | Admin service endpoint | `http://localhost:3008` |

### Optional Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_APP_NAME` | `Livee` | Application name |
| `VITE_APP_ENV` | `development` | Environment type |
| `VITE_ENABLE_DEVTOOLS` | `false` | Enable React Query DevTools |

### Example `.env` File

```bash
# API Endpoints
VITE_AUTH_API_URL=http://localhost:3001
VITE_ADMIN_API_URL=http://localhost:3008

# App Settings
VITE_APP_NAME=Livee Console
VITE_APP_ENV=development
VITE_ENABLE_DEVTOOLS=true
```

## 💻 Development

### Start Development Server

```bash
npm run dev
```

Access the application at **http://localhost:5173**

#### Features
- ⚡ Hot Module Replacement (HMR) - instant updates
- 🔍 TypeScript strict mode
- 📊 React Query DevTools (in development)
- 🌓 Dark mode support
- 🎨 Material-UI theming

## 🎯 Linting & Code Quality

### ESLint Configuration

Configured with:
- JavaScript best practices
- TypeScript recommended rules
- React hooks linting
- React refresh plugin
- Modern styling best practices

### Running Quality Checks

```bash
# Check for errors
npm run lint

# Fix auto-fixable issues
npm run lint:fix

# Type checking
npm run type-check
```

## 🪝 Pre-commit Hooks

Uses **Husky** and **lint-staged** to run quality checks on staged files before commits.

### Automatic Checks

1. ✅ **ESLint** - Lints and fixes TypeScript/React files
2. ✅ **TypeScript** - Type checking on modified files

If checks fail, fix issues and retry.

### Manual Setup

```bash
npm install
npm run prepare
```

### Bypass Hooks (Not Recommended)

```bash
git commit --no-verify
```

## 🏗️ Architecture

### Design Principles

The project follows **SOLID principles** and clean architecture:

#### Single Responsibility (SRP)
Each module has a single, well-defined responsibility

#### Open/Closed (OCP)
Open for extension via service interfaces, closed for modification

#### Liskov Substitution (LSP)
Service implementations are interchangeable via contracts

#### Interface Segregation (ISP)
Services expose only necessary methods

#### Dependency Inversion (DIP)
Services depend on abstractions, not concrete implementations

### Layered Architecture

```
┌──────────────────────────┐
│    UI Layer              │
│  (Components/Pages)      │
├──────────────────────────┤
│   Feature Layer          │
│  (Hooks/State/Utils)     │
├──────────────────────────┤
│   Service Layer          │
│  (API Interfaces)        │
├──────────────────────────┤
│   HTTP Client            │
│  (Axios + Interceptors)  │
└──────────────────────────┘
```

### State Management

- **Zustand** - Client state (auth, UI)
- **React Query** - Server state & caching
- **Local Storage** - Persisted state

### Error Handling

- Type-safe error utilities in `src/shared/utils/errors.ts`
- Custom error classes for different error types
- Error type guards (`isAuthError()`, `isValidationError()`, etc.)

## 📚 Technologies

### Core
- **React** 19 - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **React Router** v7 - Routing

### State Management
- **React Query/TanStack Query** - Server state
- **Zustand** - Client state
- **Local Storage** - Persistence

### UI & Styling
- **Material-UI (MUI)** - Component library
- **Emotion** - CSS-in-JS
- **Framer Motion** - Animations

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Type checking
- **Husky** - Git hooks
- **lint-staged** - Staged file linting

### HTTP & API
- **Axios** - HTTP client
- **Interceptors** - Request/response handling

## 🤝 Contributing

### Guidelines

1. Follow the established project structure
2. Write strict TypeScript with no `any` types
3. Pass ESLint and TypeScript checks before committing
4. Use meaningful commit messages
5. Keep components and services small (SRP)

### Code Standards

- **Components**: Focused on UI, minimal logic
- **Hooks**: Encapsulate feature logic
- **Services**: API communication abstraction
- **Types**: Comprehensive type definitions

## 📄 License

Proprietary - All rights reserved (2026)

---

**Documentation**: For API details, see the service interfaces in `src/api/services/interfaces.ts`

**Support**: Contact the development team for questions or issues.

