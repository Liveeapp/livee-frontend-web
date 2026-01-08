/**
 * Concrete API Service Implementations
 */

import type { AxiosInstance } from "axios";
import { authApi, adminApi } from "@/api/client";
import type {
  IAuthApiService,
  IAdminApiService,
  IApiServiceFactory,
} from "./interfaces";

/**
 * Auth API Service Implementation
 */
class AuthApiService implements IAuthApiService {
  client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  // Add specific auth methods here
  // Example:
  // async login(email: string, password: string) {
  //   return this.client.post('/auth/login', { email, password });
  // }
}

/**
 * Admin API Service Implementation
 */
class AdminApiService implements IAdminApiService {
  client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  // Add specific admin methods here
  // Example:
  // async getBusinesses() {
  //   return this.client.get('/admin/businesses');
  // }
}

/**
 * API Service Factory Implementation
 * Creates service instances with their respective API clients
 */
class ApiServiceFactory implements IApiServiceFactory {
  createAuthService(): IAuthApiService {
    return new AuthApiService(authApi);
  }

  createAdminService(): IAdminApiService {
    return new AdminApiService(adminApi);
  }
}

// Singleton instance
const apiServiceFactory = new ApiServiceFactory();

export {
  AuthApiService,
  AdminApiService,
  ApiServiceFactory,
  apiServiceFactory,
};
