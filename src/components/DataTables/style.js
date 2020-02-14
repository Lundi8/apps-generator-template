import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  table: {
    width: '100%',
    minHeight: 'auto',
    maxHeight: '800px',
    overflowY: 'auto',
  },
  tableEmpty: {
    width: '100%',
    margin: '30px',
  },
  tableCell: {
    whiteSpace: 'nowrap',
  },
  tableHeadRow: {
    background: theme.palette.primary.main,
    textTransform: 'capitalize',
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableFooter: {
    background: theme.palette.primary.light,
  },
  thumbnail: {
    width: '100px',
    height: 'auto',
  },
}));
