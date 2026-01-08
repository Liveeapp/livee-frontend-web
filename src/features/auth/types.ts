export interface LoginBodyDto {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  isBusinessUser: boolean;
  isAdmin: boolean;
  [key: string]: unknown;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface MyUserWithTokensDto {
  user: User;
  tokens: Tokens;
}

export interface RefreshTokenDto {
  refreshToken: string;
}

export interface TokensDto {
  accessToken: string;
  refreshToken: string;
}
