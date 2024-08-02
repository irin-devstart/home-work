import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import router from './router';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './common';
import { AxiosUtilsService } from './services';
import { UserProvider } from '@contexts/';
const queryClient = new QueryClient();
AxiosUtilsService();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </ThemeProvider>
  </QueryClientProvider>
);
