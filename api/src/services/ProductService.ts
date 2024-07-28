import { ProductQueryParams } from 'src/typings/FormatParams';
import { ProductModel } from '../databases/models';
import { Product, Prisma } from '@prisma/client';

export const getAllProducts = async (params: ProductQueryParams): Promise<{ count: number; rows: Product[] }> => {
  const product = await ProductModel.getAll(params);
  return product;
};

export const getOneProduct = async (id: number): Promise<Product> => {
  const product = await ProductModel.getOne(id);
  return product;
};

export const editProduct = async (id: number, data: Prisma.ProductUncheckedUpdateInput): Promise<Product> => {
  const product = await ProductModel.edit(id, data);
  return product;
};

export const createProduct = async (data: Prisma.ProductCreateInput): Promise<Product> => {
  const product = await ProductModel.create(data);
  return product;
};

export const deleteProduct = async (id: number): Promise<Product> => {
  const product = await ProductModel.edit(id, { isDeleted: true });
  return product;
};
