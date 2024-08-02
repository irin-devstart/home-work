import { webRoute } from '@common/constants';

import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ page }: { page: JSX.Element }) => {
  const location = useLocation();

  if (!localStorage.getItem('token')) {
    return (
      <Navigate to={webRoute.auth.login} state={{ from: location }} replace />
    );
  }

  return page;
};

export default RequireAuth;
