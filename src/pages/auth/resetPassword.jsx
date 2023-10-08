import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from '@chakra-ui/react';
import * as yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { useAuthService } from './services/auth.service';

const ResetPassword = () => {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { useResetPassword } = useAuthService();
  const { isLoading, mutate } = useResetPassword();

  const resetPasswordSchema = yup.object().shape({
    password: yup.string().required('Password tidak boleh kosong'),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref('password'), null],
        'Konfirmasi password harus sama dengan password'
      )
      .required('Konfirmasi password tidak boleh kosong'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...resetPasswordSchema.getDefault(),
    },
    onSubmit: async (values) => {
      return navigate('/');

      // mutate(values, {
      //   onSuccess: () => {
      //     resetForm();
      //     setValues(resetPasswordSchema.getDefault());
      // return navigate('/');
      //   },
      // });
    },
    validationSchema: resetPasswordSchema,
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
            Reset Password
          </h1>
        </div>

        <div className="w-[60%]">
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              <VStack w="100%" spacing={5}>
                <FormControl isInvalid={!!errors?.password}>
                  <FormLabel
                    color="#3B82F6"
                    htmlFor="password"
                    fontWeight="semibold"
                  >
                    Password
                  </FormLabel>
                  <InputGroup>
                    <Input
                      className="w-full"
                      type={show ? 'text' : 'password'}
                      id="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="************"
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={() => {
                          setShow(!show);
                        }}
                      >
                        {show ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>

                  <FormErrorMessage
                    size={'xs'}
                    color={'red'}
                    fontWeight="normal"
                  >
                    {errors?.password}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors?.confirmPassword}>
                  <FormLabel
                    color="#3B82F6"
                    htmlFor="password"
                    fontWeight="semibold"
                  >
                    Konfirmasi Password
                  </FormLabel>
                  <InputGroup>
                    <Input
                      className="w-full"
                      type={show ? 'text' : 'password'}
                      id="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="************"
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={() => {
                          setShow(!show);
                        }}
                      >
                        {show ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>

                  <FormErrorMessage
                    size={'xs'}
                    color={'red'}
                    fontWeight="normal"
                  >
                    {errors?.confirmPassword}
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
                  Reset Password
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

export default ResetPassword;
