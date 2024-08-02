import { apiRoute } from '@common/constants';
import { gotoRouterById } from '@common/utils';
import axios from 'axios';

export const getPaginatedCustomersService = async (
  currentPage: number,
  rowsPerPage: number,
  query?: Partial<Customer>,
  signal?: AbortSignal
) => {
  const { data } = await axios.get<PaginatedResponse<Array<Customer>>>(
    apiRoute.customer.index,
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

export const createCustomerService = async (payload: CustomerForm) => {
  const { data } = await axios.post<Customer>(
    apiRoute.customer.create,
    payload
  );
  return data;
};

export const detailCustomerService = async (id: number) => {
  const { data } = await axios.get<Customer>(
    gotoRouterById(apiRoute.customer.detail, id)
  );
  return data;
};
export const deleteCustomerService = async (id: number) => {
  const { data } = await axios.delete<Customer>(
    gotoRouterById(apiRoute.customer.delete, id)
  );
  return data;
};

export const updateCustomerService = async (
  id: number,
  payload: CustomerForm
) => {
  const { data } = await axios.put<Customer>(
    gotoRouterById(apiRoute.customer.update, id),
    payload
  );
  return data;
};
