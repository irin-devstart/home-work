import { Box, InputAdornment, Stack, TextField } from '@mui/material';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

interface CustomerFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: UseFormReturn<CustomerForm, any, undefined>;
}

const CustomerForm = ({ state }: CustomerFormProps) => {
  const { errors } = state.formState;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Stack gap={2}>
        <Stack flex={1} direction='column' gap={2}>
          <TextField
            {...state.register('name')}
            label='Name'
            fullWidth
            required
            error={!!errors.name}
            helperText={errors.name?.message}
            InputLabelProps={{ shrink: true }}
          />

          <Stack columnGap={1} alignItems='center'>
            <TextField
              {...state.register('phone')}
              label='Phone Number'
              InputProps={{
                inputProps: {
                  format: '########'
                },
                startAdornment: (
                  <InputAdornment position='start'>+62</InputAdornment>
                )
              }}
              fullWidth
              required
              error={!!errors.phone}
              helperText={errors.phone?.message}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              {...state.register('email')}
              label='Email Address'
              fullWidth
              required
              error={!!errors.email}
              helperText={errors.email?.message}
              InputLabelProps={{ shrink: true }}
            />
          </Stack>
        </Stack>
        <Stack flex={1} direction='column' gap={2}>
          <TextField
            {...state.register('address')}
            label='Address'
            fullWidth
            minRows={3}
            multiline
            InputProps={{
              sx: {
                height: '5.8em'
              }
            }}
            InputLabelProps={{ shrink: true }}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default CustomerForm;
