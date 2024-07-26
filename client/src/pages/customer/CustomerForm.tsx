import { FormActions } from '@components/molecules';
import { CustomerForm } from '@components/organisms';
import { DetailTemplate, MainTemplate } from '@components/templates';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerFormPage = () => {
  const navigate = useNavigate();
  return (
    <MainTemplate title='Buat Customer' breadcrumb>
      <DetailTemplate
        title='Buat Customer Baru'
        onBack={() => navigate(-1)}
        detailActions={
          <FormActions
            cancelLabel='Kembali'
            submitLabel='Simpan Customer'
            onSubmit={() => alert('AJAADAD')}
            onCancel={() => alert('sdsd')}
          />
        }
      >
        <CustomerForm />
      </DetailTemplate>
    </MainTemplate>
  );
};

export default CustomerFormPage;
