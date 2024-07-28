import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { UserModel } from '../databases/models';
import { User } from '@prisma/client';

export const generateUserJwt = (userId: number, jwtid: string): string => {
  const body = { id: userId };
  return jwt.sign(body, process.env.APP_SECRET, { jwtid });
};

export const verifyUserCredentials = async (email: string, password: string): Promise<User> => {
  const user = await UserModel.getByEmail(email);
  const verifyUser = await argon2.verify(user.password, password);
  if (!verifyUser) throw new Error();
  return user;
};
