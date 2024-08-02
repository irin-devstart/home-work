import { Box, Stack, TextField } from '@mui/material';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

interface ProductFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: UseFormReturn<ProductForm, any, undefined>;
}
const ProductForm = ({ state }: ProductFormProps) => {
  const { errors } = state.formState;
  return (
    <Box
      sx={{
        display: 'flex',
        columnGap: 2,
        alignContent: 'stretch'
      }}
    >
      <Stack flex={1} direction='column' gap={2} justifyContent='space-between'>
        <TextField
          {...state.register('code')}
          label='Code'
          fullWidth
          required
          error={!!errors.code}
          helperText={errors.code?.message}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          {...state.register('stock', {
            valueAsNumber: true
          })}
          label='Stock'
          fullWidth
          required
          type='number'
          error={!!errors.stock}
          helperText={errors.stock?.message}
          InputLabelProps={{ shrink: true }}
        />
      </Stack>
      <Stack flex={1} direction='column' gap={2} justifyContent='space-between'>
        <TextField
          {...state.register('name')}
          label='Name'
          fullWidth
          required
          error={!!errors.name}
          helperText={errors.name?.message}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          {...state.register('price', {
            valueAsNumber: true
          })}
          label='Price'
          fullWidth
          required
          error={!!errors.price}
          helperText={errors.price?.message}
          InputLabelProps={{ shrink: true }}
        />
      </Stack>
    </Box>
  );
};

export default ProductForm;
