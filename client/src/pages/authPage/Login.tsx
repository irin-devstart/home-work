import { Login } from '@components/organisms';
import { AuthTemplate } from '@components/templates';
import React from 'react';

const LoginPage = () => {
  return (
    <AuthTemplate logoUrl='ahgahdg' title='Mohon Login untuk lebih detail!'>
      <Login />
    </AuthTemplate>
  );
};

export default LoginPage;
