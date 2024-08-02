import { orderStatus, queryKeys, webRoute } from '@common/constants';
import { gotoRouterById } from '@common/utils';
import {
  AlertDialog,
  OptionsPopup,
  OptionsPopupProps,
  Table
} from '@components/organisms';
import { TTableColumn } from '@components/organisms/Table';
import { DetailTemplate, MainTemplate } from '@components/templates';
import { useAlertDialog, useOptionsPopup } from '@hooks';
import {
  AdfScannerRounded,
  AssignmentTurnedInRounded,
  DeleteRounded,
  EditRounded,
  ExpandMoreRounded,
  LocalShippingRounded
} from '@mui/icons-material';
import { Button, Divider, Grid, Stack, Typography } from '@mui/material';
import {
  deleteOrderService,
  detailOrderService,
  updateOrderStatusService
} from '@service/OrderService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const alertModal = useAlertDialog();

  const {
    id: optionId,
    handleClose,
    handleOpen,
    ...optionsPopupProps
  } = useOptionsPopup();

  const detailOrder = useQuery({
    queryKey: [queryKeys.order, id],
    queryFn: () => detailOrderService(Number(id ?? 0)),
    refetchOnWindowFocus: false
  });

  const deleteOrder = useMutation({
    mutationFn: deleteOrderService,
    onSuccess: () => {
      alertModal.setData({
        open: true,
        type: 'success',
        title: 'Successful!',
        description: 'Successfully Deleted Order',
        actionProps: {
          onClose: () => navigate(webRoute.order.index)
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
          onClose: alertModal.setClose
        }
      });
    }
  });

  const updateOrderStatus = useMutation({
    mutationFn: updateOrderStatusService,
    onSuccess: () => {
      alertModal.setData({
        open: true,
        type: 'success',
        title: 'Successful!',
        description: 'Order Status successfully updated',
        actionProps: {
          onClose: () => {
            alertModal.setClose();
            queryClient.invalidateQueries({
              queryKey: [queryKeys.order, String(id)]
            });
          }
        }
      });
    }
  });

  const optionsList: OptionsPopupProps['options'] = [
    {
      key: 'delivery',
      label: 'Delevery Order',
      icon: <LocalShippingRounded fontSize='small' />,
      onClick: () => {
        updateOrderStatus.mutate({
          id: Number(id ?? 0),
          status: orderStatus.DELIVERY
        });
      }
    },
    {
      key: 'shipped',
      label: 'Shipped Order',
      icon: <AssignmentTurnedInRounded fontSize='small' />,
      onClick: () => {
        updateOrderStatus.mutate({
          id: Number(id ?? 0),
          status: orderStatus.SHIPPED
        });
      }
    },
    {
      key: 'export',
      label: 'Export Order',
      icon: <AdfScannerRounded fontSize='small' />,
      onClick: () => console.log('')
    },
    {
      key: 'edit',
      label: 'Edit Order',
      icon: <EditRounded fontSize='small' />,
      onClick: () => navigate(gotoRouterById(webRoute.order.edit, optionId))
    },
    {
      key: 'delete',
      label: 'Delete Order',
      icon: <DeleteRounded fontSize='small' />,
      onClick() {
        alertModal.setData({
          open: true,
          type: 'confirm',
          title: 'Confirmation!',
          description: 'Are you sure you want to delete?',
          actionProps: {
            onCancel: alertModal.setClose,
            isLoading: deleteOrder.isPending,
            onSubmit: () => {
              deleteOrder.mutate(optionId);
            }
          }
        });
      }
    }
  ];

  const customerInformations = [
    {
      title: 'Name',
      description: detailOrder.data?.customer.name
    },
    {
      title: 'Phone Number',
      description: detailOrder.data?.customer.phone
    },
    {
      title: 'Email',
      description: detailOrder.data?.customer.email
    },

    {
      title: 'Address',
      description: detailOrder.data?.customer.address
    }
  ];

  const orderInformations = [
    {
      title: 'Order ID',
      description: detailOrder.data?.id
    },
    {
      title: 'Order Date',
      description: format(
        detailOrder.data?.orderDate ?? new Date(),
        'dd-MM-yyyy'
      )
    },
    {
      title: 'Order Status',
      description: detailOrder.data?.status
    },

    {
      title: 'Created By',
      description: detailOrder.data?.createdBy
    }
  ];

  const columns: Array<TTableColumn<OrderItem>> = [
    {
      id: 'product',
      label: 'Product Name',
      setContent: (data) => {
        return <Typography>{data.product.name}</Typography>;
      }
    },

    {
      id: 'qty',
      label: 'Qty',
      setContent: (data) => {
        return <Typography>{data.qty}</Typography>;
      }
    },
    {
      id: 'price',
      label: 'Price',
      align: 'right',
      setFooterContent: () => {
        return <Typography fontWeight={500}>Total Price</Typography>;
      },
      setContent: (data) => {
        return <Typography>{data.price}</Typography>;
      }
    },

    {
      id: 'totalPrice',
      label: 'Total Price',
      align: 'right',
      setFooterContent: () => {
        return (
          <Typography fontWeight={500}>
            {detailOrder.data?.totalPrice ?? 0}
          </Typography>
        );
      },
      setContent: (data) => {
        return <Typography>{data.totalPrice}</Typography>;
      }
    }
  ];

  return (
    <MainTemplate title='Order Detail' breadcrumb>
      <DetailTemplate
        title='Data Order Detail'
        onBack={() => navigate(-1)}
        topActions={
          <Button
            variant='contained'
            endIcon={<ExpandMoreRounded />}
            onClick={(event) => handleOpen(event, Number(id))}
          >
            Other Action
          </Button>
        }
      >
        <Stack columnGap={5}>
          <Stack direction='column' flex={1} rowGap={1}>
            <Typography variant='h6' fontWeight={600}>
              Customer Informations
            </Typography>
            {customerInformations.map((customer) => {
              return (
                <Stack direction='row'>
                  <Grid container xs={4}>
                    <Typography color='GrayText'>{customer.title}</Typography>
                  </Grid>
                  <Grid container xs={8}>
                    <Typography align='justify'>
                      {customer.description}
                    </Typography>
                  </Grid>
                </Stack>
              );
            })}
          </Stack>
          <Stack direction='column' flex={1} rowGap={1}>
            <Typography variant='h6' fontWeight={600} align='right'>
              Order Informations
            </Typography>
            {orderInformations.map((order) => {
              return (
                <Stack direction='row'>
                  <Grid container xs={8} justifyContent='flex-end'>
                    <Typography color='GrayText'>{order.title}</Typography>
                  </Grid>
                  <Grid container xs={4} justifyContent='flex-end'>
                    <Typography>{order.description}</Typography>
                  </Grid>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
        <Divider />
        <Table
          resource={{
            isLoading: false,
            isFetching: false,
            data: detailOrder.data?.OrderItem ?? []
          }}
          columns={columns}
        />
        <AlertDialog {...alertModal.alertDialog} />
        <OptionsPopup
          {...optionsPopupProps}
          options={optionsList.filter((option) => {
            if (detailOrder.data?.status === orderStatus.PENDING) {
              return option.key !== 'shipped';
            }
            if (detailOrder.data?.status === orderStatus.DELIVERY) {
              return option.key !== 'delivery';
            }
            return ['delivery', 'shipped'].every(
              (status) => option.key !== status
            );
          })}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        />
      </DetailTemplate>
    </MainTemplate>
  );
};

export default OrderDetail;
