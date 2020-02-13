import { DB_PENDING, DB_STORE, DB_SUCCESS, DB_ERROR } from './constants';
import { isEmpty } from 'lodash';

const initialState = {
  pending: false,
  store: {},
  error: null,
  isEmpty: true,
};

export function mediaDB(state = initialState, action) {
  switch (action.type) {
    case DB_PENDING:
      return {
        ...state,
        pending: true,
        store: {},
        isEmpty: true,
      };
    case DB_STORE:
      let store = state.store;
      if (action.media) {
        store[action.media.src] = action.media;
      }
      return {
        ...state,
        pending: true,
        store,
        isEmpty: true,
      };
    case DB_SUCCESS:
      return {
        ...state,
        store: action.medias,
        pending: false,
        isEmpty: isEmpty(action.medias),
      };
    case DB_ERROR:
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
