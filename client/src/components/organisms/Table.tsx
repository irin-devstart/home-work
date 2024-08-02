import { WHITE } from '@common/constants';
import { TableFilter, TableFooter, TableHeader } from '@components/molecules';
import { KeyboardArrowDownRounded } from '@mui/icons-material';
import {
  Paper,
  TableContainer,
  Table as MuiTable,
  TableProps as MuiTableProps,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  TablePagination,
  TablePaginationProps,
  TableCellProps
} from '@mui/material';
import React, { useState } from 'react';

export interface TTableColumn<TData> extends Omit<TableCellProps, 'id'> {
  id: keyof TData;
  label: string | JSX.Element;
  setFilterContent?: () => JSX.Element;
  setFooterContent?: () => JSX.Element;
  setContent: (data: TData, index?: number) => JSX.Element;
}

interface TableProps<TData, TCollapse> extends Omit<MuiTableProps, 'resource'> {
  resource: {
    isLoading: boolean;
    isFetching: boolean;
    data: Array<TData>;
  };
  columns: Array<TTableColumn<TData>>;
  pagination?: TablePaginationProps;
  collapseColumns?: {
    data: Array<TCollapse>;
    columns: Array<TTableColumn<TCollapse>>;
    isLoading?: boolean;
    colSpan: number;
    getValue: (item: TData) => void;
  };
}
const Table = <TData extends { id: number }, TCollapse extends { id: number }>(
  props: TableProps<TData, TCollapse>
) => {
  const { columns, resource, pagination, collapseColumns, ...tableProps } =
    props;
  const [clickedId, setClickedId] = useState(0);
  const [isExpand, setIsExpand] = useState(false);
  const { isLoading, isFetching, data } = resource;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <MuiTable {...tableProps}>
          <TableHeader columns={columns} useCollapse={!!collapseColumns} />
          <TableFilter columns={columns} useCollapse={!!collapseColumns} />
          <TableBody>
            {isLoading ? (
              <>Loading</>
            ) : data.length > 0 ? (
              data.map((item) => {
                return (
                  <React.Fragment key={item.id}>
                    <TableRow>
                      {collapseColumns && (
                        <TableCell sx={{ width: '.5em' }}>
                          <IconButton
                            aria-label='expand row'
                            size='small'
                            onClick={() => {
                              setClickedId(item.id);
                              setIsExpand((prev) => {
                                return clickedId === item.id ? !prev : true;
                              });
                              collapseColumns.getValue(item);
                            }}
                          >
                            <KeyboardArrowDownRounded
                              sx={{
                                transition: 'all .3s ease-in-out',
                                ...{
                                  rotate:
                                    isExpand && clickedId === item.id
                                      ? '-180deg'
                                      : 0
                                }
                              }}
                            />
                          </IconButton>
                        </TableCell>
                      )}
                      {columns.map((column, index) => {
                        const { id, setContent, ...prev } = column;
                        return (
                          <TableCell key={id as string} {...prev}>
                            {setContent(item, index)}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                    {collapseColumns && (
                      <TableRow
                        sx={{
                          backgroundColor: WHITE
                        }}
                      >
                        <TableCell
                          colSpan={collapseColumns.colSpan}
                          sx={{ paddingBlock: 0 }}
                        >
                          <Collapse
                            in={isExpand && clickedId === item.id}
                            timeout='auto'
                            unmountOnExit
                          >
                            {
                              <MuiTable>
                                <TableHeader
                                  columns={collapseColumns.columns}
                                />
                                <TableBody>
                                  {collapseColumns.isLoading ? (
                                    <>Loading</>
                                  ) : collapseColumns?.data?.length > 0 ? (
                                    collapseColumns.data.map((collapseItem) => {
                                      return (
                                        <TableRow>
                                          {collapseColumns.columns.map(
                                            (collapseColumn, index) => {
                                              const {
                                                id,
                                                setContent,
                                                ...prev
                                              } = collapseColumn;
                                              return (
                                                <TableCell
                                                  key={id as string}
                                                  {...prev}
                                                >
                                                  {setContent(
                                                    collapseItem,
                                                    index
                                                  )}
                                                </TableCell>
                                              );
                                            }
                                          )}
                                        </TableRow>
                                      );
                                    })
                                  ) : (
                                    <>Kosong</>
                                  )}
                                </TableBody>
                              </MuiTable>
                            }
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              <>Data Kosong</>
            )}
          </TableBody>
          <TableFooter columns={columns} useCollapse={!!collapseColumns} />
        </MuiTable>
      </TableContainer>

      {pagination && (
        <TablePagination
          rowsPerPageOptions={[10, 15, 25, 50, 100]}
          component='div'
          {...pagination}
        />
      )}
    </Paper>
  );
};

export default Table;
