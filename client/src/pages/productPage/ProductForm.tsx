import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertDialog, ProductForm } from '@components/organisms';
import { DetailTemplate, MainTemplate } from '@components/templates';
import { useNavigate, useParams } from 'react-router-dom';
import { FormActions } from '@components/molecules';
import { ProductDefaultValues, ProductSchema } from '@validations/';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createProductService,
  detailProductService,
  updateProductService
} from '@service/';
import { useAlertDialog } from '@hooks';
import { queryKeys, webRoute } from '@common/constants';
import { useEffect } from 'react';

const ProductFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const alertModal = useAlertDialog();

  const state = useForm<ProductForm>({
    resolver: zodResolver(ProductSchema),
    defaultValues: ProductDefaultValues
  });
  const createProduct = useMutation({
    mutationFn: createProductService,
    onSuccess: () => {
      alertModal.setData({
        open: true,
        type: 'success',
        title: 'Successful!',
        description: 'Product data successfully added',
        actionProps: {
          onClose() {
            navigate(webRoute.product.index);
          }
        }
      });
    },
    onError: (data: { message: string }) => {
      alertModal.setData({
        open: true,
        type: 'error',
        title: 'Failed',
        description: data.message,
        actionProps: {
          onClose() {
            alertModal.setClose();
          }
        }
      });
    }
  });

  const updateProduct = useMutation({
    mutationFn: (payload: ProductForm) =>
      updateProductService(Number(id), payload),
    onSuccess: () => {
      alertModal.setData({
        open: true,
        type: 'success',
        title: 'Successful!',
        description: 'Product data successfully updated',
        actionProps: {
          onClose() {
            navigate(webRoute.product.index);
          }
        }
      });
    },
    onError: (data: { message: string }) => {
      alertModal.setData({
        open: true,
        type: 'error',
        title: 'Failed',
        description: data.message,
        actionProps: {
          onClose() {
            alertModal.setClose();
          }
        }
      });
    }
  });

  const detailProduct = useQuery({
    enabled: !!id,
    queryKey: [queryKeys.product, id],
    queryFn: () => detailProductService(Number(id ?? 0)),
    refetchOnWindowFocus: false
  });

  const onSubmit = state.handleSubmit((data) => {
    if (!id) {
      createProduct.mutate(data);
    } else {
      updateProduct.mutate(data);
    }
  });

  useEffect(() => {
    if (detailProduct.data) {
      state.reset(detailProduct.data);
    }
  }, [detailProduct.data]);

  return (
    <MainTemplate title={!id ? 'Add Product' : 'Update Product'} breadcrumb>
      <DetailTemplate
        title={!id ? 'Add New Product' : 'Update Data Product'}
        onBack={() => navigate(-1)}
        detailActions={
          <FormActions
            isSubmitLoading={
              !id ? createProduct.isPending : updateProduct.isPending
            }
            cancelLabel='Cancel'
            submitLabel={!id ? 'Create' : 'Update'}
            onSubmit={onSubmit}
            onCancel={() => navigate(-1)}
          />
        }
      >
        <ProductForm state={state} />
        <AlertDialog {...alertModal.alertDialog} />
      </DetailTemplate>
    </MainTemplate>
  );
};

export default ProductFormPage;
