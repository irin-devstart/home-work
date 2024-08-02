import {
  Autocomplete,
  Box,
  Button,
  Divider,
  IconButton,
  LinearProgress,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { UseQueryResult } from '@tanstack/react-query';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { format } from 'date-fns';
import {
  AddRounded,
  CancelRounded,
  CheckCircleRounded,
  DeleteRounded
} from '@mui/icons-material';
import Table, { TTableColumn } from '../Table';

interface OrderFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: UseFormReturn<OrderForm, any, undefined>;
  isOpenOrderItem: boolean;
  data: {
    getProductList: UseQueryResult<PaginatedResponse<Product[]>, Error>;
    getCustomerList: UseQueryResult<PaginatedResponse<Customer[]>, Error>;
  };
  fn: {
    handleSaveOrderItem: () => void;
    handleCancelOrderItem: () => void;
    handleOpenOrderItem: () => void;
    handleDeleteOrderItem: (index: number) => void;
  };
}
const OrderForm = ({ state, isOpenOrderItem, data, fn }: OrderFormProps) => {
  const { errors } = state.formState;
  const { getCustomerList, getProductList } = data;
  const {
    handleSaveOrderItem,
    handleCancelOrderItem,
    handleOpenOrderItem,
    handleDeleteOrderItem
  } = fn;

  const columns: Array<TTableColumn<OrderItemForm & { id: number }>> = [
    {
      id: 'productName',
      label: 'Product Name',
      width: '25%',
      setFooterContent: () => {
        return (
          <Autocomplete
            value={{
              id: state.watch('orderItem.productId'),
              name: state.watch('orderItem.productName'),
              price: state.watch('orderItem.price')
            }}
            options={
              getProductList.data?.rows.map((product) => {
                const { id, name, price } = product;
                return { id, name, price };
              }) ?? []
            }
            loading={getProductList.isPending}
            loadingText={<LinearProgress />}
            getOptionLabel={(product) => product.name}
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                label='Product Name'
                error={!!errors.orderItem?.productId}
                helperText={errors.orderItem?.productId?.message}
              />
            )}
            onChange={(event, newValue, reason) => {
              if (newValue) {
                state.setValue('orderItem.productId', newValue.id);
                state.setValue('orderItem.productName', newValue.name);
                state.setValue('orderItem.price', newValue.price);
              }
              if (reason === 'clear') {
                state.setValue('orderItem.productId', 0);
                state.setValue('orderItem.productName', '');
                state.setValue('orderItem.price', 0);
              }
            }}
          />
        );
      },
      setContent: (data) => {
        return <Typography>{data.productName}</Typography>;
      }
    },

    {
      id: 'qty',
      label: 'Qty',
      width: '15%',
      setFooterContent: () => {
        return (
          <TextField
            {...state.register(`orderItem.qty`, {
              valueAsNumber: true,
              onChange: (event) => {
                const { value: qty } = event.target;
                const price = state.watch('orderItem.price');
                state.setValue('orderItem.totalPrice', qty * price);
              }
            })}
            label='Qty'
            fullWidth
            required
            error={!!errors.orderItem?.qty}
            helperText={errors.orderItem?.qty?.message}
            InputLabelProps={{ shrink: true }}
          />
        );
      },
      setContent: (data) => {
        return <Typography>{data.qty}</Typography>;
      }
    },
    {
      id: 'price',
      label: 'Price',
      width: '20%',
      setFooterContent: () => {
        return (
          <TextField
            label='Price'
            disabled
            value={state.watch(`orderItem.price`)}
            InputLabelProps={{ shrink: true }}
          />
        );
      },
      setContent: (data) => {
        return <Typography>{data.price}</Typography>;
      }
    },
    {
      id: 'totalPrice',
      label: 'Total Price',
      width: '20%',
      setFooterContent: () => {
        return (
          <>
            <TextField
              label='Total Price'
              disabled
              value={state.watch('orderItem.totalPrice')}
              InputLabelProps={{ shrink: true }}
            />
          </>
        );
      },
      setContent: (data) => {
        return <Typography>{data.totalPrice}</Typography>;
      }
    },
    {
      id: 'productId',
      label: 'Action',
      align: 'right',
      width: '20%',
      setFooterContent: () => {
        return (
          <Stack>
            <Button
              variant='text'
              startIcon={<CancelRounded />}
              color='inherit'
              sx={{ textTransform: 'none' }}
              onClick={handleCancelOrderItem}
            >
              Cancel
            </Button>
            <Button
              variant='text'
              startIcon={<CheckCircleRounded />}
              color='primary'
              sx={{ textTransform: 'none' }}
              onClick={handleSaveOrderItem}
            >
              Save
            </Button>
          </Stack>
        );
      },
      setContent: (data) => {
        return (
          <IconButton
            sx={{ mr: '-.55em' }}
            onClick={() => handleDeleteOrderItem(data.id)}
          >
            <DeleteRounded />
          </IconButton>
        );
      }
    }
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        rowGap: 3
      }}
    >
      <Stack direction='row' gap={2}>
        <Stack flex={1}>
          <Autocomplete
            options={
              getCustomerList.data?.rows.map((customer) => {
                const { id, name } = customer;
                return { id, name };
              }) ?? []
            }
            value={{
              id: state.watch('customerId'),
              name: state.watch('customerName')
            }}
            loading={getCustomerList.isPending}
            loadingText={<LinearProgress />}
            getOptionLabel={(customer) => customer.name}
            fullWidth
            renderInput={(params) => (
              <TextField {...params} label='Customer Name' />
            )}
            onChange={(event, newValue, reason) => {
              if (newValue) {
                state.setValue('customerId', newValue.id);
                state.setValue('customerName', newValue.name);
              }
              if (reason === 'clear') {
                state.setValue('customerId', 0);
                state.setValue('customerName', '');
              }
            }}
          />
        </Stack>
        <Stack flex={1} columnGap={2}>
          <TextField
            label='Order Date'
            type='date'
            fullWidth
            onChange={(event) => {
              const { value } = event.target;
              state.setValue('orderDate', new Date(value));
            }}
            value={format(state.watch('orderDate'), 'yyyy-MM-dd')}
            required
            error={!!errors.orderDate}
            helperText={errors.orderDate?.message}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label='Total Price'
            disabled
            fullWidth
            value={state.watch('totalPrice')}
            InputLabelProps={{ shrink: true }}
          />
        </Stack>
      </Stack>
      <Stack
        direction='column'
        rowGap={2}
        sx={{
          mb: '1em'
        }}
      >
        <Stack columnGap={0.4} alignItems='center'>
          <Typography variant='h6'>Select Order Items*</Typography>
          {!!errors.orderItemsFinal && (
            <Typography variant='subtitle1' color='error' fontSize={12}>
              ({errors.orderItemsFinal?.message})
            </Typography>
          )}
        </Stack>
        <Divider />

        <Table
          resource={{
            isLoading: false,
            isFetching: false,
            data: state?.watch('orderItemsFinal') ?? []
          }}
          columns={columns.map((column) => {
            if (!isOpenOrderItem) {
              delete column.setFooterContent;
            }
            return column;
          })}
        />
        <Stack justifyContent='flex-end'>
          <Button
            variant='contained'
            startIcon={<AddRounded />}
            size='small'
            disabled={isOpenOrderItem}
            onClick={handleOpenOrderItem}
          >
            Add Item
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default OrderForm;
