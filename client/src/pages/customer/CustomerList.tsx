import { queryKeys, webRoute } from '@common/constants';
import { gotoRouterById, truncateString } from '@common/utils';
import {
  AlertDialog,
  OptionsPopup,
  OptionsPopupProps,
  Table
} from '@components/organisms';
import { TTableColumn } from '@components/organisms/Table';
import { ContentTemplate, MainTemplate } from '@components/templates';
import { useAlertDialog, useOptionsPopup, usePagination } from '@hooks';
import { Add, DeleteRounded, EditRounded, MoreVert } from '@mui/icons-material';
import { Button, IconButton, TextField, Typography } from '@mui/material';
import {
  deleteCustomerService,
  getPaginatedCustomersService
} from '@service/CustomerService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerList = () => {
  const navigate = useNavigate();
  const alertModal = useAlertDialog();
  const queryClient = useQueryClient();
  const { setCount, resetPage, onPageCustomChange, ...pagination } =
    usePagination();
  const { id, handleClose, handleOpen, ...optionsPopupProps } =
    useOptionsPopup();

  const getCustomerList = useQuery({
    queryKey: [queryKeys.customer],
    queryFn: () => {
      return getPaginatedCustomersService(
        pagination.page,
        pagination.rowsPerPage
      );
    }
  });

  const deleteCustomer = useMutation({
    mutationFn: deleteCustomerService,
    onSuccess: () => {
      alertModal.setData({
        open: true,
        type: 'success',
        title: 'Successful!',
        description: 'Successfully Deleted Customer',
        actionProps: {
          onClose: () => {
            alertModal.setClose();
            queryClient.invalidateQueries({
              queryKey: [queryKeys.customer]
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

  const columns: Array<TTableColumn<Customer>> = [
    {
      id: 'name',
      label: 'Name',
      setFilterContent: () => {
        return <TextField placeholder='Search name...' />;
      },
      setContent: (data) => {
        return <Typography>{data.name}</Typography>;
      }
    },

    {
      id: 'phone',
      label: 'Phone Number',
      setFilterContent: () => {
        return <TextField placeholder='Search phone number...' />;
      },
      setContent: (data) => {
        return <Typography>{data.phone}</Typography>;
      }
    },
    {
      id: 'email',
      label: 'Email Address',
      setFilterContent: () => {
        return <TextField placeholder='Search email address...' />;
      },
      setContent: (data) => {
        return <Typography>{data.phone}</Typography>;
      }
    },
    {
      id: 'address',
      label: 'Address',
      setContent: (data) => {
        return (
          <Typography>{truncateString(data.address ?? '', 20)}</Typography>
        );
      }
    },
    {
      id: 'id',
      label: 'Action',
      align: 'right',
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
      key: 'edit',
      label: 'Edit Customer',
      icon: <EditRounded fontSize='small' />,
      onClick: () => navigate(gotoRouterById(webRoute.customer.edit, id))
    },
    {
      key: 'delete',
      label: 'Delete Customer',
      icon: <DeleteRounded fontSize='small' />,
      onClick() {
        alertModal.setData({
          open: true,
          type: 'confirm',
          title: 'Confirmation!',
          description: 'Are you sure you want to delete?',
          actionProps: {
            onCancel: alertModal.setClose,
            isLoading: deleteCustomer.isPending,
            onSubmit: () => {
              deleteCustomer.mutate(id);
            }
          }
        });
      }
    }
  ];

  useEffect(() => {
    setCount(getCustomerList.data?.count ?? 0);
  }, [getCustomerList.data]);

  return (
    <MainTemplate title='Customer Page' subTitle='Show all customers'>
      <ContentTemplate
        title='Data Customer'
        action={
          <Button
            startIcon={<Add />}
            onClick={() => navigate(webRoute.customer.create)}
          >
            Add New Customer
          </Button>
        }
      >
        <Table
          pagination={pagination}
          resource={{
            isLoading: getCustomerList.isLoading,
            isFetching: getCustomerList.isFetching,
            data: getCustomerList.data?.rows ?? []
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

export default CustomerList;
