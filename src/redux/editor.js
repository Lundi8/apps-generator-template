const SET_EDIT_MODE = 'SET_EDIT_MODE';
const FETCH_DATA = 'FETCH_DATA';

export const setEditMode = (bool = false) => ({
  type: SET_EDIT_MODE,
  payload: bool,
});

export const fetchData = () => async dispatch => {
  window.ipcRenderer.send('data');
  dispatch({
    type: FETCH_DATA,
  });
};

export default (state = false, action) => {
  switch (action.type) {
    case SET_EDIT_MODE:
      return action.payload;
    default:
      return state;
  }
};
