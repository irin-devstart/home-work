import React, { useState } from 'react';

interface TReturnPagination {
  page: number;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  resetPage: () => void;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPageCustomChange: (newPage: number) => void;
}
interface TOption {
  defaultPage: number;
  defaultRowsPerPage: number;
}
const usePagination = (options?: Partial<TOption>): TReturnPagination => {
  const [page, setPage] = useState<number>(options?.defaultPage ?? 0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(
    options?.defaultRowsPerPage ?? 10
  );
  const [count, setCount] = useState<number>(0);

  const onPageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const onRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onPageCustomChange = (newPage: number) => {
    setPage(newPage);
  };

  const resetPage = () => {
    setPage(options?.defaultPage ?? 0);
    setRowsPerPage(options?.defaultRowsPerPage ?? 10);
  };

  return {
    page,
    count,
    setCount,
    resetPage,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
    onPageCustomChange
  };
};

export default usePagination;
