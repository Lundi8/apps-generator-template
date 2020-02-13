import { LOCAL_DB_PENDING, LOCAL_DB_STORE, LOCAL_DB_SUCCESS, LOCAL_DB_ERROR } from './constants';
import axios from 'axios';

const localDBPending = () => ({
  type: LOCAL_DB_PENDING,
});

const localDBStore = store => ({
  type: LOCAL_DB_STORE,
  store,
});
const localDBSuccess = () => ({
  type: LOCAL_DB_SUCCESS,
});

const localDBError = error => ({
  type: LOCAL_DB_ERROR,
  error,
});

const setLocalDB = obj => dispatch => {
  if (!obj) {
    const origin = window.location.origin.includes('localhost')
      ? process.env.REACT_APP_API_REST_DEV
      : process.env.REACT_APP_API_REST_PROD;
    dispatch(localDBPending());

    axios
      .get(`${origin}/api-rest/data/content/${process.env.REACT_APP_CONTENT_ID}`)
      .then(res => {
        dispatch(localDBStore(res.data.data));
        dispatch(localDBSuccess());
      })
      .catch(err => {
        // dispatch(localDBStore(initialDB));
        dispatch(localDBError(err));
      });
  } else {
    dispatch(localDBStore(obj));
  }
};

export { setLocalDB };
