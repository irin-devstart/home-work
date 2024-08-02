import { apiRoute } from '@common/constants';
import { gotoRouterById } from '@common/utils';
import axios from 'axios';

export const getPaginatedUsersService = async (
  currentPage: number,
  rowsPerPage: number,
  query?: Partial<User>,
  signal?: AbortSignal
) => {
  const { data } = await axios.get<PaginatedResponse<Array<User>>>(
    apiRoute.user.index,
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

export const createUserService = async (payload: UserForm) => {
  const pyloadFinal = {
    ...payload,
    password: '123456'
  };
  const { data } = await axios.post<User>(apiRoute.user.create, pyloadFinal);
  return data;
};

export const detailUserService = async (id: number) => {
  const { data } = await axios.get<User>(
    gotoRouterById(apiRoute.user.detail, id)
  );
  return data;
};

export const deleteUserService = async (id: number) => {
  const { data } = await axios.delete<User>(
    gotoRouterById(apiRoute.user.delete, id)
  );
  return data;
};

export const updateUserService = async (id: number, payload: UserForm) => {
  const { data } = await axios.put<User>(
    gotoRouterById(apiRoute.user.update, id),
    payload
  );
  return data;
};

export const updateUserStatusService = async (payload: UserStatus) => {
  const { id, ...payloadFinal } = payload;
  const { data } = await axios.put<User>(
    gotoRouterById(apiRoute.user.status, id),
    payloadFinal
  );
  return data;
};
