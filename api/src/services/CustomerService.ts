import { CustomerQueryParams } from 'src/typings/FormatParams';
import { CustomerModel } from '../databases/models';
import { Customer, Prisma } from '@prisma/client';

export const getAllCustomers = async (params: CustomerQueryParams): Promise<{ count: number; rows: Customer[] }> => {
  const customer = await CustomerModel.getAll(params);
  return customer;
};

export const getOneCustomer = async (id: number): Promise<Customer> => {
  const customer = await CustomerModel.getOne(id);
  return customer;
};

export const editCustomer = async (id: number, data: Prisma.CustomerUncheckedUpdateInput): Promise<Customer> => {
  const customer = await CustomerModel.edit(id, data);
  return customer;
};

export const createCustomer = async (data: Prisma.CustomerCreateInput): Promise<Customer> => {
  const customer = await CustomerModel.create(data);
  return customer;
};

export const deleteCustomer = async (id: number): Promise<Customer> => {
  const customer = await CustomerModel.edit(id, { isDeleted: true });
  return customer;
};
