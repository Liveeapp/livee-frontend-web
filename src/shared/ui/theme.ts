import { createTheme, type ThemeOptions } from "@mui/material/styles";
import { lightTokens as tokens } from "./tokens";

declare module "@mui/material/styles" {
  interface Theme {
    gradients: typeof tokens.gradients;
    customShadows: typeof tokens.shadows;
  }
  interface ThemeOptions {
    gradients?: typeof tokens.gradients;
    customShadows?: typeof tokens.shadows;
  }
  interface TypeText {
    tertiary: string;
  }
}

const themeOptions: ThemeOptions = {
  gradients: tokens.gradients,
  customShadows: tokens.shadows,
  typography: {
    fontFamily: '"Outfit", "Inter", sans-serif',
    h1: {
      fontSize: "3rem",
      fontWeight: 900,
      letterSpacing: "-0.04em",
      lineHeight: 1.1,
    },
    h2: {
      fontSize: "2.25rem",
      fontWeight: 800,
      letterSpacing: "-0.03em",
      lineHeight: 1.2,
    },
    h3: { fontSize: "1.875rem", fontWeight: 800, letterSpacing: "-0.02em" },
    h4: { fontSize: "1.5rem", fontWeight: 700 },
    h5: { fontSize: "1.25rem", fontWeight: 700 },
    h6: { fontSize: "1rem", fontWeight: 700 },
    subtitle1: { fontSize: "1rem", fontWeight: 600 },
    subtitle2: { fontSize: "0.875rem", fontWeight: 600 },
    body1: { fontSize: "1rem", fontWeight: 400, lineHeight: 1.6 },
    body2: { fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.6 },
    button: { textTransform: "none", fontWeight: 700, fontSize: "0.875rem" },
    caption: { fontSize: "0.75rem", fontWeight: 600 },
    overline: {
      fontSize: "0.75rem",
      fontWeight: 800,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
    },
  },
  shape: { borderRadius: 12 },
  palette: {
    mode: "light",
    primary: { main: tokens.colors.primary },
    secondary: { main: tokens.colors.secondary },
    success: { main: tokens.colors.success },
    warning: { main: tokens.colors.warning },
    error: { main: tokens.colors.error },
    info: { main: tokens.colors.info },
    background: {
      default: tokens.colors.background,
      paper: tokens.colors.surface,
    },
    text: {
      primary: tokens.colors.textPrimary,
      secondary: tokens.colors.textSecondary,
      tertiary: tokens.colors.textTertiary,
    },
    divider: tokens.colors.border,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: tokens.colors.background,
          color: tokens.colors.textPrimary,
          WebkitFontSmoothing: "antialiased",
          transition: "background-color 0.2s ease, color 0.2s ease",
        },
        "*::-webkit-scrollbar": { width: "6px", height: "6px" },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: tokens.colors.border,
          borderRadius: "10px",
          "&:hover": { backgroundColor: tokens.colors.primary },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "8px 16px",
          transition: "all 0.2s ease",
          "&:hover": { transform: "translateY(-1px)" },
          "&:active": { transform: "translateY(0)" },
        },
        containedPrimary: {
          background: tokens.gradients.primary,
          color: "#FFFFFF",
          "&:hover": {
            background: tokens.gradients.primary,
            filter: "brightness(1.1)",
          },
        },
        containedSecondary: {
          background: tokens.gradients.secondary,
          color: "#FFFFFF",
          "&:hover": {
            background: tokens.gradients.secondary,
            filter: "brightness(1.1)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: tokens.colors.surface,
          border: `1px solid ${tokens.colors.border}`,
          transition: "all 0.2s ease",
          backgroundImage: "none",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          backgroundImage: "none",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: tokens.colors.surface,
          borderRight: `1px solid ${tokens.colors.border}`,
          backgroundImage: "none",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            "& fieldset": { borderColor: tokens.colors.border },
            "&:hover fieldset": { borderColor: tokens.colors.primaryLight },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 700,
        },
      },
    },
  },
};

export const theme = createTheme(themeOptions);

// For backward compatibility during migration
export const lightTheme = theme;
