import React from 'react';
import { Route } from 'react-router-dom';
import { path } from '../../utils';
import Container from './components/Container';

const View1 = () => {
  return (
    <div>
      <p>1 public folder</p>
      <img style={{ width: '100px' }} src={`${process.env.PUBLIC_URL}/img.png`} alt='not found'></img>
      <p>2 webpack import</p>
      <img style={{ width: '100px' }} src={path.imgs('img.png')} alt='not found'></img>
    </div>
  );
};
const View2 = () => {
  return (
    <div>
      <h2>View2</h2>
      <p>2 webpack import</p>
      <img style={{ width: '100px' }} src={path.imgs('img.png')} alt='not found'></img>
    </div>
  );
};

export default function() {
  return (
    <div>
      <Route exact path='/'>
        <Container>Home Screen</Container>
      </Route>
      <Route path='/app'>
        <Container>App Screen</Container>
      </Route>
      <Route exact path={`/app/view1`} component={View1} />
      <Route exact path={`/app/view2`} component={View2} />
    </div>
  );
}
