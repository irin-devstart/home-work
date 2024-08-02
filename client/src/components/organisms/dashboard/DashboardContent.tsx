import {
  ERROR,
  GREY,
  INFO,
  orderStatus,
  SUSCESS,
  userRole
} from '@common/constants';
import {
  CardTotal,
  CardTotalProps,
  ColorInformation
} from '@components/molecules';
import {
  AccessTimeFilled,
  CheckCircleRounded,
  ReceiptRounded
} from '@mui/icons-material';
import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { capitalizeFirstLetter } from '@common/utils';
import { UseQueryResult } from '@tanstack/react-query';
import { useUser } from '@contexts/UserContenx';
import { RoleBasedAccess } from '@components/layouts';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DashboardContentProps {
  getOrderList: UseQueryResult<PaginatedResponse<Order[]>, Error>;
  getCustomerList: UseQueryResult<PaginatedResponse<Customer[]>, Error>;
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

const DashboardContent = ({
  getOrderList,
  getCustomerList
}: DashboardContentProps) => {
  const { user } = useUser();
  // TODO: Create Api for get data for order total and chart
  const getTotalPrice = (status: OrderStatus) => {
    const total = (getOrderList.data?.rows ?? [])
      .filter((order) => {
        return order.status === status;
      })
      .reduce((total, order) => {
        return total + order.totalPrice;
      }, 0);
    return total;
  };

  const getTotalOrder = (status: OrderStatus) => {
    const total = (getOrderList.data?.rows ?? []).filter((order) => {
      return order.status === status;
    }).length;
    return total;
  };

  const getTotalPriceDataSet = () => {
    const dataSets = Object.values(orderStatus).map((status) => {
      const getTotalByStatus = getTotalPrice(status);
      return getTotalByStatus;
    });

    return dataSets;
  };

  const getTotalOrderByCustomers = () => {
    const dataSets = (getCustomerList.data?.rows ?? []).map((customer) => {
      const getTotalByStatus = (getOrderList.data?.rows ?? []).filter(
        (order) => {
          return order.customerId === customer.id;
        }
      ).length;
      return {
        customerName: customer.name,
        totalOrder: getTotalByStatus
      };
    });

    return dataSets;
  };

  const orderTotals: Array<CardTotalProps> = [
    {
      title: 'Pending',
      icon: (
        <ReceiptRounded
          color='error'
          sx={{
            fontSize: '4em'
          }}
        />
      ),
      totalOrder: getTotalOrder('PENDING'),
      totalPrice: getTotalPrice('PENDING'),
      textColor: ERROR
    },
    {
      title: 'Delivery',
      icon: (
        <CheckCircleRounded
          color='info'
          sx={{
            fontSize: '4em'
          }}
        />
      ),
      totalOrder: getTotalOrder('DELIVERY'),
      totalPrice: getTotalPrice('DELIVERY'),
      textColor: INFO
    },
    {
      title: 'Shipped',
      icon: (
        <AccessTimeFilled
          color='success'
          sx={{
            fontSize: '4em'
          }}
        />
      ),
      totalOrder: getTotalOrder('SHIPPED'),
      totalPrice: getTotalPrice('SHIPPED'),
      textColor: SUSCESS
    }
  ];

  const barChartData = {
    labels: Object.values(orderStatus).map((status) => {
      return capitalizeFirstLetter(status);
    }),
    datasets: [
      {
        label: 'Total Price',
        data: getTotalPriceDataSet(),
        backgroundColor: INFO,
        borderColor: GREY,
        borderWidth: 1
      }
    ]
  };

  const lineChartData = {
    labels: getTotalOrderByCustomers().map((customer) => customer.customerName),
    datasets: [
      {
        label: 'Total Order',
        data: getTotalOrderByCustomers().map((customer) => customer.totalOrder),
        backgroundColor: INFO,
        borderColor: GREY,
        borderWidth: 1
      }
    ]
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: 2
      }}
    >
      <Stack columnGap={2}>
        {orderTotals.map((orderTotal, index) => (
          <CardTotal key={index} {...orderTotal} />
        ))}
      </Stack>

      <RoleBasedAccess allowedRoles={[userRole.MANAGER]} userRole={user.role}>
        <Paper
          sx={{
            p: 2
          }}
        >
          <Stack flexDirection='column' rowGap={2}>
            <Stack justifyContent='space-between'>
              <Typography variant='h6'>Order Statistics</Typography>
              <Stack alignItems='center' columnGap={2}>
                <ColorInformation label='Total Price' color={INFO} />
              </Stack>
            </Stack>
            <Divider />
            <Bar data={barChartData} options={options} />
          </Stack>
        </Paper>
      </RoleBasedAccess>

      <Paper
        sx={{
          p: 2
        }}
      >
        <Stack flexDirection='column' rowGap={2}>
          <Stack justifyContent='space-between'>
            <Typography variant='h6'>Customer Statistics</Typography>
            <Stack alignItems='center' columnGap={2}>
              <ColorInformation label='Total Order' color={INFO} />
            </Stack>
          </Stack>
          <Divider />
          <Line data={lineChartData} options={options} />
        </Stack>
      </Paper>
    </Box>
  );
};

export default DashboardContent;
