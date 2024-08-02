import { ArrowBack } from '@mui/icons-material';
import { Divider, IconButton, Paper, Stack, Typography } from '@mui/material';
import React from 'react';

interface DetailTemplateProps {
  title: string;
  children: React.ReactNode;
  topActions?: React.ReactNode;
  detailActions?: React.ReactNode;
  onBack: () => void;
}
const DetailTemplate = ({
  title,
  children,
  onBack,
  topActions,
  detailActions
}: DetailTemplateProps) => {
  return (
    <Paper
      elevation={1}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '70vh',
        p: '1em'
      }}
    >
      <Stack direction='column' rowGap={2}>
        <Stack alignItems='center' columnGap={1}>
          <Stack columnGap={2} alignItems='center' flex={1}>
            <IconButton onClick={onBack}>
              <ArrowBack />
            </IconButton>
            <Typography variant='h5'>{title}</Typography>
          </Stack>
          <Stack flex={1} justifyContent='flex-end'>
            {topActions}
          </Stack>
        </Stack>
        <Divider />
        {children}
      </Stack>
      {detailActions && (
        <Stack direction='column' rowGap={2}>
          <Divider />
          {detailActions}
        </Stack>
      )}
    </Paper>
  );
};

export default DetailTemplate;
