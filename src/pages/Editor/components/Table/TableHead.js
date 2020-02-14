import React from 'react';
import { method } from '../../../../utils';
import { makeStyles } from '@material-ui/core/styles';
import { TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  head: {
    // background: theme.palette.primary.main,
    textTransform: 'capitalize',
  },
}));

export default ({ order, orderBy, onRequestSort, columns }) => {
  const classes = useStyles();
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
              className={classes.head}
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
};
