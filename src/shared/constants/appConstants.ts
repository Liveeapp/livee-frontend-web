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
    DASHBOARD: "/dashboard",
    BUSINESSES: "/businesses",
    PROFILE: "/profile",
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
  SIDEBAR_WIDTH: 280,
  TOPBAR_HEIGHT: 64,
  THEME_TRANSITION_DURATION: 300,
} as const;

// Business List Constants
export const BUSINESS_LIST = {
  PAGE_LIMIT: 20,
  STALE_TIME: 30000, // 30 seconds
  GC_TIME: 5 * 60 * 1000, // 5 minutes
} as const;

// Status Types
export const STATUS_TYPES = {
  APPROVED: "Approved",
  PENDING: "Pending",
  REJECTED: "Rejected",
} as const;
