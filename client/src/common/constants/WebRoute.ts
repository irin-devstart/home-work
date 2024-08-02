export const webRoute = {
  home: {
    index: '/'
  },
  auth: {
    login: '/login',
    logout: '/logout',
    forget: '/forget'
  },
  product: {
    index: '/product',
    create: '/product/create',
    edit: '/product/:id'
  },
  customer: {
    index: '/customer',
    create: '/customer/create',
    edit: '/customer/:id'
  },

  order: {
    index: '/order',
    create: '/order/create',
    edit: '/order/:id',
    detail: '/order/detail/:id'
  },
  setting: {
    index: '/setting',
    user: '/setting/customer'
  }
} as const;
