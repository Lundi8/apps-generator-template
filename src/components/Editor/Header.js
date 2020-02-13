import React from 'react';
import Grid from '@material-ui/core/Grid';
import Search from './Search';

export const Header = ({ title, page, pageLength, onChangePage }) => {
  return (
    <Grid container justify='space-between' alignItems='flex-end' style={{ padding: '20px' }}>
      <Grid item>
        <p
          style={{
            fontSize: '30px',
            margin: '0',
            paddingBottom: '7px',
            fontFamily: 'Hype',
          }}
        >
          {title.toUpperCase()}
        </p>
      </Grid>
      <Grid item>
        <Search onChangePage={onChangePage} pageLength={pageLength} page={page} />
      </Grid>
    </Grid>
  );
};

export default Header;
