import { SUSCESS } from '@common/constants';
import { Chart, FilterDate } from '@components/organisms';
import { ContentTemplate, MainTemplate } from '@components/templates';
import { Paper, Typography } from '@mui/material';

import React from 'react';
const generateData = [
  {
    date: '01',
    pending: 0,
    done: 0
  },
  {
    date: '02',
    pending: 0,
    done: 0
  },
  {
    date: '03',
    pending: 0,
    done: 0
  },
  {
    date: '04',
    pending: 0,
    done: 0
  },
  {
    date: '05',
    pending: 0,
    done: 0
  },
  {
    date: '06',
    pending: 0,
    done: 0
  },
  {
    date: '07',
    pending: 0,
    done: 0
  },
  {
    date: '08',
    pending: 0,
    done: 0
  },
  {
    date: '9',
    pending: 0,
    done: 0
  },
  {
    date: '10',
    pending: 0,
    done: 0
  },
  {
    date: '11',
    pending: 0,
    done: 0
  },
  {
    date: '12',
    pending: 0,
    done: 0
  },
  {
    date: '13',
    pending: 0,
    done: 0
  },
  {
    date: '14',
    pending: 0,
    done: 0
  },
  {
    date: '15',
    pending: 0,
    done: 0
  },
  {
    date: '16',
    pending: 0,
    done: 0
  },
  {
    date: '17',
    pending: 0,
    done: 0
  },
  {
    date: '18',
    pending: 0,
    done: 0
  },
  {
    date: '19',
    pending: 0,
    done: 0
  },
  {
    date: '20',
    pending: 0,
    done: 0
  },
  {
    date: '21',
    pending: 0,
    done: 0
  },
  {
    date: '22',
    pending: 328000,
    done: 0
  },
  {
    date: '23',
    pending: 0,
    done: 0
  },
  {
    date: '24',
    pending: 0,
    done: 0
  },
  {
    date: '25',
    pending: 0,
    done: 0
  },
  {
    date: '26',
    pending: 0,
    done: 0
  },
  {
    date: '27',
    pending: 0,
    done: 0
  },
  {
    date: '28',
    pending: 0,
    done: 0
  },
  {
    date: '29',
    pending: 0,
    done: 0
  },
  {
    date: '30',
    pending: 0,
    done: 0
  },
  {
    date: '31',
    pending: 4,
    done: 2000000000
  }
];
const Dashboard = () => {
  return (
    <MainTemplate title='Beranda' subTitle='Home'>
      <ContentTemplate
        title='Grafik Order'
        subTitle='Dari tanggal 01 Januari 2014 - 02 januari 2024'
        action={
          <FilterDate
            columnGap={2}
            startDateProps={{
              value: '2024-03-21',
              label: 'Tanggal Mulai'
            }}
            endDateProps={{
              value: '2024-10-01',
              label: 'Tanggal Akhir'
            }}
          />
        }
      >
        <Chart
          data={generateData}
          seriesProps={{
            name: 'done',
            color: SUSCESS,
            valueField: 'done',
            argumentField: 'date'
          }}
        />
      </ContentTemplate>
    </MainTemplate>
  );
};

export default Dashboard;
