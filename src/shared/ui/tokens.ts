/**
 * Design Tokens for consistent theming
 * CTO Level: High-precision colors, vibrant gradients, and premium aesthetics.
 */

export const lightTokens = {
  colors: {
    primary: "#6366F1", // Indigo
    primaryLight: "#818CF8",
    primaryDark: "#4F46E5",
    secondary: "#EC4899", // Pink
    secondaryLight: "#F471B5",
    secondaryDark: "#DB2777",
    success: "#10B981", // Emerald
    successLight: "#34D399",
    warning: "#F59E0B", // Amber
    warningLight: "#FBBF24",
    error: "#EF4444", // Rose
    errorLight: "#F87171",
    info: "#3B82F6", // Blue
    infoLight: "#60A5FA",
    background: "#F1F5F9", 
    surface: "#FFFFFF",
    surfaceHover: "rgba(99, 102, 241, 0.04)",
    textPrimary: "#0F172A", 
    textSecondary: "#475569", 
    textTertiary: "#94A3B8", 
    border: "#E2E8F0", 
    shadow: "rgba(0, 0, 0, 0.05)",
  },
  gradients: {
    primary: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
    secondary: "linear-gradient(135deg, #EC4899 0%, #F43F5E 100%)",
    success: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
    warning: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
    error: "linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)",
    info: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
    surface: "linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 1) 100%)",
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    soft: "0 12px 24px -4px rgba(0, 0, 0, 0.04)",
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
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
  },
  transitions: {
    fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
    base: "250ms cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "400ms cubic-bezier(0.4, 0, 0.2, 1)",
  },
};
