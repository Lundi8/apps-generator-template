import React from 'react';
import useStyles from './style';
import { method } from '../../../../utils';
import { Table, TableBody, TableRow, Typography } from '@material-ui/core';
import ContainerRounded from '../../../../components/ContainerRounded';
import TableHead from './TableHead';
import TableCell from './TableCell';
import TablePagination from './TablePagination';
import EditableData from '../../../../components/EditableData';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

export default ({ dataList = [], editList = [] }) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [open, setOpen] = React.useState(false);
  const [editable, setEditable] = React.useState(dataList[0] ? dataList[0] : {});

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleChangeRowsPerPage = val => {
    setRowsPerPage(val);
    setPage(0);
  };

  const handleEditable = obj => evt => {
    console.log(obj);
    setEditable(obj);
    setOpen(true);
  };
  const handleClose = evt => {
    setOpen(false);
  };

  if (!dataList.length) {
    return (
      <ContainerRounded m={6}>
        <div className={classes.empty}>
          <Typography color='error'>No data available yet...</Typography>
        </div>
      </ContainerRounded>
    );
  }

  let columns = Object.keys(dataList[0]);

  return (
    <ContainerRounded m={6}>
      <div className={classes.table}>
        <Table stickyHeader size='small'>
          <TableHead
            columns={columns}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={dataList.length}
            classes={classes}
          />
          <TableBody>
            {stableSort(dataList, getSorting(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, iRow) => {
                return (
                  <TableRow
                    className={classes.row}
                    hover
                    key={method.keygen(iRow)}
                    onClick={handleEditable(row)}
                  >
                    {columns.map((column, iCol) => {
                      return (
                        <TableCell
                          key={method.keygen()}
                          value={row[column]}
                          row={iRow}
                          // column={iCol}
                          // enabled={a.row !== iRow && edit.col !== iCol && edit.value}
                          // isEditable={editList.includes(column)}
                        />
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        page={page}
        rowsPerPage={rowsPerPage}
        totalRows={dataList.length}
        onPage={setPage}
        onRowsPerPage={handleChangeRowsPerPage}
      />
      <EditableData {...editable} open={open} onclose={handleClose} />
    </ContainerRounded>
  );
};
