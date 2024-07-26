const WebRoute = {
  home: {
    index: '/'
  },
  auth: {
    login: '/login',
    logout: '/logout',
    forget: '/forget'
  },
  product: {
    index: '/produk',
    create: '/produk/create'
  },
  customer: {
    index: '/customer',
    create: '/customer/create'
  },
  order: {
    index: '/penjualan',
    create: '/penjualan/create'
  },
  setting: {
    index: '/pengaturan'
  }
};

export default WebRoute;
