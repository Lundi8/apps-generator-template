import React from 'react';
import { connect } from 'react-redux';
import { a_editor_update } from '../../state_manager/actions';
import { IconButton, TextField } from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';

function InputList({ index, obj, a_editor_update, editor_data }) {

  let list = obj.data;

  const handleList = (bool, i) => {
    if (bool) {
      if (window.confirm('Ajouter un paragraphe?')) {
        list.splice(i + 1, 0, 'Nouveau texte');
      }
    } else {
      if (window.confirm('Supprimer ce paragraphe?')) {
        list.splice(i, 1);
      }
    }
    a_editor_update({ index, newData: list, data: editor_data });
  };

  const handleChange = i => evt => {
    list[i] = evt.target.value;
    a_editor_update({ index, newData : list, data: editor_data });
  };

  return (
    <React.Fragment>
      {list.map((value, i) => {
        return (
          <div key={i}>
            <TextField
              multiline
              fullWidth
              value={value}
              disabled={obj.disabledEdit}
              onChange={handleChange(i)}
              margin='normal'
            />
            {/*<Input index={index} text={value} disabled={obj.disabledEdit} /> */}
            <IconButton
              disabled={obj.disabledEdit}
              style={{ float: 'right' }}
              onClick={() => handleList(false, i)}
            >
              <Delete style={{ color: obj.disabledEdit ? 'rgba(0, 0, 0, 0.38)' : 'black' }} />
            </IconButton>
            <IconButton
              disabled={obj.disabledEdit}
              style={{ float: 'right' }}
              onClick={() => handleList(true, i)}
            >
              <span className='editor_addP'>Ajouter un paragraphe &nbsp; </span>
              <Add style={{ color: obj.disabledEdit ? 'rgba(0, 0, 0, 0.38)' : 'black' }} />
            </IconButton>
          </div>
        );
      })}
    </React.Fragment>
  );
}

const mapStateToProps = ({ editor_data }) => {
  return { editor_data };
};

export default connect(
  mapStateToProps,
  { a_editor_update }
)(InputList);
