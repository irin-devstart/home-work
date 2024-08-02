import { CloseRounded } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Drawer as MuiDrawer,
  Stack,
  DrawerProps as MuiDrawerProps,
  Typography,
  Divider
} from '@mui/material';

interface DrawerProps extends MuiDrawerProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}
const Drawer = ({ title, onClose, children, ...props }: DrawerProps) => {
  return (
    <MuiDrawer
      {...props}
      sx={{
        zIndex: 1300
      }}
    >
      <Box
        sx={{
          display: 'flex',
          rowGap: 2,
          flexDirection: 'column',
          p: '.5em 1em'
        }}
      >
        <Stack justifyContent='space-between' alignItems='center'>
          <Typography variant='h5'>{title}</Typography>
          <IconButton onClick={onClose}>
            <CloseRounded />
          </IconButton>
        </Stack>
        <Divider />
        {children}
      </Box>
    </MuiDrawer>
  );
};

export default Drawer;
