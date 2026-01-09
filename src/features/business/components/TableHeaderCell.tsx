import { TableCell, type TableCellProps } from "@mui/material";

export const TableHeaderCell = (props: TableCellProps) => {
  return (
    <TableCell
      sx={{
        fontWeight: 800,
        fontSize: "0.75rem",
        textTransform: "uppercase",
        color: "text.tertiary",
        py: 3,
        px: 5,
        bgcolor: "background.paper",
        ...props.sx,
      }}
      {...props}
    />
  );
};
