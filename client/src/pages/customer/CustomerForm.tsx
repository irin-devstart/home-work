import { queryKeys, webRoute } from '@common/constants';
import { FormActions } from '@components/molecules';
import { AlertDialog, CustomerForm } from '@components/organisms';
import { DetailTemplate, MainTemplate } from '@components/templates';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAlertDialog } from '@hooks';
import {
  createCustomerService,
  detailCustomerService,
  updateCustomerService
} from '@service/CustomerService';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CustomerDefaultValues, CustomerSchema } from '@validations/';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

const CustomerFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const alertModal = useAlertDialog();

  const state = useForm<CustomerForm>({
    resolver: zodResolver(CustomerSchema),
    defaultValues: CustomerDefaultValues
  });

  const createCustomer = useMutation({
    mutationFn: createCustomerService,
    onSuccess: () => {
      alertModal.setData({
        open: true,
        type: 'success',
        title: 'Successful!',
        description: 'Customer data successfully added',
        actionProps: {
          onClose() {
            navigate(webRoute.customer.index);
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

  const updateCustomer = useMutation({
    mutationFn: (payload: CustomerForm) =>
      updateCustomerService(Number(id), payload),
    onSuccess: () => {
      alertModal.setData({
        open: true,
        type: 'success',
        title: 'Successful!',
        description: 'Customer data successfully updated',
        actionProps: {
          onClose() {
            navigate(webRoute.customer.index);
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

  const detailCustomer = useQuery({
    enabled: !!id,
    queryKey: [queryKeys.customer, id],
    queryFn: () => detailCustomerService(Number(id ?? 0)),
    refetchOnWindowFocus: false
  });

  const onSubmit = state.handleSubmit((data) => {
    if (!id) {
      createCustomer.mutate(data);
    } else {
      updateCustomer.mutate(data);
    }
  });

  useEffect(() => {
    if (detailCustomer.data) {
      state.reset(detailCustomer.data);
    }
  }, [detailCustomer.data]);

  return (
    <MainTemplate title={!id ? 'Add Customer' : 'Update Customer'} breadcrumb>
      <DetailTemplate
        title={!id ? 'Add New Customer' : 'Update Data Customer'}
        onBack={() => navigate(-1)}
        detailActions={
          <FormActions
            isSubmitLoading={
              !id ? createCustomer.isPending : updateCustomer.isPending
            }
            cancelLabel='Cancel'
            submitLabel={!id ? 'Create' : 'Update'}
            onSubmit={onSubmit}
            onCancel={() => navigate(-1)}
          />
        }
      >
        <CustomerForm state={state} />
        <AlertDialog {...alertModal.alertDialog} />
      </DetailTemplate>
    </MainTemplate>
  );
};

export default CustomerFormPage;
