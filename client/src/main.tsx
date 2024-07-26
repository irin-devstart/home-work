import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import router from './router';
import { RouterProvider } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Theme } from './common';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    {/* <QueryClientProvider client={queryClient}> */}
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
    {/* </QueryClientProvider> */}
  </>
);
