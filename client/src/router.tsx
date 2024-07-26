import { createBrowserRouter } from 'react-router-dom';
import * as Layouts from './components';
import { WebRoute } from './common';
import * as Pages from './pages';

const router = createBrowserRouter([
  {
    element: <Layouts.AuthLayout />,
    children: [
      {
        path: WebRoute.auth.login,
        element: <Pages.Login />
      }
    ]
  },
  {
    element: <Layouts.RootLayout />,
    path: WebRoute.home.index,
    children: [
      {
        index: true,
        element: <Pages.Dashboard />
      },
      {
        path: WebRoute.customer.index,
        element: <Pages.CustomerList />
      },
      {
        path: WebRoute.customer.create,
        element: <Pages.CustomerForm />
      },
      {
        path: WebRoute.product.index,
        element: <Pages.ProductList />
      },
      {
        path: WebRoute.product.create,
        element: <Pages.ProductForm />
      },
      {
        path: WebRoute.order.index,
        element: <Pages.OrderList />
      },
      {
        path: WebRoute.order.create,
        element: <Pages.OrderForm />
      },
      {
        path: WebRoute.setting.index,
        element: <Pages.Setting />
      }
    ]
  }
]);

export default router;
