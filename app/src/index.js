import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store, history } from './redux/store';
import { ConnectedRouter as Router } from 'connected-react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App';

ReactDOM.render(
  <Provider store={store({})}>
    <CssBaseline />
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
