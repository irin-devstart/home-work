import { Box, Stack, TextField } from '@mui/material';
import React from 'react';

const ProductForm = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Stack gap={2}>
        <Stack flex={1} direction='column' gap={2}>
          <TextField label='Nama Produk' fullWidth />

          <Stack columnGap={1} alignItems='center'>
            <TextField label='No. Hp' fullWidth />
            <TextField label='Email' fullWidth />
          </Stack>
        </Stack>
        <Stack flex={1} direction='column' gap={2}>
          <TextField
            label='Alamat'
            fullWidth
            minRows={3}
            multiline
            InputProps={{
              sx: {
                height: '5.8em'
              }
            }}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default ProductForm;
