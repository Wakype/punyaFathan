import { useMutation } from '@tanstack/react-query';
import { useNotification } from '../../../components';
import axiosClient from '../../../Api/url';

export const useAuthService = () => {
  const { toastSuccess, toastError, toastWarning } = useNotification();

  const useLogin = () => {
    const { mutate, isLoading } = useMutation(
      (payload) => {
        return axiosClient.post('/auth/login', payload);
      },
      {
        onSuccess: async (response) => {
          toastSuccess(response.data.message);
          console.log('ini dia', response);

        //  set cookies disini
        },
        onError: (error) => {
          if (error.response.status === 422) {
            toastWarning(error.response.data.message);
          } else {
            toastError();
            alert(error.response.data.message);
          }
        },
        onSettled: (respose) => {},
      }
    );

    return { mutate, isLoading };
  };
  const useLupaPassword = () => {
    const { mutate, isLoading } = useMutation(
      (payload) => {
        return axiosClient.post('/auth/lupa-password', payload);
      },
      {
        onSuccess: async (response) => {
          toastSuccess(response.data.message);
          console.log('ini dia', response);
        },
        onError: (error) => {
          if (error.response.status === 422) {
            toastWarning(error.response.data.message);
          } else {
            toastError();
            alert(error.response.data.message);
          }
        },
        onSettled: (respose) => {},
      }
    );

    return { mutate, isLoading };
  };

  const useResetPassword = () => {
    const { mutate, isLoading } = useMutation(
      (payload, id, token) => {
        return axiosClient.post(`/auth/reset-password/${id}/${token}`, payload);
      },
      {
        onSuccess: async (response) => {
          toastSuccess(response.data.message);
          console.log('ini dia', response);
        },
        onError: (error) => {
          if (error.response.status === 422) {
            toastWarning(error.response.data.message);
          } else {
            toastError();
            alert(error.response.data.message);
          }
        },
        onSettled: (respose) => {},
      }
    );

    return { mutate, isLoading };
  };

  return { useLogin, useResetPassword, useLupaPassword };
};
