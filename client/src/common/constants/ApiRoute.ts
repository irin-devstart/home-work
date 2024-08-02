export const apiRoute = {
  auth: {
    login: '/login',
    logout: '/logout'
  },
  customer: {
    index: '/customer',
    detail: '/customer/:id',
    create: '/customer',
    update: '/customer/:id',
    delete: '/customer/:id'
  },
  product: {
    index: '/product',
    detail: '/product/:id',
    create: '/product',
    update: '/product/:id',
    delete: '/product/:id'
  },
  order: {
    index: '/order',
    detail: '/order/:id',
    create: '/order',
    update: '/order/:id',
    delete: '/order/:id',
    status: '/order/status/:id'
  },
  user: {
    index: '/user',
    create: '/user',
    detail: '/user/:id',
    update: '/user/:id',
    delete: '/user/:id',
    status: '/user/status/:id'
  }
} as const;
