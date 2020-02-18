import React from 'react';
import { Route } from 'react-router-dom';
import Container from './components/Container';
import { Background } from '../../components';
import View1 from './pages/View1';
import View2 from './pages/View2';

export default function() {
  return (
    <div>
      <Route exact path='/'>
        <Background background='yellow'>
          <Container>Home Screen</Container>
        </Background>
      </Route>
      <Route path='/app'>
        <Container>App Screen</Container>
      </Route>
      <Route exact path={`/app/view1`} component={View1} />
      <Route exact path={`/app/view2`} component={View2} />
    </div>
  );
}
