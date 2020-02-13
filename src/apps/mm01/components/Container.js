import React from 'react';
import Menu from './Menu';

export default ({ children }) => {
  return (
    <div>
      <Menu />
      {children}
    </div>
  );
};
