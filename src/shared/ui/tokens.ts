/**
 * Design Tokens for consistent theming
 */

export const lightTokens = {
  colors: {
    primary: "#2563EB",
    primaryLight: "#60A5FA",
    primaryDark: "#1D4ED8",
    secondary: "#7C3AED",
    secondaryLight: "#A78BFA",
    secondaryDark: "#5B21B6",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    info: "#3B82F6",
    background: "#F3F4F6",
    surface: "#FFFFFF",
    surfaceHover: "#F9FAFB",
    textPrimary: "#111827",
    textSecondary: "#6B7280",
    textTertiary: "#9CA3AF",
    border: "#E5E7EB",
    shadow: "rgba(0, 0, 0, 0.08)",
  },
  shadows: {
    sm: "0px 2px 4px rgba(0, 0, 0, 0.06)",
    md: "0px 4px 12px rgba(0, 0, 0, 0.08)",
    lg: "0px 12px 24px rgba(0, 0, 0, 0.1)",
    xl: "0px 20px 40px rgba(0, 0, 0, 0.12)",
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    xxl: "32px",
  },
  radius: {
    xs: "4px",
    sm: "6px",
    md: "8px",
    lg: "12px",
    xl: "16px",
  },
  transitions: {
    fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
    base: "200ms cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
  },
};

export const darkTokens = {
  colors: {
    primary: "#3B82F6",
    primaryLight: "#60A5FA",
    primaryDark: "#2563EB",
    secondary: "#A78BFA",
    secondaryLight: "#D8B4FE",
    secondaryDark: "#7C3AED",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    info: "#3B82F6",
    background: "#111827",
    surface: "#1F2937",
    surfaceHover: "#374151",
    textPrimary: "#F9FAFB",
    textSecondary: "#9CA3AF",
    textTertiary: "#6B7280",
    border: "#374151",
    shadow: "rgba(0, 0, 0, 0.24)",
  },
  shadows: {
    sm: "0px 2px 4px rgba(0, 0, 0, 0.24)",
    md: "0px 4px 12px rgba(0, 0, 0, 0.32)",
    lg: "0px 12px 24px rgba(0, 0, 0, 0.4)",
    xl: "0px 20px 40px rgba(0, 0, 0, 0.48)",
  },
  spacing: lightTokens.spacing,
  radius: lightTokens.radius,
  transitions: lightTokens.transitions,
};
