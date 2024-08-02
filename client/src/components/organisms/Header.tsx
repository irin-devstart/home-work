import { DRAWER_WIDTH, webRoute } from '@common/constants';
import { useUser } from '@contexts/';
import {
  ExitToAppRounded,
  ExpandMore,
  Menu,
  Person,
  PersonRounded,
  SettingsRounded
} from '@mui/icons-material';
import {
  AppBar,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  styled
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import OptionsPopup, { OptionsPopupProps } from './OptionsPopup';
import { useOptionsPopup } from '@hooks';

interface HeaderProps {
  open: boolean;
  handleDrawer: () => void;
}

const StyledAppBar = styled(AppBar, {
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
  const navigate = useNavigate();
  const { user, removeUser } = useUser();

  const { id, handleClose, handleOpen, ...optionsPopupProps } =
    useOptionsPopup();

  const optionsList: OptionsPopupProps['options'] = [
    {
      key: 'profile',
      label: 'Profile',
      icon: <PersonRounded fontSize='small' />,
      onClick: () => console.log('Profile')
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: <SettingsRounded fontSize='small' />,
      onClick: () => console.log('Settings')
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <ExitToAppRounded fontSize='small' />,
      onClick: () => {
        removeUser();
        navigate(webRoute.auth.login);
      }
    }
  ];

  return (
    <StyledAppBar position='fixed' open={open} color='secondary' elevation={1}>
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
          Welcome
        </Typography>

        <Stack direction='row' alignItems='center' gap={1}>
          <Person />
          <Typography variant='h6'>{user.name}</Typography>
          <IconButton color='inherit' onClick={(event) => handleOpen(event, 0)}>
            <ExpandMore />
          </IconButton>
        </Stack>
      </Toolbar>
      <OptionsPopup
        {...optionsPopupProps}
        options={optionsList}
        onClose={handleClose}
        sx={{
          marginTop: '1.2em'
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      />
    </StyledAppBar>
  );
};

export default Header;
