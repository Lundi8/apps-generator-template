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
            value={inputValue}
            onChange={evt => setInputValue(evt.target.value)}
            fullWidth
            rows={inputRows}
            multiline={inputRows ? true : false}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onclose(!open)} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={evt => {
              if (value === inputValue) return;
              // console.log(JSON.stringify(inputValue), inputValue);
              window.ipcRenderer.send('update-data', { path, data: inputValue });
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
