import { webRoute } from '@common/constants';
import {
  HomeRounded,
  InventoryRounded,
  PeopleRounded,
  SettingsRounded,
  ShoppingCartRounded
} from '@mui/icons-material';

export const menuList = [
  {
    label: 'Dashboard',
    link: webRoute.home.index,
    icon: <HomeRounded color='secondary' fontSize='small' />
  },
  {
    label: 'Product',
    link: webRoute.product.index,
    icon: <InventoryRounded color='secondary' fontSize='small' />
  },
  {
    label: 'Customer',
    link: webRoute.customer.index,
    icon: <PeopleRounded color='secondary' fontSize='small' />
  },
  {
    label: 'Order',
    link: webRoute.order.index,
    icon: <ShoppingCartRounded color='secondary' fontSize='small' />
  },

  {
    label: 'Setting',
    link: webRoute.setting.user,
    icon: <SettingsRounded color='secondary' fontSize='small' />
  }
];
