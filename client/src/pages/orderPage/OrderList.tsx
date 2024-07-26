import { WebRoute } from '@common/constants';
import { FilterDate, Table } from '@components/organisms';
import { TTableColumn } from '@components/organisms/Table';
import { ContentTemplate, MainTemplate } from '@components/templates';
import { usePagination } from '@hooks';
import { Add, MoreVert } from '@mui/icons-material';
import {
  Button,
  IconButton,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const data: Array<Order> = [
  {
    id: 0,
    orderId: '1342568',
    customer: {
      id: 0,
      name: 'Endang Lestari',
      address: 'KUTAI TIMUR',
      phone: '087817700001'
    },
    cashBack: 2300,
    CODTax: 3240,
    currency: 'idr',
    paymentMethod: 'COD',
    interaction: 'R',
    customerService: {
      id: 9,
      name: 'ADED'
    },
    date: new Date(),
    grossProfit: 457000,
    netProfit: 426666,
    ppnCODTax: 3234,

    turnover: 980000,
    shipping: 23000,
    product: [
      {
        id: 0,
        price: 500000,
        totalPrice: 500000,
        qty: 1,
        product: {
          id: 0,
          name: 'D-VINE'
        }
      }
    ],
    receipt: 'JO0208346325',
    status: 'TERKIRIM',
    WHTTax: 0,
    returnShippingCosts: 0
  }
];
const OrderList = () => {
  const navigate = useNavigate();
  const { setCount, resetPage, onPageCustomChange, ...pagination } =
    usePagination();

  const columns: Array<TTableColumn<Order>> = [
    {
      id: 'orderId',
      label: 'ID Order',
      width: '15%',
      setFilterContent: () => {
        return <TextField placeholder='Pencarian Produk' />;
      },
      setContent: (data) => {
        return <Typography>{data.orderId}</Typography>;
      }
    },
    {
      id: 'customer',
      label: 'Nama Customer',
      width: '15%',
      setFilterContent: () => {
        return <TextField placeholder='Pencarian Produk' />;
      },
      setContent: (data) => {
        return <Typography>{data.customer?.name}</Typography>;
      }
    },

    {
      id: 'date',
      label: 'Tanggal',
      width: '15%',
      setContent: (data) => {
        return <Typography>4 February 2024</Typography>;
      }
    },
    {
      id: 'interaction',
      label: 'Interaksi',
      width: '10%',
      setFilterContent: () => {
        return <TextField placeholder='Pencarian Produk' />;
      },
      setContent: (data) => {
        return <Typography>{data.interaction}</Typography>;
      }
    },
    {
      id: 'status',
      label: 'Status',
      width: '10%',
      setFilterContent: () => {
        return <TextField placeholder='Pencarian Produk' />;
      },
      setContent: (data) => {
        return <Typography>{data.status}</Typography>;
      }
    },
    {
      id: 'grossProfit',
      label: 'Profit Kotor',
      width: '15%',

      setContent: (data) => {
        return <Typography>{data.grossProfit}</Typography>;
      }
    },
    {
      id: 'netProfit',
      label: 'Profit Bersih',
      width: '15%',

      setContent: (data) => {
        return <Typography>{data.netProfit}</Typography>;
      }
    },

    {
      id: 'id',
      label: 'Aksi',
      width: '5%',
      align: 'right',
      setContent: () => {
        return (
          <IconButton sx={{ mr: '-.55em' }}>
            <MoreVert />
          </IconButton>
        );
      }
    }
  ];

  //   const collapseColumns: Array<TTableColumn<>> = [
  //     {
  //       id: 'country',
  //       label: 'Negara',
  //       setContent: (data) => {
  //         return <Typography>{data.country}</Typography>;
  //       }
  //     },
  //     {
  //       id: 'currency',
  //       label: 'Mata Uang',
  //       align: 'center',
  //       setContent: (data) => {
  //         return <Typography>{data.currency}</Typography>;
  //       }
  //     },
  //     {
  //       id: 'price',
  //       label: 'Harga',
  //       align: 'right',
  //       setContent: (data) => {
  //         return <Typography>{data.price}</Typography>;
  //       }
  //     }
  //   ];

  return (
    <MainTemplate title='Penjualan' subTitle='Home'>
      <ContentTemplate
        title='Data Penjualan'
        subTitle='Dari tanggal 01 Januari 2014 - 02 januari 2024'
        action={
          <Stack columnGap={2}>
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
            <Button
              startIcon={<Add />}
              onClick={() => navigate(WebRoute.order.create)}
            >
              Tambah Penjualan
            </Button>
          </Stack>
        }
      >
        <Table
          sx={{
            minWidth: '85vw'
          }}
          pagination={pagination}
          //   collapseColumns={{
          //     colSpan: 3,
          //     getValue(item) {
          //       console.log('Item');
          //     },
          //     isLoading: false,
          //     data: [
          //       { id: 0, jk: 'Irin' },
          //       { id: 1, jk: 'Irin' }
          //     ],
          //     columns: [
          //       {
          //         id: 'jk',
          //         label: 'sf,s,fsf',
          //         setContent: () => {
          //           return <>HAsil</>;
          //         }
          //       }
          //     ]
          //   }}
          resource={{
            isLoading: false,
            isFetching: false,
            data: data
          }}
          columns={columns}
        />
      </ContentTemplate>
    </MainTemplate>
  );
};

export default OrderList;
