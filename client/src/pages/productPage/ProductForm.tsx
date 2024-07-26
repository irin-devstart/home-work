import { FormActions } from '@components/molecules';
import { ProductForm } from '@components/organisms';
import { DetailTemplate, MainTemplate } from '@components/templates';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductFormPage = () => {
  const navigate = useNavigate();
  return (
    <MainTemplate title='Buat Produk' breadcrumb>
      <DetailTemplate
        title='Buat Produk Baru'
        onBack={() => navigate(-1)}
        detailActions={
          <FormActions
            cancelLabel='Kembali'
            submitLabel='Simpan Produk'
            onSubmit={() => alert('AJAADAD')}
            onCancel={() => alert('sdsd')}
          />
        }
      >
        <ProductForm />
      </DetailTemplate>
    </MainTemplate>
  );
};

export default ProductFormPage;
