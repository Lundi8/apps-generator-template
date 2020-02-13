const SET_EDIT_MODE = 'SET_EDIT_MODE';

export const setEditMode = (bool = false) => ({
  type: SET_EDIT_MODE,
  payload: bool,
});

export default (state = false, action) => {
  switch (action.type) {
    case SET_EDIT_MODE:
      return action.payload;
    default:
      return state;
  }
};
