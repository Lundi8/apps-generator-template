import React from 'react';
import { Paper, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    margin: ({ m }) => `${theme.spacing(m)}px 0`,
    padding: ({ p }) => (p ? theme.spacing(p) : 0),
    borderRadius: '10px',
    overflow: 'hidden',
    border: `none`,
    height: '100%',
    boxShadow: '0px 0px 4px rgba(0,0,0,.2)',
  },
}));

export default ({ p = 0, m = 0, ...props }) => {
  const classes = useStyles({ p, m });

  return (
    <Fade in={true} timeout={400}>
      <Paper className={classes.root}>{props.children}</Paper>
    </Fade>
  );
};
