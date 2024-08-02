import { apiRoute } from '@common/constants';
import { gotoRouterById } from '@common/utils';

import axios from 'axios';

export const getPaginatedOrdersService = async (
  currentPage: number,
  rowsPerPage: number,
  query?: Partial<Order>,
  signal?: AbortSignal
) => {
  const { data } = await axios.get<PaginatedResponse<Array<Order>>>(
    apiRoute.order.index,
    {
      params: {
        offset: currentPage * rowsPerPage,
        limit: rowsPerPage,
        ...query
      },
      signal
    }
  );
  return data;
};

export const createOrderService = async (payload: OrderForm) => {
  const payloadFinal = {
    orderDate: payload.orderDate,
    totalPrice: payload.totalPrice,
    customerId: payload.customerId,
    OrderItem: payload.orderItemsFinal.map((item) => {
      return {
        qty: item.qty,
        price: item.price,
        productId: item.productId,
        totalPrice: item.totalPrice
      };
    }),
    createdBy: 1
  };
  const { data } = await axios.post<Order>(apiRoute.order.create, payloadFinal);
  return data;
};

export const detailOrderService = async (id: number) => {
  const { data } = await axios.get<Order>(
    gotoRouterById(apiRoute.order.detail, id)
  );
  return data;
};

export const deleteOrderService = async (id: number) => {
  const { data } = await axios.delete<Order>(
    gotoRouterById(apiRoute.order.delete, id)
  );
  return data;
};

export const updateOrderService = async (id: number, payload: OrderForm) => {
  const payloadFinal = {
    orderDate: payload.orderDate,
    totalPrice: payload.totalPrice,
    customerId: payload.customerId,
    OrderItem: payload.orderItemsFinal.map((item) => {
      return {
        qty: item.qty,
        price: item.price,
        productId: item.productId,
        totalPrice: item.totalPrice
      };
    }),
    createdBy: 1
  };

  const { data } = await axios.put<Order>(
    gotoRouterById(apiRoute.order.update, id),
    payloadFinal
  );
  return data;
};

export const updateOrderStatusService = async (payload: OrderUpdateStatus) => {
  const { id, ...payloadFinal } = payload;
  const { data } = await axios.put<User>(
    gotoRouterById(apiRoute.order.status, id),
    payloadFinal
  );
  return data;
};
