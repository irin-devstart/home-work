import { formatCurrency } from '@common/utils';
import { Paper, Stack, Typography } from '@mui/material';
import React from 'react';

export interface CardTotalProps {
  title: string;
  icon: React.ReactNode;
  totalOrder: number;
  totalPrice: number;
  textColor: string;
}
const CardTotal = ({
  title,
  icon,
  totalOrder,
  totalPrice,
  textColor
}: CardTotalProps) => {
  return (
    <Paper
      sx={{
        flex: 1,
        p: 1,
        display: 'flex',
        columnGap: 2,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {icon}
      <Stack flexDirection='column'>
        <Typography variant='h5' fontWeight={600}>
          {title}
        </Typography>
        <Typography>Total Order: {totalOrder} </Typography>
        <Typography color={textColor} fontWeight={500}>
          {formatCurrency(totalPrice)}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default CardTotal;
