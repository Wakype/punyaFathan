import React, { useMemo, useState } from 'react';
import useProdukModule from './service/produk.service';
import {
  Avatar,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
} from '@chakra-ui/react';
import fakeData from './MOCK_DATA.json';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { CustomInput, CustomModal, CustomTable } from '../../../components';
import { SearchIcon } from '@chakra-ui/icons';

const Produk = () => {
  const [idProduk, setIdProduk] = useState(undefined);
  const {
    useGetProduk,
    useTambahProduk,
    useUpdateProduk,
    useDeleteProduk,
    useGetDetailProduk,
  } = useProdukModule();

  const {
    data: dataProduk,
    isError: isErrorProduk,
    isFetching: isFetchingProduk,
    isLoading: isLoadingProduk,
    refetch: refetchProduk,
  } = useGetProduk();
  const {
    data: dataDetail,
    isError: isErrorDetail,
    isFetching: isFetchingDetail,
    isLoading: isLoadingDetail,
    refetch: refetchDetail,
  } = useGetDetailProduk();
  const { isLoading: isLoadingCreate, mutate: mutateCreate } =
    useTambahProduk();
  const { isLoading: isLoadingUpdate, mutate: mutateUpdate } =
    useUpdateProduk();
  const { isLoading: isLoadingDelete, mutate: mutateDelete } =
    useDeleteProduk();

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
        return refetchProduk();
      },
    });
  };

  const data = useMemo(() => fakeData || [], [fakeData]);
  const columns = [
    {
      Header: 'ID',
      accessorKey: 'id',
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

  const createProdukSchema = yup.object().shape({
    nama: yup.string().default('').required('Nama tidak boleh kosong'),
    stok: yup.string().default(0).required('Stok tidak boleh kosong'),
    kodeBarang: yup
      .string()
      .default(0)
      .required('Kode Barang tidak boleh kosong'),
    gambar: yup.mixed().nullable().default(undefined),
  });
  const updateProdukSchema = yup.object().shape({
    nama: yup
      .string()
      .default(dataDetail?.data.nama ?? '')
      .required('Nama tidak boleh kosong'),
    stok: yup
      .string()
      .default(dataDetail?.data.stok ?? '')
      .required('Stok tidak boleh kosong'),
    kodeBarang: yup
      .string()
      .default(dataDetail?.data.kodeBarang ?? '')
      .required('Kode Barang tidak boleh kosong'),
    gambar: yup
      .mixed()
      .nullable()
      .default(dataDetail?.data.avatar ?? ''),
  });

  const formikCreate = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...createProdukSchema.getDefault(),
    },
    onSubmit: async (values) => {
      console.log('values create', values);

      mutateCreate(values, {
        onSuccess: () => {
          resetForm();
          setValues(createProdukSchema.getDefault());
        },
      });
      return onCloseCreate();
    },
    validationSchema: createProdukSchema,
  });
  const formikUpdate = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...updateProdukSchema.getDefault(),
    },
    onSubmit: async (values) => {
      console.log('values update', values);

      mutateUpdate(
        { idProduk, values },
        {
          onSuccess: () => {
            resetFormUpdate();
            setValuesUpdate(updateProdukSchema.getDefault());
          },
        }
      );
      return onCloseUpdate();
    },
    validationSchema: updateProdukSchema,
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
          title={'Tambah Produk'}
          formikProviderValue={formikCreate}
          handleSubmit={handleSubmit}
        >
          <div className="flex h-full w-full items-center space-x-5 rounded-[10px] bg-secondary p-5 mb-7">
            <div className="flex items-center">
              {values.gambar ? (
                <Avatar
                  size="xl"
                  name=""
                  src={URL.createObjectURL(values.gambar)}
                />
              ) : (
                <div className="w-[80px] h-[80px] rounded-lg bg-white">
                  No Image.
                </div>
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
                    setFieldValue('gambar', file);
                  }
                }}
              />
              {values.gambar && (
                <span className="text-white">
                  {(values.gambar.size / (1024 * 1024)).toFixed(2)} MB
                </span>
              )}
            </div>
          </div>
          <div className="space-y-3">
            <CustomInput
              id="nama"
              title="Nama Barang"
              type="text"
              values={values.nama}
              handleChange={handleChange}
              handleBlur={handleBlur}
              isInvalid={!!errors?.nama}
              errorMessage={errors?.nama}
              backgroundColor="#ffffff"
            />
            <CustomInput
              id="stok"
              title="Stok Barang"
              type="number"
              values={values.stok}
              handleChange={handleChange}
              handleBlur={handleBlur}
              isInvalid={!!errors?.stok}
              errorMessage={errors?.stok}
              backgroundColor="#ffffff"
            />
            <CustomInput
              id="kodeBarang"
              title="Kode Barang"
              type="number"
              values={values.kodeBarang}
              handleChange={handleChange}
              handleBlur={handleBlur}
              isInvalid={!!errors?.kodeBarang}
              errorMessage={errors?.kodeBarang}
              backgroundColor="#ffffff"
            />
          </div>
        </CustomModal>

        <CustomModal
          isOpen={isOpenUpdate}
          onClose={onCloseUpdate}
          title={'Update produk'}
          formikProviderValue={formikUpdate}
          handleSubmit={handleSubmitUpdate}
        >
          <div className="flex h-full w-full items-center space-x-5 rounded-[10px] bg-secondary p-5 mb-7">
            <div className="flex items-center">
              {valuesUpdate.gambar ? (
                <Avatar
                  size="xl"
                  name={valuesUpdate.nama}
                  src={URL.createObjectURL(valuesUpdate.gambar)}
                />
              ) : (
                <div className="w-[80px] h-[80px] rounded-lg bg-white flex justify-center items-center">
                  <p className="text-black text-[11px]">No Image.</p>
                </div>
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
                    setFieldValueUpdate('gambar', file);
                  }
                }}
              />
              {valuesUpdate.gambar && (
                <span className="text-white">
                  {(valuesUpdate.gambar.size / (1024 * 1024)).toFixed(2)} MB
                </span>
              )}
            </div>
          </div>
          <div className="space-y-3">
            <CustomInput
              id="nama"
              title="Nama Barang"
              type="text"
              values={valuesUpdate.nama}
              handleChange={handleChangeUpdate}
              handleBlur={handleBlurUpdate}
              isInvalid={!!errorsUpdate?.nama}
              errorMessage={errorsUpdate?.nama}
              backgroundColor="#ffffff"
            />
            <CustomInput
              id="stok"
              title="Stok Barang"
              type="number"
              values={valuesUpdate.stok}
              handleChange={handleChangeUpdate}
              handleBlur={handleBlurUpdate}
              isInvalid={!!errorsUpdate?.stok}
              errorMessage={errorsUpdate?.stok}
              backgroundColor="#ffffff"
            />
            <CustomInput
              id="kodeBarang"
              title="Kode Barang"
              type="number"
              values={valuesUpdate.kodeBarang}
              handleChange={handleChangeUpdate}
              handleBlur={handleBlurUpdate}
              isInvalid={!!errorsUpdate?.kodeBarang}
              errorMessage={errorsUpdate?.kodeBarang}
              backgroundColor="#ffffff"
            />
          </div>
        </CustomModal>
      </>

      <section className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-[10px] h-[10px] bg-black rounded-full"></div>
          <h1 className="uppercase font-bold text-[25px]">Produk</h1>
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
              Tambah Produk
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
            setIdProduk(id);
            onOpenUpdate();
          }}
          // isLoading={isLoadingDelete || isLoadingUser}
          // isDisabled={isLoadingDelete || isLoadingUser}
        />
      </section>
    </div>
  );
};

export default Produk;
