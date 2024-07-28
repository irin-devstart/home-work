import { UserQueryParams } from 'src/typings/FormatParams';
import { UserModel } from '../databases/models';
import { User, Prisma } from '@prisma/client';

export const getAllUsers = async (params: UserQueryParams): Promise<{ count: number; rows: User[] }> => {
  const user = await UserModel.getAll(params);
  return user;
};

export const getOneUser = async (id: number): Promise<User> => {
  const user = await UserModel.getById(id);
  return user;
};

export const editUser = async (id: number, data: Prisma.UserUncheckedUpdateInput): Promise<User> => {
  const user = await UserModel.edit(id, data);
  return user;
};

export const createUser = async (data: Prisma.UserCreateInput): Promise<User> => {
  const user = await UserModel.create(data);
  return user;
};

export const deleteUser = async (id: number): Promise<User> => {
  const user = await UserModel.edit(id, { isDeleted: true });
  return user;
};
