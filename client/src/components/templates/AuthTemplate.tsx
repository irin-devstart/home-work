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
      rowGap={1}
      sx={{
        p: '2em 1em'
      }}
    >
      <Stack flexGrow={1} justifyContent='center'>
        <div
          style={{
            background: 'blue',
            width: '100px',
            height: '100px'
          }}
        />
      </Stack>

      <Typography variant='subtitle1'>{title}</Typography>
      {children}
    </Stack>
  );
};

export default AuthTemplate;
