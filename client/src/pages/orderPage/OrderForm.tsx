import { orderItemDummy, queryKeys, webRoute } from '@common/constants';
import { FormActions } from '@components/molecules';
import { AlertDialog, OrderForm } from '@components/organisms';
import { DetailTemplate, MainTemplate } from '@components/templates';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAlertDialog } from '@hooks';
import {
  getPaginatedCustomersService,
  getPaginatedProductsService
} from '@service/';
import {
  createOrderService,
  detailOrderService,
  updateOrderService
} from '@service/OrderService';

import { useMutation, useQuery } from '@tanstack/react-query';
import { OrderDefaultValues, OrderSchema } from '@validations/';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

const OrderFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const alertModal = useAlertDialog();
  const [isOpenOrderItem, setIsOpenOrderItem] = useState<boolean>(false);

  const state = useForm<OrderForm>({
    resolver: zodResolver(OrderSchema),
    defaultValues: OrderDefaultValues
  });

  const createOrder = useMutation({
    mutationFn: createOrderService,
    onSuccess: () => {
      alertModal.setData({
        open: true,
        type: 'success',
        title: 'Successful!',
        description: 'Order data successfully added',
        actionProps: {
          onClose() {
            navigate(webRoute.order.index);
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

  const updateOrder = useMutation({
    mutationFn: (payload: OrderForm) => updateOrderService(Number(id), payload),
    onSuccess: () => {
      alertModal.setData({
        open: true,
        type: 'success',
        title: 'Successful!',
        description: 'Order data successfully updated',
        actionProps: {
          onClose() {
            navigate(webRoute.order.index);
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

  const detailOrder = useQuery({
    enabled: !!id,
    queryKey: [queryKeys.order, id],
    queryFn: () => detailOrderService(Number(id ?? 0)),
    refetchOnWindowFocus: false
  });

  const getCustomerList = useQuery({
    queryKey: [queryKeys.customer],
    queryFn: () => {
      return getPaginatedCustomersService(0, 100);
    }
  });

  const getProductList = useQuery({
    queryKey: [queryKeys.product],
    queryFn: () => {
      return getPaginatedProductsService(0, 100);
    }
  });

  const handleSaveOrderItem = () => {
    state.trigger('orderItem').then((res) => {
      if (res) {
        const getLastIndex = (state.getValues('orderItemsFinal') ?? []).length;
        const orderItem = state.getValues('orderItem');
        const getOrderItemFinal = state.getValues('orderItemsFinal') ?? [];
        getOrderItemFinal.push({ ...orderItem, id: getLastIndex });
        state.setValue('orderItemsFinal', getOrderItemFinal);
        setIsOpenOrderItem(false);
      }
    });
  };

  const handleOpenOrderItem = () => {
    state.setValue('orderItem', orderItemDummy);
    setIsOpenOrderItem(true);
  };

  const handleDeleteOrderItem = (id: number) => {
    const orderItems = state.watch('orderItemsFinal')?.filter((item) => {
      return item.id !== id;
    });
    state.setValue('orderItemsFinal', orderItems);
  };

  const handleCancelOrderItem = () => {
    setIsOpenOrderItem(false);
    state.setValue('orderItem', orderItemDummy);
  };

  const onSubmit = state.handleSubmit((data) => {
    if (!id) {
      createOrder.mutate(data);
    } else {
      updateOrder.mutate(data);
    }
  });

  useEffect(() => {
    if (detailOrder.data) {
      const { customer, orderDate, totalPrice, OrderItem } = detailOrder.data;

      const getOrder: OrderForm = {
        orderDate: new Date(orderDate),
        totalPrice,
        customerId: customer.id,
        customerName: customer.name,
        orderItem: {
          ...(OrderItem.at(-1) ?? orderItemDummy),
          productName: OrderItem.at(-1)?.product.name ?? ''
        },
        orderItemsFinal: OrderItem.map((item) => {
          return {
            ...item,
            productName: item.product.name
          };
        })
      };
      state.reset(getOrder);
    }
  }, [detailOrder.data]);

  useEffect(() => {
    if (!state.watch('orderItemsFinal')) return;
    const totalPrice = state.watch('orderItemsFinal')?.reduce((total, item) => {
      return total + item.totalPrice;
    }, 0);
    state.setValue('totalPrice', totalPrice ?? 0);
  }, [state.watch('orderItemsFinal')]);

  return (
    <MainTemplate title={!id ? 'Add Order' : 'Update Order'} breadcrumb>
      <DetailTemplate
        title={!id ? 'Add New Order' : 'Update Data Order'}
        onBack={() => navigate(-1)}
        detailActions={
          <FormActions
            isSubmitLoading={
              !id ? createOrder.isPending : updateOrder.isPending
            }
            cancelLabel='Cancel'
            submitLabel={!id ? 'Create' : 'Update'}
            onSubmit={onSubmit}
            onCancel={() => navigate(-1)}
          />
        }
      >
        <OrderForm
          state={state}
          isOpenOrderItem={isOpenOrderItem}
          data={{ getCustomerList, getProductList }}
          fn={{
            handleSaveOrderItem,
            handleCancelOrderItem,
            handleOpenOrderItem,
            handleDeleteOrderItem
          }}
        />
        <AlertDialog {...alertModal.alertDialog} />
      </DetailTemplate>
    </MainTemplate>
  );
};

export default OrderFormPage;
