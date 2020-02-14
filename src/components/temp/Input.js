import React from 'react';
import { connect } from 'react-redux';
import { a_editor_update } from '../../state_manager/actions';
import { TextField } from '@material-ui/core';

const Input = ({ index, text, disabled, a_editor_update, editor_data }) => {
  // const [value, setValue] = React.useState(text);

  const handleChange = evt => {
    let newText = evt.target.value;
    // setValue(newData);
    a_editor_update({ index, newData: newText, data: editor_data });
  };

  return (
    <form noValidate autoComplete='off'>
      <TextField
        multiline
        fullWidth
        value={text}
        disabled={disabled}
        onChange={handleChange}
        margin='normal'
      />
    </form>
  );
};

const mapStateToProps = ({ editor_data }) => {
  return { editor_data };
};

export default connect(
  mapStateToProps,
  { a_editor_update }
)(Input);
