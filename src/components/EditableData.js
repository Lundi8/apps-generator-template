import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from '@material-ui/core';

export default ({
  json_path = '',
  value = '',
  language = '',
  json_type = '',
  open = false,
  onclose,
}) => {
  const [inputValue, setInputValue] = useState(value || '');
  let inputRows = value.match(/\n/);
  inputRows = inputRows ? inputRows.index : 0;

  useEffect(() => {
    const ipcListener = (evt, res) => {
      if (res.success) {
        window.ipcRenderer.send('data');
        onclose(false);
      }
    };
    window.ipcRenderer.on('update-data', ipcListener);
    return () => window.ipcRenderer.removeListener('update-data', ipcListener);
  }, [open, onclose]);

  return (
    <div>
      <Dialog open={open} onClose={onclose} maxWidth='md' fullWidth={true}>
        <DialogTitle id='form-dialog-title'>Update the current value</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <b>Value</b> : {value} <br />
            <b>Language </b>: {language} <br />
            <b>JSON Type </b>: {json_type} <br />
            <b>JSON Path </b>: {json_path} <br />
          </DialogContentText>
          <Divider /> <br />
          <TextField
            autoFocus
            fullWidth
            margin='dense'
            id='change-value'
            label='Change value'
            type='text'
            value={inputValue}
            rows={inputRows}
            multiline
            onChange={evt => setInputValue(evt.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onclose(!open)} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={evt => {
              if (value === inputValue) return;
              window.ipcRenderer.send('update-data', { path: json_path, data: inputValue });
            }}
            color='primary'
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
