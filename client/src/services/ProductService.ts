import { apiRoute } from '@common/constants';
import { gotoRouterById } from '@common/utils';
import axios from 'axios';

export const getPaginatedProductsService = async (
  currentPage: number,
  rowsPerPage: number,
  query?: Partial<Product>,
  signal?: AbortSignal
) => {
  const { data } = await axios.get<PaginatedResponse<Array<Product>>>(
    apiRoute.product.index,
    {
      params: {
        offset: currentPage * rowsPerPage,
        limit: rowsPerPage,
        ...query
      },
      signal
    }
  );
  return data;
};

export const createProductService = async (payload: ProductForm) => {
  const { data } = await axios.post<Product>(apiRoute.product.create, payload);
  return data;
};

export const detailProductService = async (id: number) => {
  const { data } = await axios.get<Product>(
    gotoRouterById(apiRoute.product.detail, id)
  );
  return data;
};

export const deleteProductService = async (id: number) => {
  const { data } = await axios.delete<Product>(
    gotoRouterById(apiRoute.product.delete, id)
  );
  return data;
};

export const updateProductService = async (
  id: number,
  payload: ProductForm
) => {
  const { data } = await axios.put<Product>(
    gotoRouterById(apiRoute.product.update, id),
    payload
  );
  return data;
};
