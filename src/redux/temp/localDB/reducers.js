import { LOCAL_DB_PENDING, LOCAL_DB_STORE, LOCAL_DB_SUCCESS, LOCAL_DB_ERROR } from './constants';
import _ from 'lodash';

const initialState = {
  pending: false,
  store: {},
  error: null,
  isEmpty: true,
};

const getLocalDB = () => {
  try {
    return JSON.parse(window.localStorage.getItem('localDB'));
  } catch (err) {
    return {};
  }
};
const setLocalDB = obj => {
  if (obj) {
    window.localStorage.setItem('localDB', JSON.stringify(obj));
  } else {
    window.localStorage.setItem('localDB', JSON.stringify({}));
  }
};

export function localDB(state = initialState, action) {
  switch (action.type) {
    case LOCAL_DB_PENDING:
      return {
        ...state,
        pending: true,
        isEmpty: true,
      };
    case LOCAL_DB_STORE:
      setLocalDB(action.store);
      const store = getLocalDB();
      return {
        ...state,
        store,
        isEmpty: _.isEmpty(store),
      };
    case LOCAL_DB_SUCCESS:
      return {
        ...state,
        pending: false,
        isEmpty: _.isEmpty(getLocalDB()),
      };
    case LOCAL_DB_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
        isEmpty: true,
      };
    default:
      return state;
  }
}

// const getLocalDB = () => {
//   const store = {};
//   const keys = Object.keys(window.localStorage);
//   let i = keys.length;

//   while (i--) {
//     store[keys[i]] = window.localStorage.getItem(keys[i]);
//   }
//   return store;
// };

// const setLocalDB = obj => {
//   // const payload = { data: {}, error: false };

//   if (obj) {
//   	Object.keys(obj).forEach(key => {
//   		window.localStorage.setItem(key, obj[key]);
//   	});
//   }
//   // getLocalDB();

//   // const payload = getLocalDB();
//   // dispatch({ type: SET_DATA, payload });
// };
