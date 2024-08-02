import { queryKeys, webRoute } from '@common/constants';
import { gotoRouterById } from '@common/utils';
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
  deleteProductService,
  getPaginatedProductsService
} from '@service/ProductService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const navigate = useNavigate();
  const alertModal = useAlertDialog();
  const queryClient = useQueryClient();
  const { setCount, resetPage, onPageCustomChange, ...pagination } =
    usePagination();
  const { id, handleClose, handleOpen, ...optionsPopupProps } =
    useOptionsPopup();

  const getProductList = useQuery({
    queryKey: [queryKeys.product],
    queryFn: () => {
      return getPaginatedProductsService(
        pagination.page,
        pagination.rowsPerPage
      );
    }
  });

  const deleteProduct = useMutation({
    mutationFn: deleteProductService,
    onSuccess: () => {
      alertModal.setData({
        open: true,
        type: 'success',
        title: 'Successful!',
        description: 'Successfully Deleted Product',
        actionProps: {
          onClose: () => {
            alertModal.setClose();
            queryClient.invalidateQueries({
              queryKey: [queryKeys.product]
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

  const columns: Array<TTableColumn<Product>> = [
    {
      id: 'code',
      label: 'Code',
      setFilterContent: () => {
        return <TextField placeholder='Search code...' />;
      },
      setContent: (data) => {
        return <Typography>{data.code}</Typography>;
      }
    },
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
      id: 'stock',
      label: 'Stock',
      setContent: (data) => {
        return <Typography>{data.stock}</Typography>;
      }
    },
    {
      id: 'price',
      label: 'Price',

      setContent: (data) => {
        return <Typography>{data.price}</Typography>;
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
      label: 'Edit Product',
      icon: <EditRounded fontSize='small' />,
      onClick: () => navigate(gotoRouterById(webRoute.product.edit, id))
    },
    {
      key: 'delete',
      label: 'Delete Product',
      icon: <DeleteRounded fontSize='small' />,
      onClick() {
        alertModal.setData({
          open: true,
          type: 'confirm',
          title: 'Confirmation!',
          description: 'Are you sure you want to delete?',
          actionProps: {
            onCancel: alertModal.setClose,
            isLoading: deleteProduct.isPending,
            onSubmit: () => {
              deleteProduct.mutate(id);
            }
          }
        });
      }
    }
  ];

  useEffect(() => {
    setCount(getProductList.data?.count ?? 0);
  }, [getProductList.data]);

  return (
    <MainTemplate title='Product Page' subTitle='Show all products'>
      <ContentTemplate
        title='Data Product'
        action={
          <Button
            startIcon={<Add />}
            onClick={() => navigate(webRoute.product.create)}
          >
            Add New Product
          </Button>
        }
      >
        <Table
          pagination={pagination}
          resource={{
            isLoading: getProductList.isLoading,
            isFetching: getProductList.isFetching,
            data: getProductList.data?.rows ?? []
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

export default ProductList;
