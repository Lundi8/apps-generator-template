import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
// import { ConnectedRouter as Router } from 'connected-react-router';
// import { history } from '../../redux/store';
import { path } from '../../utils';

const Menu = () => {
  return (
    <div>
      <Link to='/'>Index</Link>
      &nbsp;
      <Link to='/view1'>View1</Link>
      &nbsp;
      <Link to='/view2'>View2</Link>
      &nbsp;
    </div>
  );
};
const View1 = () => {
  return (
    <div>
      <h2>View1</h2>;
    </div>
  );
};
const View2 = () => {
  return (
    <div>
      <h2>View2</h2>;<p>2 webpack import</p>
      <img style={{ width: '100px' }} src={path.imgs('img.png')}></img>
    </div>
  );
};

export default function() {
  return (
    <div>
      <Menu />
      <Switch>
        <Route exact path='/'>
          {/* <h1>{process.env.REACT_APP_MM}</h1> */}
          <p>1 public folder</p>
          <img style={{ width: '100px' }} src={`${process.env.PUBLIC_URL}/img.png`}></img>
          <p>2 webpack import</p>
          <img style={{ width: '100px' }} src={path.imgs('img.png')}></img>
          {/* <img src={srcImg}></img> */}
        </Route>
        <Route exact path='/view1' component={View1} />
        <Route exact path='/view2' component={View2} />
      </Switch>
    </div>
  );
}
