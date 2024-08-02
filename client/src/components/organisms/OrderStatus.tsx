import { ERROR, INFO, orderStatus, SUSCESS } from '@common/constants';
import { Stack, styled, Typography } from '@mui/material';
import React from 'react';

interface OrderStatusProps {
  status: OrderStatus;
}
const TBackgrounds: Record<OrderStatus, string> = {
  PENDING: ERROR,
  DELIVERY: INFO,
  SHIPPED: SUSCESS
};

export const StyledContainer = styled(Stack, {
  shouldForwardProp: (prop) => prop !== 'status'
})<OrderStatusProps>(({ theme, status }) => ({
  background: TBackgrounds[status],
  padding: '.4em 1em',
  borderRadius: '.5em'
}));

const OrderStatus = ({ status }: OrderStatusProps) => {
  return (
    <StyledContainer status={status} justifyContent='center'>
      <Typography variant='h6' color='white'>
        {orderStatus[status]}
      </Typography>
    </StyledContainer>
  );
};

export default OrderStatus;
