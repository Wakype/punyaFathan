import { useNotification } from '../../../../components';
import axiosClient from '../../../../Api/url';
import { useQuery } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

const useProfileModule = () => {
  const { toastSuccess, toastError, toastWarning } = useNotification();

  const useGetProfile = (id) => {
    const getDetail = async () => {
      return axiosClient.get(`/user/detail/${id}`).then((res) => res.data);
    };

    const { data, isError, isFetching, isLoading, refetch } = useQuery(
      ['/user/detail', id],
      () => getDetail(),
      {
        enabled: !!id,
      }
    );

    return { data, isError, isFetching, isLoading, refetch };
  };

  const useUpdateProfile = () => {
    const { mutate, isLoading } = useMutation(
      async ({ id, payload }) => {
        try {
          const response = await axiosClient.put(
            `/user/update/${id}`,
            payload,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );
          return response;
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message);
        },
        onError: (error) => {
          console.error('error', error);
          toastError();
        },
      }
    );

    return { mutate, isLoading };
  };

  return { useGetProfile, useUpdateProfile };
};

export default useProfileModule;
