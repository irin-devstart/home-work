import { Button, Stack } from '@mui/material';
import React from 'react';
import ButtonLoading from './ButtonLoading';

interface FormActionsProps {
  isSubmitLoading?: boolean;
  cancelLabel: string;
  submitLabel: string;
  onCancel: () => void;
  onSubmit: () => void;
}
const FormActions = ({
  isSubmitLoading = false,
  cancelLabel,
  submitLabel,
  onCancel,
  onSubmit
}: FormActionsProps) => {
  return (
    <Stack justifyContent='flex-end' gap={1}>
      <Button variant='outlined' onClick={onCancel}>
        {cancelLabel}
      </Button>

      <ButtonLoading onClick={onSubmit} isLoading={isSubmitLoading}>
        {submitLabel}
      </ButtonLoading>
    </Stack>
  );
};

export default FormActions;
