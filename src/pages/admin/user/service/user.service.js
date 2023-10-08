import { useNotification } from '../../../../components';
import axiosClient from '../../../../Api/url';
import { useMutation, useQuery } from '@tanstack/react-query';

const useUserModule = () => {
  const { toastSuccess, toastError, toastWarning } = useNotification();

  const useGetUser = () => {
    const getUser = async () => {
      return axiosClient.get('/user/list').then((res) => res.data);
    };

    const { data, isFetching, isLoading, isError, refetch } = useQuery({
      queryKey: ['/user/list'],
      queryFn: () => getUser(),
    });

    return { data, isFetching, isLoading, isError, refetch };
  };

  const useGetDetailUser = (id) => {
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

  const useTambahUser = () => {
    const { mutate, isLoading } = useMutation(
      async (payload) => {
        try {
          const response = await axiosClient.post('/user/create', payload, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

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
  const useUpdateUser = () => {
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

  const useDeleteUser = () => {
    const { mutate, isLoading } = useMutation(
      async (id) => {
        try {
          const response = await axiosClient.delete(`/user/delete/${id}`);
          console.log('res', response);
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

  return {
    useDeleteUser,
    useGetDetailUser,
    useGetUser,
    useTambahUser,
    useUpdateUser,
  };
};

export default useUserModule;
