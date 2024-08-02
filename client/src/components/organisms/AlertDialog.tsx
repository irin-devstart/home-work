import { ERROR, SUSCESS, WARNING } from '@common/constants';
import { ButtonLoading, Dialog } from '@components/molecules';
import {
  HighlightOffRounded,
  InfoOutlined,
  TaskAltRounded
} from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';
import React from 'react';

type TType = 'error' | 'success' | 'confirm';

export interface AlertDialogProps {
  open: boolean;
  type: TType;
  title: string;
  description: string;
  actionProps?: Partial<{
    isLoading: boolean;
    onCancel: () => void;
    onSubmit: () => void;
    onClose: () => void;
  }>;
}
const AlertDialog = ({
  open,
  type,
  title,
  description,
  actionProps
}: AlertDialogProps) => {
  const iconTypes: Record<TType, JSX.Element> = {
    error: <HighlightOffRounded sx={{ fontSize: '4em', color: ERROR }} />,
    success: <TaskAltRounded sx={{ fontSize: '4em', color: SUSCESS }} />,
    confirm: <InfoOutlined sx={{ fontSize: '4em', color: WARNING }} />
  };

  return (
    <Dialog
      open={open}
      dialogTitle={
        <Stack direction='column' rowGap={1} alignItems='center'>
          {iconTypes[type]}
          <Typography variant='h3' fontWeight={600}>
            {title}
          </Typography>
        </Stack>
      }
      dialogActions={
        <Stack flexBasis={'100%'} justifyContent='center' columnGap={2}>
          {type === 'confirm' ? (
            <>
              <Button variant='outlined' onClick={actionProps?.onCancel}>
                Cancel
              </Button>
              <ButtonLoading
                isLoading={actionProps?.isLoading}
                onClick={actionProps?.onSubmit}
              >
                Save
              </ButtonLoading>
            </>
          ) : (
            <Button variant='outlined' onClick={actionProps?.onClose}>
              Close
            </Button>
          )}
        </Stack>
      }
    >
      <Typography align='center' fontSize={16} color='GrayText'>
        {description}
      </Typography>
    </Dialog>
  );
};

export default AlertDialog;
