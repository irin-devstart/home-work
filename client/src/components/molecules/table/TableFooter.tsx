import { TTableColumn } from '@components/organisms/Table';
import { TableCell, TableBody, TableRow } from '@mui/material';

interface TableFooterProps<TData> {
  useCollapse?: boolean;
  columns: Array<TTableColumn<TData>>;
}

const TableFooter = <TData,>({
  useCollapse,
  columns
}: TableFooterProps<TData>) => {
  if (columns.every((column) => !column.setFooterContent)) return;
  return (
    <TableBody>
      <TableRow>
        {useCollapse && <TableCell component='td' />}
        {columns.map((column) => {
          const { id, setFooterContent, ...prev } = column;
          if (setFooterContent) {
            return (
              <TableCell component='td' key={id.toString()} {...prev}>
                {setFooterContent()}
              </TableCell>
            );
          }
          return <TableCell component='td' />;
        })}
      </TableRow>
    </TableBody>
  );
};

export default TableFooter;
