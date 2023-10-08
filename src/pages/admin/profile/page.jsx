import React from 'react';
import * as yup from 'yup';
import useProfileModule from './service/profile.service';
import { Form, FormikProvider, useFormik } from 'formik';
import { Avatar, Button } from '@chakra-ui/react';
import { CustomInput } from '../../../components';

const Profile = () => {
  const { useGetProfile, useUpdateProfile } = useProfileModule();
  const { data, isError, isFetching, isLoading, refetch } = useGetProfile();
  const { isLoading: isLoadingMutate, mutate } = useUpdateProfile();

  const profileSchema = yup.object().shape({
    nama: yup
      .string()
      .default(data?.data.nama ?? '')
      .required('Nama tidak boleh kosong'),
    email: yup
      .string()
      .default(data?.data.email ?? '')
      .required('Email tidak boleh kosong')
      .email('Gunakan Format Email'),
    avatar: yup
      .mixed()
      .nullable()
      .default(data?.data.avatar ?? ''),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...profileSchema.getDefault(),
    },
    onSubmit: async (values) => {
      console.log('values update', values);

      mutate(
        { data, values },
        {
          onSuccess: () => {
            resetForm();
            setValues(profileSchema.getDefault());
          },
        }
      );
      return refetch();
    },
    validationSchema: profileSchema,
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
  } = formik;
  return (
    <div className="w-full">
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <div className="w-full grid grid-cols-7 gap-x-10">
            <section className="bg-secondary rounded-lg w-full h-fit col-span-3 flex justify-center items-center">
              <div className="flex w-full items-center space-x-5 rounded-[10px] bg-secondary p-5">
                <div className="flex items-center">
                  {values.avatar ? (
                    <Avatar
                      size="xl"
                      name=""
                      src={URL.createObjectURL(values.avatar)}
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
                        setFieldValue('avatar', file);
                      }
                    }}
                  />
                  {values.avatar && (
                    <span className="text-white">
                      {(values.avatar.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  )}
                </div>
              </div>
            </section>

            <section className="flex flex-col col-span-4 bg-secondary rounded-lg w-full p-10 space-y-5">
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
              <Button
                className="mt-10"
                width={'100%'}
                backgroundColor={'white'}
                color={'#1B62D6'}
                _hover={{ backgroundColor: '#3B82F6', color: 'white' }}
                type="submit"
              >
                Simpan
              </Button>
            </section>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default Profile;
