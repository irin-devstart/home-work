import { GREY } from '@common/constants';
import { Divider, Paper, Stack, Typography } from '@mui/material';
import React from 'react';

interface ContentTemplateProps {
  title: string;
  subTitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}
const ContentTemplate = ({
  title,
  subTitle,
  action,
  children
}: ContentTemplateProps) => {
  return (
    <Paper
      elevation={1}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: 2,
        minHeight: '100vh',
        p: '1em'
      }}
    >
      <Stack alignItems='center ' justifyContent='space-between'>
        <Typography variant='h5'>{title}</Typography>
        <Stack>{action}</Stack>
      </Stack>
      <Divider />
      <Typography variant='subtitle1' color={GREY}>
        {subTitle}
      </Typography>

      {children}
    </Paper>
  );
};

export default ContentTemplate;
