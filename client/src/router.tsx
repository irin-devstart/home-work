import { createBrowserRouter } from 'react-router-dom';
import * as Layouts from './components';
import { webRoute } from './common';
import * as Pages from './pages';
import * as Settings from './pages/setting';
import RequireAuth from '@components/layouts/RequireAuth';

const router = createBrowserRouter([
  {
    element: <Layouts.AuthLayout />,
    children: [
      {
        path: webRoute.auth.login,
        element: <Pages.Login />
      }
    ]
  },
  {
    element: <RequireAuth page={<Layouts.RootLayout />} />,
    path: webRoute.home.index,
    children: [
      {
        index: true,
        element: <Pages.Dashboard />
      },
      {
        path: webRoute.customer.index,
        element: <Pages.CustomerList />
      },
      {
        path: webRoute.customer.create,
        element: <Pages.CustomerForm />
      },
      {
        path: webRoute.customer.edit,
        element: <Pages.CustomerForm />
      },
      {
        path: webRoute.product.index,
        element: <Pages.ProductList />
      },
      {
        path: webRoute.product.create,
        element: <Pages.ProductForm />
      },
      {
        path: webRoute.product.edit,
        element: <Pages.ProductForm />
      },
      {
        path: webRoute.order.index,
        element: <Pages.OrderList />
      },
      {
        path: webRoute.order.create,
        element: <Pages.OrderForm />
      },
      {
        path: webRoute.order.edit,
        element: <Pages.OrderForm />
      },
      {
        path: webRoute.order.detail,
        element: <Pages.OrderDetail />
      },
      {
        path: webRoute.setting.index,
        element: <Pages.Setting />,
        children: [
          {
            path: webRoute.setting.user,
            element: <Settings.UserList />
          }
        ]
      }
    ]
  }
]);

export default router;
