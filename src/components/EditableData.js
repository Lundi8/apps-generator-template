import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

export default ({ path = '', value = '', language = '', type = '', open = false, onclose }) => {
  const [text, setText] = useState(value);

  useEffect(() => {
    const ipcListener = (evt, data) => {
      console.log({ evt, data });
      onclose(false);
    };

    window.ipcRenderer.on('update-data', ipcListener);
    return () => window.ipcRenderer.removeListener('update-data', ipcListener);
  }, [open]);
  return (
    <Dialog open={open} onClose={onclose} maxWidth='md' fullWidth={true}>
      <DialogTitle id='form-dialog-title'>Value</DialogTitle>
      <DialogContent>
        <DialogContentText style={{ whiteSpace: 'pre-line' }}>
          Language : {language} <br />
          Type : {type} <br />
          Path : {path} <br />
          Value : {value}
        </DialogContentText>
        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='Change value'
          type='text'
          value={text || value}
          onChange={evt => setText(evt.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onclose(!open)} color='primary'>
          Cancel
        </Button>
        <Button
          onClick={evt => {
            if (value === text) return;
            window.ipcRenderer.send('update-data', { path, data: value });
          }}
          color='primary'
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};
