import React from 'react';

import { Snackbar, IconButton, SnackbarContent, Slide } from '@material-ui/core';
import { CloseRounded } from '@material-ui/icons';

// const SnackbarContentWrapper = props => {
//   // const classes = useStyles();
//   const { message, onClose, variant, ...other } = props;
//   const Icon = variantIcon[variant];

//   return (
//     <SnackbarContent
//       // className={`${classes[variant]} ${classes.shape} `}
//       message={
//         <span id='client-snackbar' className={classes.message}>
//           <Icon className={`${classes.icon} ${classes.iconVariant}`} />
//           <div className={classes.text}>{message}</div>
//         </span>
//       }
//       action={[
//         <IconButton key='close' aria-label='close' color='inherit' onClick={onClose}>
//           <CloseRounded className={classes.icon} />
//         </IconButton>,
//       ]}
//       {...other}
//     />
//   );
// };

export default ({ message = '', open = false }) => {
  const [bool, setBool] = React.useState(open);

  const handleClose = i => (event, reason) => {
    if (reason === 'clickaway') return;
    // removeInfo();
    setBool(false);
  };

  return (
    <Slide in={open} direction='left' timeout={200}>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        style={{ width: '100%' }}
        open={open}
        autoHideDuration={5000}
        transitionDuration={{ enter: 400, exit: 400 }}
        onClose={handleClose()}
      >
        {/* <SnackbarContentWrapper
          onClose={handleClose()}
          // variant={returnVariant(info)}
          message={message}
        /> */}
        <SnackbarContent message={{ message }} />
      </Snackbar>
    </Slide>
  );
};
