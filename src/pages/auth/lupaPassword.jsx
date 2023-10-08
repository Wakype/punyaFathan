import React from 'react';
import { useAuthService } from './services/auth.service';
import * as yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { useNavigate } from 'react-router';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';

const LupaPassword = () => {
  let navigate = useNavigate();
  const { useLupaPassword } = useAuthService();
  const { mutate, isLoading } = useLupaPassword();

  const lupaPasswordSchema = yup.object().shape({
    email: yup
      .string()
      .default('')
      .required('Email tidak boleh kosong')
      .email('Gunakan Format Email'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...lupaPasswordSchema.getDefault(),
    },
    onSubmit: async (values) => {
      return navigate('/reset-password/:id/:token');

      // mutate(values, {
      //   onSuccess: () => {
      //     resetForm();
      //     setValues(lupaPasswordSchema.getDefault());
      // return navigate('/reset-password/:id/:token');
      //   },
      // });
    },
    validationSchema: lupaPasswordSchema,
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
    <div className="w-full h-screen flex">
      <section className="w-[50%] h-full flex flex-col items-center justify-center">
        <div className="mb-[50px]">
          <h1 className="text-[25px] uppercase font-bold bg-blue-500 text-white px-7 py-2 rounded-lg">
            Lupa Password
          </h1>
        </div>

        <div className="w-[60%]">
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              <VStack w="100%" spacing={5}>
                <FormControl isInvalid={!!errors?.email}>
                  <FormLabel
                    color="#3B82F6"
                    htmlFor="email"
                    fontWeight="semibold"
                  >
                    Email
                  </FormLabel>
                  <Input
                    id="email"
                    type="text"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Ketik email"
                  />

                  <FormErrorMessage color={'red'} fontWeight="normal">
                    {errors?.email}
                  </FormErrorMessage>
                </FormControl>

                <Button
                  className="mt-10"
                  type="submit"
                  width={'100%'}
                  height={10}
                  borderRadius={10}
                  isLoading={isLoading}
                  isDisabled={isLoading}
                  color={'white'}
                  backgroundColor={'#3B82F6'}
                  _hover={{ backgroundColor: '#1B62D6' }}
                >
                  Kirim Email
                </Button>
              </VStack>
            </Form>
          </FormikProvider>
        </div>
      </section>

      <section className="w-[50%] h-full">
        <img
          src="https://e1.pxfuel.com/desktop-wallpaper/617/391/desktop-wallpaper-1920x1080-anime-building-school-cafeteria-sunshine-anime-school.jpg"
          alt=""
          className="w-full h-full"
        />
      </section>
    </div>
  );
};

export default LupaPassword;
