/**
 * Environment Configuration
 * Validates and provides type-safe access to environment variables
 */

interface EnvironmentConfig {
  authApiUrl: string;
  adminApiUrl: string;
  appName: string;
  appEnv: "development" | "production" | "staging";
  enableDevtools: boolean;
}

/**
 * Validate that required environment variables are set
 * Throws an error if any required variable is missing
 */
const validateEnv = (): void => {
  const required = ["VITE_AUTH_API_URL", "VITE_ADMIN_API_URL"];

  for (const key of required) {
    if (!import.meta.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }
};

/**
 * Get validated environment configuration
 * This should be called once at application startup
 */
export const getEnvConfig = (): EnvironmentConfig => {
  validateEnv();

  return {
    authApiUrl: import.meta.env.VITE_AUTH_API_URL || "http://localhost:3001",
    adminApiUrl: import.meta.env.VITE_ADMIN_API_URL || "http://localhost:3008",
    appName: import.meta.env.VITE_APP_NAME || "Livee",
    appEnv: (import.meta.env.VITE_APP_ENV || "development") as
      | "development"
      | "production"
      | "staging",
    enableDevtools: import.meta.env.VITE_ENABLE_DEVTOOLS === "true",
  };
};

export type { EnvironmentConfig };
