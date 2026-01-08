import { createTheme, type ThemeOptions } from "@mui/material/styles";
import { lightTokens, darkTokens } from "./tokens";

const createAppTheme = (tokens: typeof lightTokens): ThemeOptions => ({
  typography: {
    fontFamily:
      '"Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      letterSpacing: "-0.02em",
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
      letterSpacing: "-0.01em",
      lineHeight: 1.3,
    },
    h3: { fontSize: "1.75rem", fontWeight: 600, lineHeight: 1.4 },
    h4: { fontSize: "1.5rem", fontWeight: 600, lineHeight: 1.4 },
    h5: { fontSize: "1.25rem", fontWeight: 600, lineHeight: 1.5 },
    h6: { fontSize: "1rem", fontWeight: 600, lineHeight: 1.5 },
    subtitle1: { fontSize: "1rem", fontWeight: 500, lineHeight: 1.5 },
    subtitle2: { fontSize: "0.875rem", fontWeight: 500, lineHeight: 1.57 },
    body1: { fontSize: "1rem", fontWeight: 400, lineHeight: 1.5 },
    body2: { fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.57 },
    button: { textTransform: "none", fontWeight: 600, fontSize: "0.875rem" },
    caption: { fontSize: "0.75rem", fontWeight: 400, lineHeight: 1.66 },
    overline: {
      fontSize: "0.75rem",
      fontWeight: 600,
      letterSpacing: "0.5px",
      textTransform: "uppercase",
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 4,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: tokens.colors.background,
          color: tokens.colors.textPrimary,
          transition: `background-color 200ms cubic-bezier(0.4, 0, 0.2, 1), color 200ms cubic-bezier(0.4, 0, 0.2, 1)`,
        },
        "*::-webkit-scrollbar": {
          width: "8px",
          height: "8px",
        },
        "*::-webkit-scrollbar-track": {
          backgroundColor: tokens.colors.background,
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: tokens.colors.border,
          borderRadius: "4px",
          "&:hover": {
            backgroundColor: tokens.colors.textSecondary,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: tokens.radius.md,
          boxShadow: "none",
          padding: "10px 16px",
          fontWeight: 600,
          transition: `all ${tokens.transitions.fast}`,
          "&:hover": {
            boxShadow: tokens.shadows.md,
            transform: "translateY(-2px)",
          },
          "&:active": {
            transform: "translateY(0)",
          },
        },
        containedPrimary: {
          backgroundImage: `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.primaryDark} 100%)`,
          color: "#FFFFFF",
          "&:hover": {
            backgroundImage: `linear-gradient(135deg, ${tokens.colors.primaryDark} 0%, ${tokens.colors.primaryDark} 100%)`,
          },
        },
        outlinedPrimary: {
          borderColor: tokens.colors.primary,
          color: tokens.colors.primary,
          "&:hover": {
            borderColor: tokens.colors.primaryDark,
            backgroundColor: `${tokens.colors.primary}08`,
          },
        },
        textPrimary: {
          color: tokens.colors.primary,
          "&:hover": {
            backgroundColor: `${tokens.colors.primary}08`,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: tokens.radius.lg,
          boxShadow: tokens.shadows.sm,
          backgroundColor: tokens.colors.surface,
          border: `1px solid ${tokens.colors.border}`,
          transition: `all ${tokens.transitions.base}`,
          "&:hover": {
            boxShadow: tokens.shadows.md,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: tokens.shadows.sm,
          borderBottom: `1px solid ${tokens.colors.border}`,
          backgroundColor: tokens.colors.surface,
          color: tokens.colors.textPrimary,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: tokens.colors.surface,
          borderRight: `1px solid ${tokens.colors.border}`,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: tokens.colors.background,
            transition: `all ${tokens.transitions.fast}`,
            "&:hover": {
              backgroundColor: tokens.colors.surfaceHover,
            },
            "&.Mui-focused": {
              backgroundColor: tokens.colors.surface,
            },
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          transition: `all ${tokens.transitions.fast}`,
          "&:hover": {
            backgroundColor: `${tokens.colors.primary}08`,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: tokens.radius.md,
          fontWeight: 500,
        },
      },
    },
  },
});

export const lightTheme = createTheme({
  ...createAppTheme(lightTokens),
  palette: {
    mode: "light",
    primary: {
      main: lightTokens.colors.primary,
      light: lightTokens.colors.primaryLight,
      dark: lightTokens.colors.primaryDark,
      contrastText: "#ffffff",
    },
    secondary: {
      main: lightTokens.colors.secondary,
      light: lightTokens.colors.secondaryLight,
      dark: lightTokens.colors.secondaryDark,
      contrastText: "#ffffff",
    },
    success: {
      main: lightTokens.colors.success,
    },
    warning: {
      main: lightTokens.colors.warning,
    },
    error: {
      main: lightTokens.colors.error,
    },
    info: {
      main: lightTokens.colors.info,
    },
    background: {
      default: lightTokens.colors.background,
      paper: lightTokens.colors.surface,
    },
    text: {
      primary: lightTokens.colors.textPrimary,
      secondary: lightTokens.colors.textSecondary,
    },
    divider: lightTokens.colors.border,
  },
});

export const darkTheme = createTheme({
  ...createAppTheme(darkTokens),
  palette: {
    mode: "dark",
    primary: {
      main: darkTokens.colors.primary,
      light: darkTokens.colors.primaryLight,
      dark: darkTokens.colors.primaryDark,
      contrastText: "#ffffff",
    },
    secondary: {
      main: darkTokens.colors.secondary,
      light: darkTokens.colors.secondaryLight,
      dark: darkTokens.colors.secondaryDark,
      contrastText: "#ffffff",
    },
    success: {
      main: darkTokens.colors.success,
    },
    warning: {
      main: darkTokens.colors.warning,
    },
    error: {
      main: darkTokens.colors.error,
    },
    info: {
      main: darkTokens.colors.info,
    },
    background: {
      default: darkTokens.colors.background,
      paper: darkTokens.colors.surface,
    },
    text: {
      primary: darkTokens.colors.textPrimary,
      secondary: darkTokens.colors.textSecondary,
    },
    divider: darkTokens.colors.border,
  },
});
