import { alertDialogDummy } from '@common/constants';
import { AlertDialogProps } from '@components/organisms';
import { useState } from 'react';

interface TReturnAlertDialog {
  alertDialog: AlertDialogProps;
  setData: (props: Partial<AlertDialogProps>) => void;
  setClose: () => void;
}

const useAlertDialog = (): TReturnAlertDialog => {
  const [alertDialog, setAlertDialog] =
    useState<AlertDialogProps>(alertDialogDummy);

  const setData = (props: Partial<AlertDialogProps>) => {
    setAlertDialog((prev) => ({ ...prev, ...props }));
  };
  const setClose = () => {
    setAlertDialog((prev) => ({ ...prev, open: false }));
  };
  return { alertDialog, setData, setClose };
};

export default useAlertDialog;
