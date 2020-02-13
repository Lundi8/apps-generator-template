import React from 'react';
import { TextField, MenuItem, Grid } from '@material-ui/core';
import { Search as SearchIn } from '@material-ui/icons';
import { connect } from 'react-redux';
import { a_editor_search } from '../../state_manager/actions';

const Search = ({ editor_data, a_editor_search, page, pageLength, onChangePage }) => {
  const [str, setStr] = React.useState('');
  const isEditing = editor_data.filter(obj => !obj.disabledEdit && !obj.disabled)[0]
    ? true
    : false;
  let pages = [];
  for (let i = 0; i < pageLength; i++) {
    pages.push(i + 1);
  }

  const handleChange = evt => {
    if(!isEditing){
      setStr(evt.target.value);
      a_editor_search({ str: evt.target.value, data: editor_data });
    }
  };

  const handlePage = evt => {
    onChangePage(evt, evt.target.value);
  };

  return (
    <React.Fragment>
      <Grid container spacing={0} alignItems='flex-end'>
        <Grid item>
          <TextField
            label='Rechercher'
            type='search'
            margin='normal'
            onChange={handleChange}
            value={str}
          />
        </Grid>
        <Grid item>
          <SearchIn style={{ color: 'rgba(0, 0, 0, 0.4)', paddingBottom: '5px' }} />
        </Grid>

        <Grid item>
          <TextField
            style={{ width: '100px', marginLeft: '30px' }}
            select
            label='Page n°'
            margin='normal'
            value={page}
            onChange={handlePage}
          >
            {pages.map((el, i) => {
              return (
                <MenuItem key={i} value={i}>
                  {el}
                </MenuItem>
              );
            })}
          </TextField>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = ({ editor_data }) => {
  return { editor_data };
};

export default connect(
  mapStateToProps,
  { a_editor_search }
)(Search);
