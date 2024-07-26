import { DRAWER_WIDTH } from '@common/constants';
import { ExpandMore, Menu, Person } from '@mui/icons-material';
import {
  AppBar,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  styled
} from '@mui/material';
import React from 'react';

interface HeaderProps {
  open: boolean;
  handleDrawer: () => void;
}

const AppBarStyle = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<Pick<HeaderProps, 'open'>>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));
const Header = ({ open, handleDrawer }: HeaderProps) => {
  return (
    <AppBarStyle position='fixed' open={open} color='secondary' elevation={1}>
      <Toolbar
        sx={{
          justifyContent: 'space-between'
        }}
      >
        <IconButton
          edge='start'
          color='inherit'
          aria-label='open drawer'
          onClick={handleDrawer}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' })
          }}
        >
          <Menu />
        </IconButton>
        <Typography variant='h6' noWrap sx={{ flexGrow: 1 }}>
          Selamat Datang!
        </Typography>

        <Stack direction='row' alignItems='center' gap={1}>
          <Person />
          <Typography variant='h6'>Irin Saputra</Typography>
          <IconButton color='inherit'>
            <ExpandMore />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBarStyle>
  );
};

export default Header;
