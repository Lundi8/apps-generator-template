import React from 'react';
import DataTables from './components/Table';
import { connect } from 'react-redux';
import { JSONdata } from '../../utils';
import { Container, Typography, Divider } from '@material-ui/core';

const Editor = ({ dataGlobal = [], dataPage = [] }) => {
  return (
    <Container>
      <br></br>
      <Typography variant='h2' color='textPrimary'>
        Global
      </Typography>
      <Divider />
      <DataTables dataList={dataGlobal} editList={['value']} />

      <br></br>
      <Typography variant='h2' color='textPrimary'>
        Pages
      </Typography>
      <Divider />
      <DataTables dataList={dataPage} editList={['value']} />
    </Container>
  );
};

const mSTP = ({ global, page }) => {
  const dataGlobal = JSONdata({ root: '/global', json: global.data }).toEditor;
  const dataPage = JSONdata({ root: '/pages', json: page.data }).toEditor;
  return { dataGlobal, dataPage };
};

export default connect(mSTP)(Editor);
