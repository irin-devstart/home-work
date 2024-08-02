import { Prisma, Order } from '@prisma/client';
import prisma from '../prisma/client';
import { OrderQueryParams } from 'src/typings/FormatParams';

export const getAll = async (params: OrderQueryParams): Promise<{ count: number; rows: Order[] }> => {
  const where: Prisma.OrderWhereInput = { isDeleted: false };
  const skip = +params?.offset ?? undefined;
  const take = +params?.limit ?? undefined;
  const countPromise = prisma.order.count({ where });
  const rowsPromise = prisma.order.findMany({
    skip,
    take,
    orderBy: [{ id: 'desc' }],
    where,
    include: {
      customer: true,
      OrderItem: true
    }
  });
  const [count, rows] = await Promise.all([countPromise, rowsPromise]);
  return { count, rows };
};

export const getOne = (id: number): Promise<Order> => {
  return prisma.order.findUnique({
    where: { id },
    include: {
      customer: true,
      OrderItem: {
        include: {
          product: true
        }
      }
    }
  });
};

export const create = (data: Prisma.OrderCreateInput): Promise<Order> => {
  return prisma.order.create({ data });
};

export const edit = async (id: number, data: Prisma.OrderUncheckedUpdateInput): Promise<Order> => {
  return prisma.order.update({
    where: { id },
    data
  });
};
