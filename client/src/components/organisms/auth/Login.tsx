import { webRoute } from '@common/constants';
import { Link } from '@components/atoms';
import { ButtonLoading } from '@components/molecules';
import { Stack, TextField, Typography } from '@mui/material';
import { UseMutationResult } from '@tanstack/react-query';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

interface LoginProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: UseFormReturn<LoginAuth, any, undefined>;
  login: UseMutationResult<Login, Error, LoginAuth, unknown>;
  onSubmit: () => void;
}
const Login = ({ state, login, onSubmit }: LoginProps) => {
  const { errors } = state.formState;
  return (
    <Stack flex={1} flexDirection='column' gap={2}>
      <TextField
        {...state.register('email')}
        label='Email Address'
        required
        fullWidth
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        {...state.register('password')}
        label='Password'
        required
        fullWidth
        type='password'
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <Link to={webRoute.auth.forget}>
        <Typography
          variant='subtitle1'
          align='right'
          color='primary'
          fontWeight={600}
        >
          Forgot Password?
        </Typography>
      </Link>

      <ButtonLoading onClick={onSubmit} isLoading={login.isPending}>
        Login
      </ButtonLoading>
    </Stack>
  );
};

export default Login;
