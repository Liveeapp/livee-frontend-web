import { useMutation } from '@tanstack/react-query';
import { login } from './api';
import { useAuthStore } from './store';
import { useNavigate } from 'react-router-dom';
import type { LoginBodyDto } from './types';

export const useLogin = () => {
  const setLogin = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginBodyDto) => login(data),
    onSuccess: (data) => {
      setLogin(data.user, data.tokens.accessToken, data.tokens.refreshToken);
      if (data.user.isAdmin) {
        navigate('/');
      } else {
        // Redirect unauthorized or non-admin users if needed
        console.warn('User is not admin');
      }
    },
  });
};
