import React from 'react';
import { connect } from 'react-redux';
import { a_editor_edit, a_editor_post } from '../../state_manager/actions';
import { IconButton } from '@material-ui/core';
import { Create, Done } from '@material-ui/icons';

const Action = ({ a_editor_edit, a_editor_post, obj, index, editor_data }) => {
  const [boolClick, setBoolClick] = React.useState(obj.disabled);

  const handleClick = () => {
    let newBoolClick = boolClick ? false : true;
    setBoolClick(newBoolClick);

    if (boolClick) {
      a_editor_edit({ data: editor_data, index: undefined });
      a_editor_post(editor_data[index]);
    } else {
      a_editor_edit({ data: editor_data, index });
    }
  };

  return (
    <div>
      <IconButton disabled={obj.disabled} onClick={handleClick}>
        {!boolClick ? (
          <Create style={{ color: obj.disabled ? 'rgba(0,0,0,0.4)' : 'black' }} />
        ) : (
          <Done />
        )}
      </IconButton>
    </div>
  );
};

const mapStateToProps = ({ editor_edit, editor_data }) => {
  return { editor_edit, editor_data };
};

export default connect(
  mapStateToProps,
  { a_editor_edit, a_editor_post }
)(Action);
