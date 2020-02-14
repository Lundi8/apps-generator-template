import React from 'react';
import { connect } from 'react-redux';
// import { a_editor_edit, a_editor_post } from '../../state_manager/actions';
import { IconButton } from '@material-ui/core';
import { Create, Done } from '@material-ui/icons';

export default ({ a_editor_edit, a_editor_post, obj, index, editor_data, onclick }) => {
  const [boolClick, setBoolClick] = React.useState(false);

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
