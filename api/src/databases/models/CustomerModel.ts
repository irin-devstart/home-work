import { Prisma, Customer } from '@prisma/client';
import prisma from '../prisma/client';
import { CustomerQueryParams } from 'src/typings/FormatParams';

export const getAll = async (params: CustomerQueryParams): Promise<{ count: number; rows: Customer[] }> => {
  const where: Prisma.CustomerWhereInput = {
    isDeleted: false
  };

  const skip = +params?.offset ?? undefined;
  const take = +params?.limit ?? undefined;
  const countPromise = prisma.customer.count({ where });
  const rowsPromise = prisma.customer.findMany({
    skip,
    take,
    orderBy: [{ id: 'desc' }],
    where
  });
  const [count, rows] = await Promise.all([countPromise, rowsPromise]);
  return { count, rows };
};

export const getOne = (id: number): Promise<Customer> => {
  return prisma.customer.findUnique({
    where: { id }
  });
};

export const create = (data: Prisma.CustomerCreateInput): Promise<Customer> => {
  return prisma.customer.create({ data });
};

export const edit = async (id: number, data: Prisma.CustomerUncheckedUpdateInput): Promise<Customer> => {
  return prisma.customer.update({
    where: { id },
    data
  });
};
