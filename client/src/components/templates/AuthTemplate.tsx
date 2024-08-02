import { LocalGroceryStoreRounded } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import React from 'react';

interface AuthTemplateProps {
  logoUrl: string;
  title: string;
  children: React.ReactNode;
}
const AuthTemplate = ({ logoUrl, title, children }: AuthTemplateProps) => {
  return (
    <Stack
      direction='column'
      rowGap={2}
      sx={{
        p: '3em 1em'
      }}
    >
      <Stack flexGrow={1} justifyContent='center'>
        <LocalGroceryStoreRounded
          color='primary'
          sx={{
            fontSize: '5em'
          }}
        />
      </Stack>

      <Typography variant='subtitle1'>{title}</Typography>
      {children}
    </Stack>
  );
};

export default AuthTemplate;
