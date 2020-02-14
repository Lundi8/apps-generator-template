import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  table: {
    width: '100%',
    minHeight: '50px',
    overflowY: 'auto',
  },
  empty: {
    width: '100%',
    margin: '30px',
  },
  row: {
    cursor: 'pointer',
  },
}));
