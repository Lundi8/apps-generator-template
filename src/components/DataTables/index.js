import React from 'react';
import useStyles from './style';
import { method } from '../../utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from '@material-ui/core';
import { Done, Clear } from '@material-ui/icons';
import ContainerRounded from '../ContainerRounded';

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

function DataTableHead(props) {
  const { order, orderBy, onRequestSort, columns, classes } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map(column => {
          return column === 'id' ? null : (
            <TableCell
              key={method.keygen()}
              className={classes.tableHeadRow}
              sortDirection={orderBy === column ? order : false}
            >
              <TableSortLabel
                active={orderBy === column}
                direction={order}
                onClick={createSortHandler(column)}
              >
                {column.replace(/_/g, ' ')}
              </TableSortLabel>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

function DataTableCell(props) {
  const classes = useStyles();
  const { value } = props;

  switch (typeof value) {
    case 'string':
      return <TableCell className={classes.tableCell}>{value || '-'}</TableCell>;
    case 'number':
      return <TableCell className={classes.tableCell}>{value * 1}</TableCell>;
    case 'boolean':
      return <TableCell className={classes.tableCell}>{value ? <Done /> : <Clear />}</TableCell>;
    case 'array':
      return <TableCell className={classes.tableCell}>{value.map(str => `${str}, `)}</TableCell>;
    default:
      return <TableCell>{value || '-'}</TableCell>;
  }
}

export default ({ dataList = [], fieldList = [] }) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleEdit = obj => evt => {};

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (!dataList.length) {
    return (
      <ContainerRounded m={6}>
        <div className={classes.tableEmpty}>
          <Typography color='error'>No data available</Typography>
        </div>
      </ContainerRounded>
    );
  }

  let columns = Object.keys(dataList[0]);
  let dataListScaled = dataList;

  if (fieldList.length) {
    dataListScaled = dataListScaled.map(obj => {
      let newObj = {};
      fieldList.forEach(field => {
        if (typeof field === 'object')
          return (newObj[Object.values(field)[0]] = obj[Object.keys(field)[0]]);
        newObj[field] = obj[field];
      });
      newObj.id = obj._id || obj.id;
      return newObj;
    });
    columns = Object.keys(dataListScaled[0]);
  }

  return (
    <ContainerRounded m={6}>
      <div className={classes.table}>
        <Table stickyHeader size='small'>
          <DataTableHead
            columns={columns}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={dataListScaled.length}
            classes={classes}
          />
          <TableBody>
            {stableSort(dataListScaled, getSorting(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={method.keygen(index)}
                    onClick={handleEdit(row)}
                  >
                    {columns.map((column, i) => {
                      return column === 'id' ? null : typeof row[column] !== 'object' ? (
                        <DataTableCell key={method.keygen(i)} value={row[column]} column={column} />
                      ) : (
                        <DataTableCell key={method.keygen(i)} value={'...'} column={column} />
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        className={classes.tableFooter}
        rowsPerPageOptions={[15, 20, 40, 60, dataListScaled.length]}
        component='div'
        count={dataListScaled.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'previous page',
        }}
        nextIconButtonProps={{
          'aria-label': 'next page',
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </ContainerRounded>
  );
};

// export default connect(null)(DataTable);
