import { TTableColumn } from '@common/typings';
import { TableCell, TableHead, TableRow } from '@mui/material';

interface TableHeaderProps<TData> {
  columns: Array<TTableColumn<TData>>;
  useCollapse?: boolean;
}

const TableHeader = <TData,>({
  useCollapse,
  columns
}: TableHeaderProps<TData>) => {
  return (
    <TableHead>
      <TableRow>
        {useCollapse && <TableCell component='td' />}
        {columns.map((column) => {
          const { id, label, ...props } = column;
          return (
            <TableCell key={id as string} {...props}>
              {label}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
