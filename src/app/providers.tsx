import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { queryClient } from "@/api/queryClient";
import { lightTheme, darkTheme } from "@/shared/ui/theme";
import { useUIStore } from "@/shared/ui/uiStore";
import { getEnvConfig } from "@/shared/config/env";
import type { ReactNode } from "react";

const envConfig = getEnvConfig();

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const darkMode = useUIStore((state) => state.darkMode);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        {children}
        {envConfig.enableDevtools && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </ThemeProvider>
    </QueryClientProvider>
  );
};
