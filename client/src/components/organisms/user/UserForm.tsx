import { userRole } from '@common/constants';
import { capitalizeFirstLetter } from '@common/utils';
import { MenuItem, Stack, TextField } from '@mui/material';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

interface UserFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: UseFormReturn<UserForm, any, undefined>;
}

const UserForm = ({ state }: UserFormProps) => {
  const { errors } = state.formState;
  return (
    <Stack flexDirection='column' rowGap={2}>
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
        {...state.register('email')}
        label='Email Address'
        fullWidth
        required
        error={!!errors.email}
        helperText={errors.email?.message}
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        {...state.register('role')}
        label='Role'
        fullWidth
        required
        select
        value={state.watch('role')}
        error={!!errors.role}
        helperText={errors.role?.message}
        InputLabelProps={{ shrink: true }}
      >
        {Object.values(userRole).map((role) => (
          <MenuItem key={role} value={role}>
            {capitalizeFirstLetter(role)}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
};

export default UserForm;
