/**
 * API Services
 * Abstraction layer for API operations following the Dependency Inversion Principle
 */

import type { AxiosInstance } from "axios";

/**
 * Base API service interface
 * All API services should implement this interface
 */
export interface IApiService {
  client: AxiosInstance;
}

/**
 * Auth API Service
 * Handles authentication-related API operations
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IAuthApiService extends IApiService {
  // Service placeholder - implement auth-specific methods here
  // Example: login(email: string, password: string)
  // Example: refreshToken(token: string)
}

/**
 * Admin API Service
 * Handles admin-related API operations
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IAdminApiService extends IApiService {
  // Service placeholder - implement admin-specific methods here
  // Example: getBusinesses()
  // Example: createBusiness(data: CreateBusinessDto)
}

/**
 * API Service Factory
 * Creates and manages API service instances
 */
export interface IApiServiceFactory {
  createAuthService(): IAuthApiService;
  createAdminService(): IAdminApiService;
}
