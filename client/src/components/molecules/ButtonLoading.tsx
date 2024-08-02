import { Button, ButtonProps, CircularProgress } from '@mui/material';
import React from 'react';

interface ButtonLoadingProps extends ButtonProps {
  isLoading?: boolean;
}
const ButtonLoading = ({ isLoading, ...props }: ButtonLoadingProps) => {
  return (
    <Button {...props} disabled={isLoading}>
      {isLoading ? (
        <CircularProgress color='primary' size={20} />
      ) : (
        props.children
      )}
    </Button>
  );
};

export default ButtonLoading;
