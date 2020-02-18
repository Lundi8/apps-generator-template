import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div>
      <Link to={`/`}>Home</Link>
      &nbsp; &nbsp;
      <Link to={`/app`}>App</Link>
      &nbsp; &nbsp;
      <Link to={`/app/view1`}>View1</Link>
      &nbsp; &nbsp;
      <Link to='/app/view2'>View2</Link>
      &nbsp; &nbsp;
      <Link to='/editor'>Editor</Link>
    </div>
  );
};
