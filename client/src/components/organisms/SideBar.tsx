import { menuList, SECONDARY } from '@common/constants';
import { ChevronLeft } from '@mui/icons-material';
import {
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material';
import { Link, StyledDrawer } from '@components/atoms';

interface SideBarProps {
  open: boolean;
  handleDrawer: () => void;
}

const SideBar = ({ open, handleDrawer }: SideBarProps) => {
  return (
    <StyledDrawer variant='permanent' open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pr: [1]
        }}
      >
        <Typography variant='h6' fontWeight={900} color='white'>
          HOMEWORK
        </Typography>
        <IconButton onClick={handleDrawer}>
          <ChevronLeft color='secondary' />
        </IconButton>
      </Toolbar>
      <Divider />

      <List component='nav'>
        {menuList.map((menu, key) => (
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
    </StyledDrawer>
  );
};

export default SideBar;
