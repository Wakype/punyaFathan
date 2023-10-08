import React, { useState } from 'react';
import { CustomButton, CustomInput } from '../../components';
import { Link, useNavigate, useRoutes } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import * as yup from 'yup';
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
import { useAuthService } from './services/auth.service';

const Login = () => {
  const [show, setShow] = useState(false);
  const { useLogin } = useAuthService();
  const { mutate, isLoading } = useLogin();
  let navigate = useNavigate();

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .default('')
      .required('Email tidak boleh kosong')
      .email('Gunakan Format Email'),
    password: yup.string().default('').required('Passowrd tidak boleh kosong'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...loginSchema.getDefault(),
    },
    onSubmit: async (values) => {
      return navigate('/admin/dashboard');

      // mutate(values, {
      //   onSuccess: () => {
      //     resetForm();
      //     setValues(loginSchema.getDefault());
      //     return navigate('/admin/dashboard')
      //   },
      // });
    },
    validationSchema: loginSchema,
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
      <section className="w-[50%] h-full">
        <img
          src="https://e1.pxfuel.com/desktop-wallpaper/617/391/desktop-wallpaper-1920x1080-anime-building-school-cafeteria-sunshine-anime-school.jpg"
          alt=""
          className="w-full h-full"
        />
      </section>

      <section className="w-[50%] h-full flex flex-col items-center justify-center">
        <div className="mb-[50px]">
          <h1 className="text-[25px] uppercase font-bold bg-blue-500 text-white px-7 py-2 rounded-lg">
            Login
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
                <div className="w-full">
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
                  <div className="w-full text-right mt-2">
                    <Link className="" to={'lupa-password'}>Lupa password</Link>
                  </div>
                </div>

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
                  Login
                </Button>
              </VStack>
            </Form>
          </FormikProvider>
        </div>
      </section>
    </div>
  );
};

export default Login;
