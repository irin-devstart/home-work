import { queryKeys } from '@common/constants';
import { DashboardContent, FilterDate } from '@components/organisms';
import { ContentTemplate, MainTemplate } from '@components/templates';
import { getPaginatedCustomersService } from '@service/CustomerService';
import { getPaginatedOrdersService } from '@service/OrderService';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const Dashboard = () => {
  const getOrderList = useQuery({
    queryKey: [queryKeys.order],
    queryFn: () => {
      return getPaginatedOrdersService(0, 100);
    }
  });

  const getCustomerList = useQuery({
    queryKey: [queryKeys.customer],
    queryFn: () => {
      return getPaginatedCustomersService(0, 100);
    }
  });

  return (
    <MainTemplate title='Dashboard' subTitle='Home'>
      <ContentTemplate
        title='Show Order Visualization'
        subTitle='Data displayed from August 1, 2024 to August 31, 2024'
        action={
          <FilterDate
            columnGap={2}
            startDateProps={{
              value: '2024-08-01',
              label: 'Date Start'
            }}
            endDateProps={{
              value: '2024-08-31',
              label: 'Date End'
            }}
          />
        }
      >
        <DashboardContent
          getOrderList={getOrderList}
          getCustomerList={getCustomerList}
        />
      </ContentTemplate>
    </MainTemplate>
  );
};

export default Dashboard;
