import { OrderQueryParams } from 'src/typings/FormatParams';
import { Order, Prisma } from '@prisma/client';
import { OrderModel } from '../databases/models';

export const getAllOrders = async (params: OrderQueryParams): Promise<{ count: number; rows: Order[] }> => {
  const order = await OrderModel.getAll(params);
  return order;
};

export const getOneOrder = async (id: number): Promise<Order> => {
  const order = await OrderModel.getOne(id);
  return order;
};

export const editOrder = async (id: number, data: Prisma.OrderUncheckedUpdateInput): Promise<Order> => {
  const order = await OrderModel.edit(id, data);
  return order;
};

export const createOrder = async (data: Prisma.OrderCreateInput): Promise<Order> => {
  const order = await OrderModel.create(data);
  return order;
};

export const deleteOrder = async (id: number): Promise<Order> => {
  const order = await OrderModel.edit(id, { isDeleted: true });
  return order;
};
