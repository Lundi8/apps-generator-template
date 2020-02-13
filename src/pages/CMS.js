import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div>
      <h1
        style={{
          width: '100%',
          background: 'rgba(211, 211, 211, 0.5)',
          margin: 0,
          marginBottom: '20px',
          padding: '30px',
        }}
      >
        Home &nbsp; <Link to='/player'>Player</Link> &nbsp; <Link to='/mediaDB'>MediaDB</Link> &nbsp;{' '}
      </h1>
      <p> &nbsp; Exemple of pwa-cra-boilerplate</p>
    </div>
  );
};
