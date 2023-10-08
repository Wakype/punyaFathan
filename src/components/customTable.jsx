import React, { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
} from '@chakra-ui/react';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  FaAngleLeft,
  FaAngleRight,
  FaRegPenToSquare,
  FaTrash,
} from 'react-icons/fa6';

const CustomTable = ({ columns, data, actionColumn = false, actionData, onUpdate, onDelete, isLoading, isDisabled }) => {
  const [page, setPage] = useState(1);

  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  //   useReactTable({
  //     columns,
  //     data,
  //   });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full h-full overflow-y-scroll">
      {/* <TableContainer>
        <Table
          // variant="striped"
          // colorScheme="telegram"
          className="table"
          {...getTableProps()}
        >
          <Thead>
            {headerGroups.map((headerGroup, i) => (
              <Tr className="text-white" {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th
                    className="text-white bg-primary"
                    color={'#ffffff'}
                    {...column.getHeaderProps()}
                  >
                    {column.render('Header')}
                  </Th>
                ))}
                {actionColumn && (
                  <Th className="text-white bg-primary" color={'#ffffff'}>
                    Action
                  </Th>
                )}
              </Tr>
            ))}
          </Thead>

          <Tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <Td className="text-primary" {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </Td>
                  ))}
                  {actionColumn && (
                    <Td className="text-primary" color={'#ffffff'}>
                      {actionData}
                    </Td>
                  )}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer> */}

      <TableContainer className="mb-5 border border-secondary rounded-lg">
        <Table>
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th key={header.id} className="bg-secondary">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </Th>
                  );
                })}
                {actionColumn && (
                  <Th className="text-white bg-secondary" color={'#ffffff'}>
                    Action
                  </Th>
                )}
              </Tr>
            ))}
          </Thead>

          <Tbody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Tr key={row.id} className="">
                  {row.getVisibleCells().map((cell) => (
                    <Td key={cell.id} className="">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  ))}
                  {actionColumn && (
                    <Td className="" color={'#ffffff'}>
                      <div className="flex w-full flex-col space-y-2">
                        <Button
                          width={'full'}
                          type="button"
                          isLoading={isLoading}
                          isDisabled={isDisabled}
                          h="35px"
                          backgroundColor={'yellow.500'}
                          color={'#ffffff'}
                          _hover={{ bgColor: 'yellow.600' }}
                          fontSize={12}
                          onClick={() => onUpdate(row.original?.id)}
                        >
                          <FaRegPenToSquare color="#ffffff" />
                        </Button>
                        <Button
                          width={'full'}
                          type="button"
                          isLoading={isLoading}
                          isDisabled={isDisabled}
                          h="35px"
                          backgroundColor={'red.500'}
                          color={'#ffffff'}
                          _hover={{ bgColor: 'red.600' }}
                          fontSize={12}
                          onClick={() => onDelete(row.original?.id)}
                        >
                          <FaTrash color="#ffffff" />
                        </Button>
                      </div>
                    </Td>
                  )}
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={columns.length} className="h-24 text-center">
                  No results.
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>

      <section>
        <div className="flex items-center space-x-5">
          <div
            className="rounded-lg p-2 bg-secondary cursor-pointer"
            onClick={() => {
              table.previousPage();
              if (page === 1) {
                return;
              }
              return setPage(page - 1);
            }}
          >
            <FaAngleLeft color="#ffffff" />
          </div>
          <p className="text-secondary text-[20px]">{page}</p>
          <div
            className="rounded-lg p-2 bg-secondary cursor-pointer"
            onClick={() => {
              table.nextPage();
              return setPage(page + 1);
            }}
          >
            <FaAngleRight color="#ffffff" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomTable;
