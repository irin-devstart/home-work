import { queryKeys, webRoute } from '@common/constants';
import { gotoRouterById } from '@common/utils';
import {
  AlertDialog,
  FilterDate,
  OptionsPopup,
  OptionsPopupProps,
  OrderStatus,
  Table
} from '@components/organisms';
import { TTableColumn } from '@components/organisms/Table';
import { ContentTemplate, MainTemplate } from '@components/templates';
import { useAlertDialog, useOptionsPopup, usePagination } from '@hooks';
import {
  Add,
  DeleteRounded,
  EditRounded,
  MoreVert,
  VisibilityRounded
} from '@mui/icons-material';
import {
  Button,
  IconButton,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import {
  deleteOrderService,
  getPaginatedOrdersService
} from '@service/OrderService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderList = () => {
  const navigate = useNavigate();
  const alertModal = useAlertDialog();
  const queryClient = useQueryClient();
  const { setCount, resetPage, onPageCustomChange, ...pagination } =
    usePagination();
  const { id, handleClose, handleOpen, ...optionsPopupProps } =
    useOptionsPopup();

  const getOrderList = useQuery({
    queryKey: [queryKeys.order],
    queryFn: () => {
      return getPaginatedOrdersService(pagination.page, pagination.rowsPerPage);
    }
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
          onClose: () => {
            alertModal.setClose();
            queryClient.invalidateQueries({
              queryKey: [queryKeys.order]
            });
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
          onClose: alertModal.setClose
        }
      });
    }
  });

  const columns: Array<TTableColumn<Order>> = [
    {
      id: 'id',
      label: 'ID Order',
      width: '14%',
      setFilterContent: () => {
        return <TextField placeholder='Search id order...' />;
      },
      setContent: (data) => {
        return <Typography>{data.id}</Typography>;
      }
    },
    {
      id: 'customer',
      label: 'Customer Name',
      width: '24%',
      setFilterContent: () => {
        return <TextField placeholder='Search customer name...' />;
      },
      setContent: (data) => {
        return <Typography>{data.customer.name}</Typography>;
      }
    },

    {
      id: 'orderDate',
      label: 'Order Date',
      width: '16%',
      setContent: (data) => {
        return <Typography>{format(data.orderDate, 'dd-MM-yyyy')}</Typography>;
      }
    },

    {
      id: 'totalPrice',
      label: 'Total Price',
      width: '16%',
      align: 'right',
      setContent: (data) => {
        return <Typography>{data.totalPrice}</Typography>;
      }
    },
    {
      id: 'status',
      label: 'Status',
      width: '20%',
      align: 'center',
      setContent: (data) => {
        return (
          <Stack justifyContent='center'>
            <OrderStatus status={data.status} />
          </Stack>
        );
      }
    },
    {
      id: 'id',
      label: 'Action',
      align: 'right',
      width: '10%',
      setContent: (data) => {
        return (
          <IconButton
            sx={{ mr: '-.55em' }}
            onClick={(event) => handleOpen(event, data.id)}
          >
            <MoreVert />
          </IconButton>
        );
      }
    }
  ];

  const optionsList: OptionsPopupProps['options'] = [
    {
      key: 'view',
      label: 'View Order',
      icon: <VisibilityRounded fontSize='small' />,
      onClick: () => navigate(gotoRouterById(webRoute.order.detail, id))
    },
    {
      key: 'edit',
      label: 'Edit Order',
      icon: <EditRounded fontSize='small' />,
      onClick: () => navigate(gotoRouterById(webRoute.order.edit, id))
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
              deleteOrder.mutate(id);
            }
          }
        });
      }
    }
  ];

  useEffect(() => {
    setCount(getOrderList.data?.count ?? 0);
  }, [getOrderList.data]);

  return (
    <MainTemplate title='Order Page' subTitle='Show all customers'>
      <ContentTemplate
        title='Data Order'
        subTitle='Data displayed from August 1, 2024 to August 31, 2024'
        action={
          <Stack columnGap={2}>
            <FilterDate
              columnGap={2}
              startDateProps={{
                value: '2024-08-01',
                label: 'Date Start'
              }}
              endDateProps={{
                value: '2024-08-31',
                label: 'Date End'
              }}
            />
            <Button
              startIcon={<Add />}
              onClick={() => navigate(webRoute.order.create)}
            >
              Add New Order
            </Button>
          </Stack>
        }
      >
        <Table
          pagination={pagination}
          resource={{
            isLoading: getOrderList.isLoading,
            isFetching: getOrderList.isFetching,
            data: getOrderList.data?.rows ?? []
          }}
          columns={columns}
        />
        <AlertDialog {...alertModal.alertDialog} />
        <OptionsPopup
          {...optionsPopupProps}
          options={optionsList}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        />
      </ContentTemplate>
    </MainTemplate>
  );
};

export default OrderList;
