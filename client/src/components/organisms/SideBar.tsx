import { DRAWER_WIDTH, MenuList, PRIMARY, SECONDARY } from '@common/constants';
import { ChevronLeft } from '@mui/icons-material';
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  styled
} from '@mui/material';
import { Link } from '@components/atoms';

interface SideBarProps {
  open: boolean;
  handleDrawer: () => void;
}

const DrawerStyle = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    background: PRIMARY,
    whiteSpace: 'nowrap',
    width: DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(8)
      }
    })
  }
}));

const SideBar = ({ open, handleDrawer }: SideBarProps) => {
  return (
    <DrawerStyle variant='permanent' open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pr: [1]
        }}
      >
        <Typography variant='h6' fontWeight={900} color='white'>
          LOGO LEK
        </Typography>
        <IconButton onClick={handleDrawer}>
          <ChevronLeft color='secondary' />
        </IconButton>
      </Toolbar>
      <Divider />

      <List component='nav'>
        {MenuList.map((menu, key) => (
          <Link to={menu.link}>
            <ListItemButton key={key}>
              <ListItemIcon
                sx={{
                  pl: '.3em'
                }}
              >
                {menu.icon}
              </ListItemIcon>
              <ListItemText
                primary={menu.label}
                sx={{
                  '& > * ': {
                    color: SECONDARY,
                    fontWeight: 600
                  }
                }}
              />
            </ListItemButton>
          </Link>
        ))}
      </List>
    </DrawerStyle>
  );
};

export default SideBar;
