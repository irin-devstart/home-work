import { TTableColumn } from '@components/organisms/Table';
import { TableCell, TableBody, TableRow } from '@mui/material';

interface TableFilterProps<TData> {
  useCollapse?: boolean;
  columns: Array<TTableColumn<TData>>;
}

const TableFilter = <TData,>({
  useCollapse,
  columns
}: TableFilterProps<TData>) => {
  if (columns.every((column) => !column.setFilterContent)) return;
  return (
    <TableBody>
      <TableRow>
        {useCollapse && <TableCell component='td' />}
        {columns.map((column) => {
          if (column.setFilterContent) {
            return (
              <TableCell component='td'>{column.setFilterContent()}</TableCell>
            );
          }
          return <TableCell component='td' />;
        })}
      </TableRow>
    </TableBody>
  );
};

export default TableFilter;
