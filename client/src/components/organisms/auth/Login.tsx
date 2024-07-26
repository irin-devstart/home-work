import { WebRoute } from '@common/constants';
import { Link } from '@components/atoms';
import { Button, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  return (
    <Stack flex={1} flexDirection='column' gap={1.5}>
      <TextField label='Alamat Email' required fullWidth />
      <TextField label='Kata Sandi' required fullWidth />
      <Link to={WebRoute.auth.forget}>
        <Typography
          variant='subtitle1'
          align='right'
          color='primary'
          fontWeight={600}
        >
          Lupa kata sandi?
        </Typography>
      </Link>

      <Button onClick={() => navigate(WebRoute.home.index)}>Masuk</Button>
    </Stack>
  );
};

export default Login;
