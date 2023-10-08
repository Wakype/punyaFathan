import { SearchIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import {
  CustomInput,
  CustomModal,
  CustomSelect,
  CustomTable,
} from '../../../components';
import fakeData from './MOCK_DATA.json';
import * as yup from 'yup';
import { useFormik } from 'formik';
import useUserModule from './service/user.service';

const User = () => {
  const [idUser, setidUser] = useState(undefined);
  const {
    useDeleteUser,
    useGetDetailUser,
    useGetUser,
    useTambahUser,
    useUpdateUser,
  } = useUserModule();

  const {
    data: dataUser,
    isError: isErrorUser,
    isFetching: isFetchingUser,
    isLoading: isLoadingUser,
    refetch: refetchUser,
  } = useGetUser();
  const {
    data: dataDetail,
    isError: isErrorDetail,
    isFetching: isFetchingDetail,
    isLoading: isLoadingDetail,
    refetch: refetchDetail,
  } = useGetDetailUser(idUser);
  const { isLoading: isLoadingDelete, mutate: mutateDelete } = useDeleteUser();
  const { isLoading: isLoadingCreate, mutate: mutateCreate } = useTambahUser();
  const { isLoading: isLoadingUpdate, mutate: mutateUpdate } = useUpdateUser();

  const {
    isOpen: isOpenCreate,
    onOpen: onOpenCreate,
    onClose: onCloseCreate,
  } = useDisclosure();
  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure();

  const onDelete = async (id) => {
    console.log('id delete', id);

    return mutateDelete(id, {
      onSuccess: () => {
        return refetchUser();
      },
    });
  };

  const option = [
    {
      value: 1,
      label: 'Admin',
    },
    {
      value: 2,
      label: 'Petugas',
    },
  ];

  const data = useMemo(() => fakeData || [], [fakeData]);
  const columns = [
    {
      Header: 'ID',
      accessorKey: 'id',
    },
    {
      Header: 'Avatar',
      accessorKey: 'avatar',
      cell: ({ value }) => {
        return <Avatar src={value} name={value} />;
      },
    },
    {
      Header: 'first_name',
      accessorKey: 'first_name',
    },
    {
      Header: 'last_name',
      accessorKey: 'last_name',
    },
    {
      Header: 'Email',
      accessorKey: 'email',
    },
    {
      Header: 'Gender',
      accessorKey: 'gender',
    },
    {
      Header: 'University',
      accessorKey: 'university',
    },
  ];

  const createUserSchema = yup.object().shape({
    nama: yup.string().default('').required('Nama tidak boleh kosong'),
    email: yup
      .string()
      .default('')
      .required('Email tidak boleh kosong')
      .email('Gunakan Format Email'),
    password: yup.string().default('').required('Passowrd tidak boleh kosong'),
    file_create: yup.mixed().nullable().default(undefined),
    role: yup.mixed().nullable().default(0).required('Wajib pilih'),
  });
  const updateUserSchema = yup.object().shape({
    nama: yup
      .string()
      .default(dataDetail?.data.nama ?? '')
      .required('Nama tidak boleh kosong'),
    email: yup
      .string()
      .default(dataDetail?.data.email ?? '')
      .required('Email tidak boleh kosong')
      .email('Gunakan Format Email'),
    file_create: yup
      .mixed()
      .nullable()
      .default(dataDetail?.data.avatar ?? ''),
    role: yup
      .mixed()
      .nullable()
      .default(dataDetail?.data.role ?? '')
      .required('Wajib pilih'),
  });

  const formikCreate = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...createUserSchema.getDefault(),
    },
    onSubmit: async (values) => {
      console.log('values create', values);

      mutateCreate(values, {
        onSuccess: () => {
          resetForm();
          setValues(createUserSchema.getDefault());
        },
      });
      return onCloseCreate();
    },
    validationSchema: createUserSchema,
  });
  const formikUpdate = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...updateUserSchema.getDefault(),
    },
    onSubmit: async (values) => {
      console.log('values update', values);

      mutateUpdate(
        { idUser, values },
        {
          onSuccess: () => {
            resetFormUpdate();
            setValuesUpdate(updateUserSchema.getDefault());
          },
        }
      );
      return onCloseUpdate();
    },
    validationSchema: updateUserSchema,
  });

  const {
    handleChange,
    handleSubmit,
    setFieldValue,
    handleBlur,
    values,
    errors,
    resetForm,
    setValues,
  } = formikCreate;
  const {
    handleChange: handleChangeUpdate,
    handleSubmit: handleSubmitUpdate,
    setFieldValue: setFieldValueUpdate,
    handleBlur: handleBlurUpdate,
    values: valuesUpdate,
    errors: errorsUpdate,
    resetForm: resetFormUpdate,
    setValues: setValuesUpdate,
  } = formikUpdate;

  return (
    <div className="w-full">
      <>
        <CustomModal
          isOpen={isOpenCreate}
          onClose={onCloseCreate}
          title={'Tambah User'}
          formikProviderValue={formikCreate}
          handleSubmit={handleSubmit}
        >
          <div className="flex h-full w-full items-center space-x-5 rounded-[10px] bg-secondary p-5 mb-7">
            <div className="flex items-center">
              {values.file_create ? (
                <Avatar
                  size="xl"
                  name=""
                  src={URL.createObjectURL(values.file_create)}
                />
              ) : (
                <Avatar size="xl" name="" src="" />
              )}
            </div>
            <div className="flex flex-col items-start">
              <input
                className="w-fit cursor-pointer text-white"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]; // Use optional chaining to handle null
                  if (file) {
                    // Check file size
                    if (file.size > 10 * 1024 * 1024) {
                      alert('File size exceeds 10 MB.');
                      return;
                    }

                    // Set the image source and display file size
                    setFieldValue('file_create', file);
                  }
                }}
              />
              {values.file_create && (
                <span className="text-white">
                  {(values.file_create.size / (1024 * 1024)).toFixed(2)} MB
                </span>
              )}
            </div>
          </div>
          <div className="space-y-3">
            <CustomInput
              id="nama"
              title="Nama"
              type="text"
              values={values.nama}
              handleChange={handleChange}
              handleBlur={handleBlur}
              isInvalid={!!errors?.nama}
              errorMessage={errors?.nama}
              backgroundColor="#ffffff"
            />
            <CustomInput
              id="email"
              title="Email"
              type="email"
              values={values.email}
              handleChange={handleChange}
              handleBlur={handleBlur}
              isInvalid={!!errors?.email}
              errorMessage={errors?.email}
              backgroundColor="#ffffff"
            />
            <CustomInput
              id="password"
              title="Password"
              type="password"
              values={values.password}
              handleChange={handleChange}
              handleBlur={handleBlur}
              isInvalid={!!errors?.password}
              errorMessage={errors?.password}
              backgroundColor="#ffffff"
            />
            <CustomSelect
              id="role"
              title="Role"
              size={'lg'}
              values={values.role}
              handleChange={handleChange}
              handleBlur={handleBlur}
              isInvalid={!!errors?.role}
              errorMessage={errors?.role}
              backgroundColor="#ffffff"
            >
              {option.map((_, i) => {
                return (
                  <option value={_.value} key={i}>
                    {_.label}
                  </option>
                );
              })}
            </CustomSelect>
          </div>
        </CustomModal>

        <CustomModal
          isOpen={isOpenUpdate}
          onClose={onCloseUpdate}
          title={'Update User'}
          formikProviderValue={formikUpdate}
          handleSubmit={handleSubmitUpdate}
        >
          <div className="flex h-full w-full items-center space-x-5 rounded-[10px] bg-secondary p-5 mb-7">
            <div className="flex items-center">
              {values.file_create ? (
                <Avatar
                  size="xl"
                  name=""
                  src={URL.createObjectURL(valuesUpdate.file_create)}
                />
              ) : (
                <Avatar size="xl" name="" src="" />
              )}
            </div>
            <div className="flex flex-col items-start">
              <input
                className="w-fit cursor-pointer text-white"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]; // Use optional chaining to handle null
                  if (file) {
                    // Check file size
                    if (file.size > 10 * 1024 * 1024) {
                      alert('File size exceeds 10 MB.');
                      return;
                    }

                    // Set the image source and display file size
                    setFieldValue('file_create', file);
                  }
                }}
              />
              {valuesUpdate.file_create && (
                <span className="text-white">
                  {(valuesUpdate.file_create.size / (1024 * 1024)).toFixed(2)}{' '}
                  MB
                </span>
              )}
            </div>
          </div>
          <div className="space-y-3">
            <CustomInput
              id="nama"
              title="Nama"
              type="text"
              values={valuesUpdate.nama}
              handleChange={handleChangeUpdate}
              handleBlur={handleBlurUpdate}
              isInvalid={!!errorsUpdate?.nama}
              errorMessage={errorsUpdate?.nama}
              backgroundColor="#ffffff"
            />
            <CustomInput
              id="email"
              title="Email"
              type="email"
              values={valuesUpdate.email}
              handleChange={handleChangeUpdate}
              handleBlur={handleBlurUpdate}
              isInvalid={!!errorsUpdate?.email}
              errorMessage={errorsUpdate?.email}
              backgroundColor="#ffffff"
            />
            <CustomSelect
              id="role"
              title="Role"
              size={'lg'}
              values={valuesUpdate.role}
              handleChange={handleChangeUpdate}
              handleBlur={handleBlurUpdate}
              isInvalid={!!errorsUpdate?.role}
              errorMessage={errorsUpdate?.role}
              backgroundColor="#ffffff"
            >
              {option.map((_, i) => {
                return (
                  <option value={_.value} key={i}>
                    {_.label}
                  </option>
                );
              })}
            </CustomSelect>
          </div>
        </CustomModal>
      </>

      <section className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-[10px] h-[10px] bg-black rounded-full"></div>
          <h1 className="uppercase font-bold text-[25px]">User</h1>
        </div>
        <div className="flex items-center space-x-5">
          <div>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="#1B62D6" />
              </InputLeftElement>
              <Input
                id="search"
                type="search"
                transition="all 600ms ease-in-out"
                variant={'filled'}
                width={'400px'}
                color={'black'}
                // value={values.email}
                // onChange={handleChange}
                // onBlur={handleBlur}
                placeholder="Ketik sesuatu..."
                border={'1px solid #1B62D6'}
                _hover={{
                  border: '1px solid #3B82F6',
                  transition: 'all 300ms ease-in-out',
                  width: '500px',
                }}
              />
            </InputGroup>
          </div>
          <div>
            <Button
              onClick={() => onOpenCreate()}
              backgroundColor={'#1B62D6'}
              _hover={{ backgroundColor: '#3B82F6' }}
            >
              Tambah User
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full rounded-lg overflow-hidden mb-5">
        <CustomTable
          columns={columns}
          data={data}
          actionColumn
          onDelete={(id) => onDelete(id)}
          onUpdate={(id) => {
            setidUser(id);
            onOpenUpdate();
          }}
          // isLoading={isLoadingDelete || isLoadingUser}
          // isDisabled={isLoadingDelete || isLoadingUser}
        />
      </section>
    </div>
  );
};

export default User;
