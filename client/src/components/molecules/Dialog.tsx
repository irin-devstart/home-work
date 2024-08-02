import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogProps as DialogPropsMui
} from '@mui/material';
import React from 'react';

interface DialogProps extends DialogPropsMui {
  dialogTitle: React.ReactNode;
  dialogActions: React.ReactNode;
}
const Dialog = ({
  dialogTitle,
  children,
  dialogActions,
  ...props
}: DialogProps) => {
  return (
    <MuiDialog
      {...props}
      keepMounted
      fullWidth
      maxWidth='xs'
      sx={{
        zIndex: 9999
      }}
    >
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>{dialogActions}</DialogActions>
    </MuiDialog>
  );
};

export default Dialog;
