import React from 'react';
import { method } from '../../../../utils';
import { TableCell } from '@material-ui/core';
import { Done, Clear } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  cell: {
    whiteSpace: 'pre-line',
  },
}));

export default ({ value }) => {
  const classes = useStyles();

  switch (method.typeOf(value)) {
    case 'string':
      return <TableCell className={classes.cell}>{value || '-'}</TableCell>;
    case 'number':
      return <TableCell className={classes.cell}>{value * 1}</TableCell>;
    case 'boolean':
      return <TableCell className={classes.cell}>{value ? <Done /> : <Clear />}</TableCell>;
    case 'array':
      return <TableCell className={classes.cell}>{value.map(str => `${str}, `)}</TableCell>;
    default:
      return <TableCell>{value || '-'}</TableCell>;
  }
};
