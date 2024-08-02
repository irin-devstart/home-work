import { Prisma, User } from '@prisma/client';
import prisma from '../prisma/client';
import { UserQueryParams } from 'src/typings/FormatParams';

export const getAll = async (params: UserQueryParams): Promise<{ count: number; rows: User[] }> => {
  const where: Prisma.UserWhereInput = {
    isDeleted: false
  };
  const skip = +params?.offset ?? undefined;
  const take = +params?.limit ?? undefined;
  const countPromise = prisma.user.count({ where });
  const rowsPromise = prisma.user.findMany({
    skip,
    take,
    orderBy: [{ id: 'desc' }],
    where
  });
  const [count, rows] = await Promise.all([countPromise, rowsPromise]);
  return { count, rows };
};

export const getById = (id: number): Promise<User> => {
  return prisma.user.findUnique({
    where: { id }
  });
};
export const getByEmail = (email: string): Promise<User> => {
  return prisma.user.findFirst({
    where: { email }
  });
};

export const create = (data: Prisma.UserCreateInput): Promise<User> => {
  return prisma.user.create({ data });
};

export const edit = async (id: number, data: Prisma.UserUncheckedUpdateInput): Promise<User> => {
  return prisma.user.update({
    where: { id },
    data
  });
};
