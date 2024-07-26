import { Stack, StackProps, TextField, TextFieldProps } from '@mui/material';
import React from 'react';

interface FilterDateProps extends StackProps {
  startDateProps: TextFieldProps;
  endDateProps: TextFieldProps;
}
const FilterDate = ({
  startDateProps,
  endDateProps,
  ...props
}: FilterDateProps) => {
  return (
    <Stack {...props}>
      <TextField
        {...startDateProps}
        type='date'
        sx={{
          minWidth: '13.5em'
        }}
      />
      <TextField
        {...endDateProps}
        type='date'
        sx={{
          minWidth: '13.5em'
        }}
      />
    </Stack>
  );
};

export default FilterDate;
