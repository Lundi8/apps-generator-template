import React from 'react';
import { TablePagination } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  footer: {
    background: theme.palette.primary.light,
  },
}));

export default ({ page, rowsPerPage, onPage, onRowsPerPage, totalRows }) => {
  const classes = useStyles();
  const handleChangePage = (event, newPage) => onPage(newPage);
  const handleChangeRowsPerPage = event => onRowsPerPage(+event.target.value);

  return (
    <TablePagination
      className={classes.tableFooter}
      rowsPerPageOptions={[20, 40, 60, 80, totalRows]}
      component='div'
      count={totalRows}
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
  );
};
