import { Box, Toolbar, Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header, SideBar } from '@components/organisms';
import { BACKGROUND } from '@common/constants/Colors';

const RootLayout = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <Box sx={{ display: 'flex' }}>
      <Header open={open} handleDrawer={() => setOpen((prev) => !prev)} />
      <SideBar open={open} handleDrawer={() => setOpen((prev) => !prev)} />
      <Box
        component='main'
        sx={{
          background: BACKGROUND,
          flexGrow: 1,
          minHeight: '100vh',
          maxHeight: '100vh',
          overflowX: 'scroll'
        }}
      >
        <Toolbar />

        <Container maxWidth={false}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default RootLayout;
