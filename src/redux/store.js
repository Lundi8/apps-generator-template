import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createHashHistory as createHistory } from 'history';
import editor from './editor';
import global from './global';
import id from './id';
import language from './language';
import page from './page';

export const history = createHistory({
  hashType: 'slash',
  getUserConfirmation: (message, callback) => callback(window.confirm(message)),
});

// export const store = initialState => {
//   return createStore(
//     combineReducers({ id, editor, language, global, page, router: connectRouter(history) }),
//     initialState,
//     composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history))),
//   );
// };
export const store = async initialState => {
  const app = await import(`../apps/${process.env.REACT_APP_ID}/redux/reducers`);

  return createStore(
    combineReducers({ id, editor, language, global, page, ...app, router: connectRouter(history) }),
    initialState,
    composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history))),
  );
};
