import { WebRoute } from '@common/constants';
import { Table } from '@components/organisms';
import { TTableColumn } from '@components/organisms/Table';
import { ContentTemplate, MainTemplate } from '@components/templates';
import { usePagination } from '@hooks';
import { Add, MoreVert } from '@mui/icons-material';
import { Button, IconButton, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CustomerList = () => {
  const navigate = useNavigate();
  const { setCount, resetPage, onPageCustomChange, ...pagination } =
    usePagination();

  const columns: Array<TTableColumn<Customer>> = [
    {
      id: 'name',
      label: 'Nama',
      setFilterContent: () => {
        return <TextField placeholder='Pencarian Nama' />;
      },
      setContent: (data) => {
        return <Typography>{data.name}</Typography>;
      }
    },

    {
      id: 'phone',
      label: 'No Hp',
      setFilterContent: () => {
        return <TextField placeholder='Pencarian No Hp' />;
      },
      setContent: (data) => {
        return <Typography>{data.phone}</Typography>;
      }
    },
    {
      id: 'address',
      label: 'Alamat',
      setFilterContent: () => {
        return <TextField placeholder='Pencarian Alamat' />;
      },
      setContent: (data) => {
        return <Typography>{data.address}</Typography>;
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
  return (
    <MainTemplate title='Pelanggan' subTitle='Home'>
      <ContentTemplate
        title='Data Pelanggan'
        subTitle='Dari tanggal 01 Januari 2014 - 02 januari 2024'
        action={
          <Button
            startIcon={<Add />}
            onClick={() => navigate(WebRoute.customer.create)}
          >
            Tambah Pelanggan
          </Button>
        }
      >
        <Table
          pagination={pagination}
          resource={{
            isLoading: false,
            isFetching: false,
            data: [
              {
                id: 0,
                name: 'Martin Tangkilisan',
                phone: '087871745038',
                address: 'BANTEN'
              },
              {
                id: 0,
                name: 'Lilis santoso',
                phone: '081325925 957',
                address: 'SOLO'
              },
              {
                id: 0,
                name: 'joristin',
                phone: '085299912112',
                address: 'KENDARI'
              },
              {
                id: 0,
                name: 'Hj iis ',
                phone: '085779922228',
                address: 'BOGOR'
              },
              {
                id: 0,
                name: 'Irta Sarita',
                phone: '082168283744',
                address: 'KARO'
              },
              {
                id: 0,
                name: 'Desak Putu Suhartini',
                phone: '081347217795',
                address: 'SUKMAJAYA'
              },
              {
                id: 0,
                name: 'Arutila',
                phone: '08112406043',
                address: 'INDRAMAYU'
              },
              {
                id: 0,
                name: 'Maya',
                phone: '087781947776',
                address: 'BANDUNG'
              },
              {
                id: 0,
                name: 'ugiarti',
                phone: '082133436062',
                address: 'DOMPU'
              },
              {
                id: 0,
                name: 'Sumira',
                phone: '082186418910',
                address: 'BANYUASIN'
              },
              {
                id: 0,
                name: 'Agustina',
                phone: '0813 6325 1850',
                address: 'PARIAMAN'
              },
              {
                id: 0,
                name: 'evlin sinatra',
                phone: '0811791598',
                address: 'BANDAR LAMPUNG'
              },
              {
                id: 0,
                name: 'wati',
                phone: '082215655559',
                address: 'SUBANG'
              },
              {
                id: 0,
                name: 'ibu marni',
                phone: '081919604805',
                address: 'LOMBOK'
              },
              {
                id: 0,
                name: 'Suartini',
                phone: '082337022973',
                address: 'GIANYAR'
              },
              {
                id: 0,
                name: 'Sudarmadji ',
                phone: '081227788708',
                address: 'PROBOLINGGO'
              },
              {
                id: 0,
                name: 'm’ba Anis ',
                phone: '081779140308',
                address: 'BANDUNG'
              },
              {
                id: 0,
                name: 'Murni',
                phone: '083803034666',
                address: 'BELITUNG'
              },
              {
                id: 0,
                name: 'Deshendrawati ',
                phone: '0852 6599 5662 ',
                address: 'PEKANBARU'
              },
              {
                id: 0,
                name: 'Rahayu Nirmala',
                phone: '087880550967',
                address: 'DENPASAR UTARA'
              }
            ]
          }}
          columns={columns}
        />
      </ContentTemplate>
    </MainTemplate>
  );
};

export default CustomerList;
