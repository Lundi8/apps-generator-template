import { DB_ERROR, DB_PENDING, DB_STORE, DB_SUCCESS } from './constants';
import DB from './db';

const fetchMediasPending = () => {
  return {
    type: DB_PENDING,
  };
};

const fetchMediasStore = media => {
  return {
    type: DB_STORE,
    media,
  };
};
const fetchMediasSuccess = medias => {
  return {
    type: DB_SUCCESS,
    medias,
  };
};

const fetchMediasError = error => {
  return {
    type: DB_ERROR,
    error,
  };
};

export const setMediaDB = files => dispatch => {
  if (files.length) {
    let inc = 0;
    dispatch(fetchMediasPending());

    files.forEach(file => {
      DB.save(file, item => {
        dispatch(fetchMediasStore(item));
        inc++;
        if (inc >= files.length) {
          DB.getAllMedias(medias => {
            dispatch(fetchMediasSuccess(medias));
          });
        }
      });
    });
  } else {
    dispatch(fetchMediasError('No files to save'));
  }
};

export const deleteMediaDB = () => async dispatch => {
  const error = await DB.deleteAllMedias();
  if (error) console.error(error);

  DB.getAllMedias(medias => {
    dispatch(fetchMediasSuccess(medias));
  });
};
