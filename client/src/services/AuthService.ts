import { apiRoute } from '@common/constants';
import axios from 'axios';

export const loginService = async (payload: LoginAuth) => {
  const { data } = await axios.post<Login>(apiRoute.auth.login, payload);
  return data;
};
