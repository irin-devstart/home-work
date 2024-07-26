import { Box, Paper, Stack } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <Stack
        direction='column'
        flexBasis={{
          xs: '100%',
          md: '25%'
        }}
      >
        <Paper>
          <Outlet />
        </Paper>
      </Stack>
    </Box>
  );
};

export default AuthLayout;
