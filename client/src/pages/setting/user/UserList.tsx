import { queryKeys } from '@common/constants';
import { truncateString } from '@common/utils';
import { FormActions } from '@components/molecules';
import {
  AlertDialog,
  Drawer,
  OptionsPopup,
  OptionsPopupProps,
  Table,
  UserForm
} from '@components/organisms';
import { TTableColumn } from '@components/organisms/Table';
import { ContentTemplate } from '@components/templates';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useAlertDialog,
  useDrawer,
  useOptionsPopup,
  usePagination
} from '@hooks';
import { Add, DeleteRounded, EditRounded, MoreVert } from '@mui/icons-material';
import {
  Button,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import {
  createUserService,
  deleteUserService,
  getPaginatedUsersService,
  updateUserService,
  updateUserStatusService
} from '@service/UserService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UserDefaultValues, UserSchema } from '@validations/';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const UserList = () => {
  const alertModal = useAlertDialog();
  const queryClient = useQueryClient();
  const { setCount, resetPage, onPageCustomChange, ...pagination } =
    usePagination();
  const { id, handleClose, handleOpen, ...optionsPopupProps } =
    useOptionsPopup();
  const { onOpen, ...drawerProps } = useDrawer();
  const state = useForm<UserForm>({
    resolver: zodResolver(UserSchema),
    defaultValues: UserDefaultValues
  });

  const getUserList = useQuery({
    queryKey: [queryKeys.user],
    queryFn: () => {
      return getPaginatedUsersService(pagination.page, pagination.rowsPerPage);
    }
  });

  const deleteUsers = useMutation({
    mutationFn: deleteUserService,
    onSuccess: () => {
      alertModal.setData({
        open: true,
        type: 'success',
        title: 'Successful!',
        description: 'Successfully Deleted Users',
        actionProps: {
          onClose: () => {
            alertModal.setClose();
            handleClose();
            queryClient.invalidateQueries({ queryKey: [queryKeys.user] });
          }
        }
      });
    },
    onError: (data: { message: string }) => {
      alertModal.setData({
        open: true,
        type: 'error',
        title: 'Failed',
        description: data.message,
        actionProps: {
          onClose: alertModal.setClose
        }
      });
    }
  });

  const createUser = useMutation({
    mutationFn: createUserService,
    onSuccess: () => {
      alertModal.setData({
        open: true,
        type: 'success',
        title: 'Successful!',
        description: 'User data successfully added',
        actionProps: {
          onClose() {
            alertModal.setClose();
            drawerProps.onClose();
          }
        }
      });
      queryClient.invalidateQueries({ queryKey: [queryKeys.user] });
    },
    onError: (data: { message: string }) => {
      alertModal.setData({
        open: true,
        type: 'error',
        title: 'Failed',
        description: data.message,
        actionProps: {
          onClose() {
            alertModal.setClose();
          }
        }
      });
    }
  });

  const updateUser = useMutation({
    mutationFn: (payload: UserForm) => updateUserService(id, payload),
    onSuccess: () => {
      alertModal.setData({
        open: true,
        type: 'success',
        title: 'Successful!',
        description: 'User data successfully updated',
        actionProps: {
          onClose: () => {
            alertModal.setClose();
            drawerProps.onClose();
          }
        }
      });
      queryClient.invalidateQueries({ queryKey: [queryKeys.user] });
    },
    onError: (data: { message: string }) => {
      alertModal.setData({
        open: true,
        type: 'error',
        title: 'Failed',
        description: data.message,
        actionProps: {
          onClose() {
            alertModal.setClose();
          }
        }
      });
    }
  });

  const updateUserStatus = useMutation({
    mutationFn: updateUserStatusService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.user] });
    }
  });

  const onSubmit = state.handleSubmit((data) => {
    if (state.watch('id') === 0) {
      createUser.mutate(data);
    } else {
      updateUser.mutate(data);
    }
  });

  const columns: Array<TTableColumn<User>> = [
    {
      id: 'name',
      label: 'Name',
      setFilterContent: () => {
        return <TextField placeholder='Search name...' />;
      },
      setContent: (data) => {
        return <Typography>{data.name}</Typography>;
      }
    },

    {
      id: 'email',
      label: 'Email Address',
      setFilterContent: () => {
        return <TextField placeholder='Search email address...' />;
      },
      setContent: (data) => {
        return <Typography>{data.email}</Typography>;
      }
    },
    {
      id: 'role',
      label: 'Role',
      setFilterContent: () => {
        return <TextField placeholder='Search Role...' />;
      },
      setContent: (data) => {
        return <Typography>{truncateString(data.role, 20)}</Typography>;
      }
    },
    {
      id: 'isActive',
      label: 'Status',
      setContent: (data) => {
        const labels: Record<string, string> = {
          true: 'Active',
          false: 'Inactive'
        };
        return (
          <FormControlLabel
            control={
              <Switch
                size='small'
                checked={data.isActive}
                onChange={(event) => {
                  const { checked } = event.target;
                  updateUserStatus.mutate({
                    id: data.id,
                    isActive: checked
                  });
                }}
              />
            }
            label={labels[String(data.isActive)]}
          />
        );
      }
    },
    {
      id: 'id',
      label: 'Action',
      align: 'right',
      setContent: (data) => {
        return (
          <IconButton
            sx={{ mr: '-.55em' }}
            onClick={(event) => handleOpen(event, data.id)}
          >
            <MoreVert />
          </IconButton>
        );
      }
    }
  ];

  const optionsList: OptionsPopupProps['options'] = [
    {
      key: 'edit',
      label: 'Edit Users',
      icon: <EditRounded fontSize='small' />,
      onClick: () => {
        const getUser = getUserList.data?.rows.find((user) => {
          return user.id === id;
        });
        state.reset(getUser);
        onOpen();
      }
    },
    {
      key: 'delete',
      label: 'Delete Users',
      icon: <DeleteRounded fontSize='small' />,
      onClick() {
        alertModal.setData({
          open: true,
          type: 'confirm',
          title: 'Confirmation!',
          description: 'Are you sure you want to delete?',
          actionProps: {
            onCancel: alertModal.setClose,
            isLoading: deleteUsers.isPending,
            onSubmit: () => {
              deleteUsers.mutate(id);
            }
          }
        });
      }
    }
  ];

  useEffect(() => {
    setCount(getUserList.data?.count ?? 0);
  }, [getUserList.data]);

  return (
    <ContentTemplate
      title='Data Users'
      action={
        <Button
          startIcon={<Add />}
          onClick={() => onOpen(() => state.reset(UserDefaultValues))}
        >
          Add New User
        </Button>
      }
    >
      <Table
        pagination={pagination}
        resource={{
          isLoading: getUserList.isLoading,
          isFetching: getUserList.isFetching,
          data: getUserList.data?.rows ?? []
        }}
        columns={columns}
      />
      <AlertDialog {...alertModal.alertDialog} />
      <OptionsPopup
        {...optionsPopupProps}
        options={optionsList}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      />

      <Drawer
        {...drawerProps}
        title={state.watch('id') === 0 ? 'Add New User' : 'Update Data User'}
        anchor='right'
      >
        <Stack
          flexDirection='column'
          sx={{
            width: '40vw'
          }}
          rowGap={2}
        >
          <UserForm state={state} />
          <FormActions
            isSubmitLoading={
              state.watch('id') === 0
                ? createUser.isPending
                : updateUser.isPending
            }
            cancelLabel='Cancel'
            submitLabel={state.watch('id') === 0 ? 'Create' : 'Update'}
            onSubmit={onSubmit}
            onCancel={drawerProps.onClose}
          />
        </Stack>
      </Drawer>
    </ContentTemplate>
  );
};

export default UserList;
