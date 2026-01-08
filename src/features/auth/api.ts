import { authApi } from '@/api/client';
import type { LoginBodyDto, MyUserWithTokensDto, TokensDto, RefreshTokenDto } from './types';

export const login = async (data: LoginBodyDto): Promise<MyUserWithTokensDto> => {
  const response = await authApi.post<MyUserWithTokensDto>('/auth/login', data);
  return response.data;
};

export const refreshToken = async (data: RefreshTokenDto): Promise<TokensDto> => {
  const response = await authApi.post<TokensDto>('/auth/refresh', data);
  return response.data;
};
