import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { DEFAULT_APP_ROUTE } from '../../config';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import './index.css';

import Header from './Header';
import TableData from './TableData';

const Editor = ({ data, editor_data }) => {
  if (!data) {
    return <Redirect to={DEFAULT_APP_ROUTE} />;
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

  const count = editor_data.filter(obj => obj.visible).length;
  const isEditing = editor_data.filter(obj => !obj.disabledEdit && !obj.disabled)[0]
    ? true
    : false;

  let pageLength = count / rowsPerPage;
  let pageLengthRound = Math.round(pageLength);
  pageLengthRound = pageLength > pageLengthRound ? pageLengthRound + 1 : pageLengthRound;

  function handleChangePage(event, newPage) {
    if (!isEditing) setPage(newPage);
  }
  function handleChangeRowsPerPage(event) {
    if (!isEditing) setRowsPerPage(+event.target.value);
  }

  return (
    <div style={{ overflowY: 'scroll', height: '100%', padding: '20px' }}>
      <Paper>
        <Header
          title={data.home.title.fr}
          page={page}
          pageLength={pageLengthRound}
          onChangePage={handleChangePage}
        />
        <div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: '3%' }}>#</TableCell>
                <TableCell style={{ width: '5%' }}>Repères</TableCell>
                <TableCell style={{ width: '5%' }}>Traductions</TableCell>
                <TableCell style={{ width: '10%' }}>Editer</TableCell>
                <TableCell>Textes</TableCell>
              </TableRow>
            </TableHead>
            <TableData page={page} rowsPerPage={rowsPerPage} />
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 20, 30]}
          component='div'
          count={count}
          labelRowsPerPage='Lignes par page : '
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} sur ${count}`}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <br /> <br />
    </div>
  );
};

const mapStateToProps = ({ data, editor_data }) => {
  return { data, editor_data };
};

export default connect(mapStateToProps)(Editor);
