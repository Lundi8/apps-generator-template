import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store, history } from './redux/store';
import { ConnectedRouter as Router } from 'connected-react-router';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { theme } from './utils';
import App from './App';

(async () => {
  const createStore = await store({});

  ReactDOM.render(
    <Provider store={createStore}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router history={history}>
          <App />
        </Router>
      </ThemeProvider>
    </Provider>,
    document.getElementById('root'),
  );
})();

// const createStore = store({});

// ReactDOM.render(
//   <Provider store={createStore}>
//     <CssBaseline />
//     <Router history={history}>
//       <App />
//     </Router>
//   </Provider>,
//   document.getElementById('root'),
// );
