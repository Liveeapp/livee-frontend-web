/**
 * Application Constants
 * Central location for all application-wide constants
 */

// Route paths
export const ROUTES = {
  AUTH: {
    LOGIN: "/login",
  },
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    BUSINESSES: "/admin/businesses",
    PROFILE: "/admin/profile",
  },
  ROOT: "/",
} as const;

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    ME: "/auth/me",
  },
  ADMIN: {
    BUSINESSES: "/admin/businesses",
    BUSINESS: (id: string) => `/admin/businesses/${id}`,
  },
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  AUTH: "auth-storage",
  UI_THEME: "ui-theme",
  USER_PREFERENCES: "user-preferences",
} as const;

// Query cache times (in milliseconds)
export const CACHE_TIMES = {
  VERY_SHORT: 1 * 60 * 1000, // 1 minute
  SHORT: 5 * 60 * 1000, // 5 minutes
  MEDIUM: 15 * 60 * 1000, // 15 minutes
  LONG: 60 * 60 * 1000, // 1 hour
} as const;

// UI Constants
export const UI = {
  SIDEBAR_WIDTH: 250,
  TOPBAR_HEIGHT: 64,
  THEME_TRANSITION_DURATION: 300,
} as const;
