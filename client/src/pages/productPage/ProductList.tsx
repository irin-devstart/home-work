import { WebRoute } from '@common/constants';
import { Table } from '@components/organisms';
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
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const data = [
  {
    id: 0,
    name: 'D-VINE',
    imageUrl:
      'https://img.ws.mms.shopee.co.id/ecd45020347d4fffb24376d5f802435f',
    price: [
      {
        id: 0,
        currency: 'idr',
        country: 'INDONESIA',
        price: 2131239
      },
      {
        id: 0,
        currency: 'myr',
        country: 'MALAYSIA',
        price: 2131239
      },
      {
        id: 0,
        currency: 'sgd',
        country: 'SINGAPURA',
        price: 2131239
      },
      {
        id: 0,
        currency: 'sar',
        country: 'ARAB SAUDI',
        price: 2131239
      }
    ]
  },
  {
    id: 1,
    name: 'S-GLOW',
    imageUrl:
      'https://img.ws.mms.shopee.co.id/ecd45020347d4fffb24376d5f802435f',
    price: [
      {
        id: 0,
        currency: 'idr',
        country: 'INDONESIA',
        price: 2131239
      }
    ]
  },
  {
    id: 2,
    name: 'E-VITE',
    imageUrl:
      'https://img.ws.mms.shopee.co.id/ecd45020347d4fffb24376d5f802435f',
    price: [
      {
        id: 0,
        currency: 'idr',
        country: 'INDONESIA',
        price: 2131239
      }
    ]
  },
  {
    id: 3,
    name: 'M-COLL',
    imageUrl:
      'https://img.ws.mms.shopee.co.id/ecd45020347d4fffb24376d5f802435f',
    price: [
      {
        id: 0,
        currency: 'idr',
        country: 'INDONESIA',
        price: 2131239
      }
    ]
  }
];
const ProductList = () => {
  const navigate = useNavigate();
  const [productId, setProductId] = useState<number>(0);
  const { setCount, resetPage, onPageCustomChange, ...pagination } =
    usePagination();
  const columns: Array<TTableColumn<Product>> = [
    {
      id: 'name',
      label: 'Nama Produk',
      setFilterContent: () => {
        return <TextField placeholder='Pencarian Produk' />;
      },
      setContent: (data) => {
        return (
          <Stack alignItems='center' columnGap={1}>
            <img src={data.imageUrl} alt='' width={40} height={40} />
            <Typography fontWeight={600}>{data.name}</Typography>
          </Stack>
        );
      }
    },
    {
      id: 'id',
      label: 'Aksi',
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

  const collapseColumns: Array<TTableColumn<Product['price'][number]>> = [
    {
      id: 'country',
      label: 'Negara',
      setContent: (data) => {
        return <Typography>{data.country}</Typography>;
      }
    },
    {
      id: 'currency',
      label: 'Mata Uang',
      align: 'center',
      setContent: (data) => {
        return <Typography>{data.currency}</Typography>;
      }
    },
    {
      id: 'price',
      label: 'Harga',
      align: 'right',
      setContent: (data) => {
        return <Typography>{data.price}</Typography>;
      }
    }
  ];

  return (
    <MainTemplate title='Produk' subTitle='Home'>
      <ContentTemplate
        title='Data Produk'
        subTitle='Dari tanggal 01 Januari 2014 - 02 januari 2024'
        action={
          <Button
            startIcon={<Add />}
            onClick={() => navigate(WebRoute.product.create)}
          >
            Tambah Produk
          </Button>
        }
      >
        <Table
          pagination={pagination}
          collapseColumns={{
            colSpan: 3,
            getValue(item) {
              setProductId(item.id);
            },
            isLoading: false,
            data: data.find((dt) => dt.id === productId)?.price ?? [],
            columns: collapseColumns
          }}
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

export default ProductList;
