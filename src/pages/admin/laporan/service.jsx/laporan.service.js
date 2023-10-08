import { useQuery } from '@chakra-ui/react';
import axiosClient from '../../../../Api/url';
import { useNotification } from '../../../../components';

const useLaporanModule = () => {
  const { toastSuccess, toastError, toastWarning } = useNotification();

  const useGetLaporan = () => {
    const getLaporan = async () => {
      return axiosClient.get('/laporan/list').then((res) => res.data);
    };

    const { data, isFetching, isLoading, isError, refetch } = useQuery({
      queryKey: ['/laporan/list'],
      queryFn: () => getLaporan(),
    });

    return { data, isFetching, isLoading, isError, refetch };
  };

  const useGetDetailLaporan = (id) => {
    const getDetail = async () => {
      return axiosClient.get(`/laporan/detail/${id}`).then((res) => res.data);
    };

    const { data, isError, isFetching, isLoading, refetch } = useQuery(
      ['/laporan/detail', id],
      () => getDetail(),
      {
        enabled: !!id,
      }
    );

    return { data, isError, isFetching, isLoading, refetch };
  };

  return { useGetDetailLaporan, useGetLaporan };
};

export default useLaporanModule;