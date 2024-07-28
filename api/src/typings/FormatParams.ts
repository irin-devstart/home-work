import { Customer, Order, Product, User } from '@prisma/client';

export interface CommonQueryParams {
  offset: number;
  limit: number;
  query: string;
}

export type UserQueryParams = Partial<CommonQueryParams & User>;
export type CustomerQueryParams = Partial<CommonQueryParams & Customer>;
export type OrderQueryParams = Partial<CommonQueryParams & Order>;
export type ProductQueryParams = Partial<CommonQueryParams & Product>;
