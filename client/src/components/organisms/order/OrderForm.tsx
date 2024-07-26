import {
  OrderInteraction,
  OrderStatus,
  PaymentMethod
} from '@common/constants';
import { FormActions } from '@components/molecules';
import {
  Autocomplete,
  Box,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import React from 'react';

const OrderForm = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        rowGap: 2
      }}
    >
      <Stack gap={2}>
        <Stack flex={1} direction='column' gap={2}>
          <Typography variant='h6'>Informasi Customer</Typography>

          <Autocomplete
            options={[
              {
                label: 'Irin Saputra'
              }
            ]}
            fullWidth
            renderInput={(params) => (
              <TextField {...params} label='Nama Customer' />
            )}
          />

          <Stack columnGap={1} alignItems='center'>
            <TextField label='No. Hp' fullWidth />

            <Autocomplete
              options={[
                {
                  label: 'Indonesia'
                }
              ]}
              fullWidth
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label='Negara' />}
            />
          </Stack>
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

          <Typography variant='h6'>Detail Order</Typography>
          <Stack columnGap={1} alignItems='center'>
            <TextField
              label='Tanggal Order'
              fullWidth
              type='date'
              value={'01/01/2024'}
            />
            <TextField label='Interaksi' fullWidth select>
              {Object.values(OrderInteraction).map((interaction) => (
                <MenuItem key={interaction} value={interaction}>
                  {interaction}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          <Stack columnGap={1} alignItems='center'>
            <TextField label='Metode Pembayaran' fullWidth select>
              {Object.values(PaymentMethod).map((method) => (
                <MenuItem key={method} value={method}>
                  {method}
                </MenuItem>
              ))}
            </TextField>
            <TextField label='Cash Back' fullWidth />
          </Stack>
        </Stack>
        <Stack flex={1} direction='column' gap={2}>
          <Typography variant='h6'>Total & Pajak</Typography>
          <Stack columnGap={1} alignItems='center'>
            <TextField label='Profit Kotor' fullWidth />
            <TextField label='Propit Bersih' fullWidth />
          </Stack>
          <Stack
            columnGap={1}
            alignItems='center'
            sx={{
              pt: '.3em'
            }}
          >
            <TextField label='Omset' fullWidth />
            <TextField label='Ongkir' fullWidth />
          </Stack>

          <Stack columnGap={1} alignItems='center'>
            <TextField label='Omset (Konversi)' fullWidth />
            <TextField label='Ongkir (Konversi)' fullWidth />
          </Stack>
          <Stack columnGap={1} alignItems='center'>
            <TextField label='Pajak COD' fullWidth />
            <TextField label='Pajak WHT' fullWidth />
            <TextField label='Pajak PPH 21' fullWidth />
          </Stack>
        </Stack>
      </Stack>
      <Stack rowGap={2}>
        <Typography variant='h6'>Daftar Produk</Typography>
        <TextField></TextField>
      </Stack>
      <Stack direction='column' rowGap={2}>
        <Divider />

        <FormActions
          cancelLabel='Kembali'
          submitLabel='Simpan Order'
          onSubmit={() => alert('AJAADAD')}
          onCancel={() => alert('sdsd')}
        />
      </Stack>
    </Box>
  );
};

export default OrderForm;
