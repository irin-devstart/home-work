import { WebRoute } from '@common/constants';
import {
  HomeRounded,
  InventoryRounded,
  PeopleRounded,
  SettingsRounded,
  ShoppingCartRounded
} from '@mui/icons-material';

const menuList = [
  {
    label: 'Beranda',
    link: WebRoute.home.index,
    icon: <HomeRounded color='secondary' fontSize='small' />
  },
  {
    label: 'Produk',
    link: WebRoute.product.index,
    icon: <InventoryRounded color='secondary' fontSize='small' />
  },
  {
    label: 'Pelanggan',
    link: WebRoute.customer.index,
    icon: <PeopleRounded color='secondary' fontSize='small' />
  },
  {
    label: 'Penjualan',
    link: WebRoute.order.index,
    icon: <ShoppingCartRounded color='secondary' fontSize='small' />
  },

  {
    label: 'Pengaturan',
    link: WebRoute.setting.index,
    icon: <SettingsRounded color='secondary' fontSize='small' />
  }
];

export default menuList;
