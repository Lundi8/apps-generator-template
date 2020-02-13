const SET_EDIT_MODE = 'SET_EDIT_MODE';

export const setEditMode = (str = '') => ({
  type: SET_EDIT_MODE,
  payload: str,
});

export default (state = '', action) => {
  switch (action.type) {
    case SET_EDIT_MODE:
      return action.payload;
    default:
      return state;
  }
};
