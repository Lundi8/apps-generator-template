import React from 'react';
import DataTables from './components/Table';
import { connect } from 'react-redux';
import { JSONdata } from '../../utils';
import { Container, Typography, Divider } from '@material-ui/core';

const Editor = ({ dataList = [] }) => {
  return (
    <Container>
      <br></br>
      <Typography variant='h2' color='textPrimary'>
        Global data
      </Typography>
      <Divider />
      <DataTables dataList={dataList} editList={['value']} />
    </Container>
  );
};

const mSTP = ({ page }) => {
  const dataList = JSONdata({ root: '/pages', json: page.data }).toEditor;
  // console.log(dataList);
  return { dataList };
};

export default connect(mSTP)(Editor);
