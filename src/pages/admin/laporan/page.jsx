import React, { useMemo, useState } from 'react';
import fakeData from './MOCK_DATA.json';
import useLaporanModule from './service.jsx/laporan.service';
import { Button, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { CustomTable } from '../../../components';

const Laporan = () => {
  const { useGetLaporan, useGetDetailLaporan } = useLaporanModule();
  const {
    data: dataLaporan,
    isError: isErrorLaporan,
    isFetching: isFetchingLaporan,
    isLoading: isLoadingLaporan,
    refetch: refetchLaporan,
  } = useGetLaporan();
  const {
    data: dataDetail,
    isError: isErrorDetail,
    isFetching: isFetchingDetail,
    isLoading: isLoadingDetail,
    refetch: refetchDetail,
  } = useGetLaporan();

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

  return (
    <div className="w-full">
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
              // onClick={() => onOpenCreate()}
              backgroundColor={'#1B62D6'}
              _hover={{ backgroundColor: '#3B82F6' }}
            >
              Filter
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full rounded-lg overflow-hidden mb-5">
        <CustomTable
          columns={columns}
          data={data}
          // isLoading={isLoadingDelete || isLoadingUser}
          // isDisabled={isLoadingDelete || isLoadingUser}
        />
      </section>
    </div>
  );
};

export default Laporan;
