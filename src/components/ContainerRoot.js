import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(theme => ({
  root: {
    position: 'fixed',
    width: '1280px',
    height: '1024px',
    // width: ({ width }) => `${width}px`,
    // height: ({ height }) => `${height}px`,
    overflow: 'hidden',
  },
}));

export default ({ children }) => {
  const classes = useStyle();
  // const classes = useStyle({ width: window.innerWidth, height: window.innerHeight });

  return <div className={classes.root}>{children}</div>;
};
