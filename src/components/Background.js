import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100vh',
    zIndex: 0,
    position: 'relative',
  },
  color: {
    background: ({ background }) => background,
  },
  image: {
    backgroundImage: ({ background }) =>
      background.match(/\.(jpg|png|gif)$/) ? `url(${background})` : '',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
}));

export default ({ background, children }) => {
  const classes = useStyle({ background });
  const classeBackground = background.match(/\.(jpg|png|gif)$/) ? classes.image : classes.color;

  return <div className={`${classes.root} ${classeBackground}`}>{children}</div>;
};
