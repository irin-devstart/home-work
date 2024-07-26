import { GREY } from '@common/constants';
import { Stack, Typography } from '@mui/material';
import React from 'react';

interface MainTemplateProps {
  title: string;
  subTitle?: string;
  breadcrumb?: boolean;
  children: React.ReactNode;
}
const MainTemplate = ({
  title,
  subTitle,
  breadcrumb,
  children
}: MainTemplateProps) => {
  return (
    <Stack
      flexGrow={1}
      direction='column'
      rowGap={2}
      sx={{
        m: '1em 0 2em'
      }}
    >
      <Stack direction='column' rowGap={1}>
        <Typography variant='h1'>{title}</Typography>
        {subTitle && (
          <Typography variant='h6' color={GREY}>
            {subTitle}
          </Typography>
        )}

        {breadcrumb && (
          <Typography variant='h6' color={GREY}>
            breadcrumb
          </Typography>
        )}
      </Stack>
      {children}
    </Stack>
  );
};

export default MainTemplate;
