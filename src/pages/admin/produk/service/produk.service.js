import { useNotification } from '../../../../components';
import axiosClient from '../../../../Api/url';
import { useQuery } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

const useProdukModule = () => {
  const { toastSuccess, toastError, toastWarning } = useNotification();

  const useGetProduk = () => {
    const getBarang = async () => {
      return axiosClient.get('/barang/list').then((res) => res.data);
    };

    const { data, isFetching, isLoading, isError, refetch } = useQuery({
      queryKey: ['/barang/list'],
      queryFn: () => getBarang(),
    });

    return { data, isFetching, isLoading, isError, refetch };
  };

  const useGetDetailProduk = (id) => {
    const getDetail = async () => {
      return axiosClient.get(`/barang/detail/${id}`).then((res) => res.data);
    };

    const { data, isError, isFetching, isLoading, refetch } = useQuery(
      ['/barang/detail', id],
      () => getDetail(),
      {
        enabled: !!id,
      }
    );

    return { data, isError, isFetching, isLoading, refetch };
  };

  const useTambahProduk = () => {
    const { mutate, isLoading } = useMutation(
      async (payload) => {
        try {
          const response = await axiosClient.post('/barang/create', payload, {
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

  const useUpdateProduk = () => {
    const { mutate, isLoading } = useMutation(
      async ({ id, payload }) => {
        try {
          const response = await axiosClient.put(
            `/barang/update/${id}`,
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

  const useDeleteProduk = () => {
    const { mutate, isLoading } = useMutation(
      async (id) => {
        try {
          const response = await axiosClient.delete(`/barang/delete/${id}`);
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
    useGetProduk,
    useTambahProduk,
    useGetDetailProduk,
    useUpdateProduk,
    useDeleteProduk,
  };
};

export default useProdukModule;
