/**
 * API Error Types and Utilities
 * Provides error handling abstractions for API operations
 */

import type { AxiosError } from "axios";

/**
 * Standard API error response structure
 */
export interface ApiError {
  statusCode: number;
  message: string;
  errors?: Record<string, string[]>;
  timestamp?: string;
}

/**
 * Custom error class for API-related errors
 */
export class ApiErrorHandler extends Error {
  public readonly statusCode: number;
  public readonly errors?: Record<string, string[]>;
  public readonly timestamp?: string;

  constructor(error: AxiosError<ApiError> | Error) {
    if (error instanceof Error && "response" in error) {
      const axiosError = error as AxiosError<ApiError>;
      const apiError = axiosError.response?.data;

      super(apiError?.message || axiosError.message || "An API error occurred");

      this.statusCode = axiosError.response?.status || 500;
      this.errors = apiError?.errors;
      this.timestamp = apiError?.timestamp;
    } else {
      super(error.message || "An unknown error occurred");
      this.statusCode = 500;
    }

    this.name = "ApiErrorHandler";
  }
}

/**
 * Handle API errors and transform them to a consistent format
 */
export const handleApiError = (error: unknown): ApiErrorHandler => {
  if (error instanceof ApiErrorHandler) {
    return error;
  }

  return new ApiErrorHandler(error as AxiosError<ApiError> | Error);
};

/**
 * Check if error is an authentication error
 */
export const isAuthError = (error: unknown): error is ApiErrorHandler => {
  return error instanceof ApiErrorHandler && error.statusCode === 401;
};

/**
 * Check if error is a validation error
 */
export const isValidationError = (error: unknown): error is ApiErrorHandler => {
  return error instanceof ApiErrorHandler && error.statusCode === 422;
};

/**
 * Check if error is a not found error
 */
export const isNotFoundError = (error: unknown): error is ApiErrorHandler => {
  return error instanceof ApiErrorHandler && error.statusCode === 404;
};

/**
 * Check if error is a server error
 */
export const isServerError = (error: unknown): error is ApiErrorHandler => {
  return error instanceof ApiErrorHandler && error.statusCode >= 500;
};
