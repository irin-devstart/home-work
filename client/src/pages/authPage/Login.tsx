import { webRoute } from '@common/constants';
import { Login } from '@components/organisms';
import { AuthTemplate } from '@components/templates';
import { loginService } from '@service/AuthService';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '@validations/';
import { useUser } from '@contexts/';
const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const state = useForm<LoginAuth>({
    resolver: zodResolver(LoginSchema)
  });

  const login = useMutation({
    mutationFn: loginService,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      setUser(data.user);
      navigate(webRoute.home.index);
    },
    onError: () => {
      state.setError('password', { message: 'Email or Password is invalid' });
    }
  });

  const onSubmit = state.handleSubmit((data) => {
    login.mutate(data);
  });

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      onSubmit();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <AuthTemplate logoUrl='logoUrl' title='Please enter your details below'>
      <Login state={state} login={login} onSubmit={onSubmit} />
    </AuthTemplate>
  );
};

export default LoginPage;
