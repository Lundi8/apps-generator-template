const SET_ID = 'SET_ID';
const initialState = '';

export const setId = str => ({
  type: SET_ID,
  payload: str,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ID:
      return action.payload;
    default:
      return state;
  }
};
