import { OrderForm } from '@components/organisms';
import { DetailTemplate, MainTemplate } from '@components/templates';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderFormPage = () => {
  const navigate = useNavigate();
  return (
    <MainTemplate title='Buat Order' breadcrumb>
      <DetailTemplate title='Buat Order Baru' onBack={() => navigate(-1)}>
        <OrderForm />
      </DetailTemplate>
    </MainTemplate>
  );
};

export default OrderFormPage;
