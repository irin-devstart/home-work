import { Prisma, Product } from '@prisma/client';
import prisma from '../prisma/client';
import { ProductQueryParams } from 'src/typings/FormatParams';

export const getAll = async (params: ProductQueryParams): Promise<{ count: number; rows: Product[] }> => {
  const where: Prisma.ProductWhereInput = {
    isDeleted: false
  };
  const skip = +params?.offset ?? undefined;
  const take = +params?.limit ?? undefined;

  const countPromise = prisma.product.count({ where });
  const rowsPromise = prisma.product.findMany({
    skip,
    take,
    orderBy: [{ id: 'desc' }],
    where
  });
  const [count, rows] = await Promise.all([countPromise, rowsPromise]);
  return { count, rows };
};
export const getOne = (id: number): Promise<Product> => {
  return prisma.product.findUnique({
    where: { id }
  });
};

export const create = (data: Prisma.ProductCreateInput): Promise<Product> => {
  return prisma.product.create({ data });
};

export const edit = async (id: number, data: Prisma.ProductUncheckedUpdateInput): Promise<Product> => {
  return prisma.product.update({
    where: { id },
    data
  });
};
