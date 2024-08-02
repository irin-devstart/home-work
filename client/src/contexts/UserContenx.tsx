import { userDummy } from '@common/constants';
import React, { createContext, ReactNode, useContext, useState } from 'react';

type UserContextProps = {
  user: Omit<User, 'password'>;
  setUser: (user: Omit<User, 'password'>) => void;
  removeUser: () => void;
};

const UserContext = createContext({} as UserContextProps);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Omit<User, 'password'>>(userDummy);

  const removeUser = () => {
    localStorage.removeItem('token');
    setUser(userDummy);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        removeUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

// eslint-disable-next-line react-refresh/only-export-components
export { useUser, UserProvider };
