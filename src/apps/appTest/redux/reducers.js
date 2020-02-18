const SET_APP_ID = 'SET_APP_ID';
const initialState = '';

// export const setApp = str => ({
//   type: SET_APP_ID,
//   payload: str,
// });

export const stateApp1 = (state = initialState, action) => {
  switch (action.type) {
    case SET_APP_ID:
      return action.payload;
    default:
      return state;
  }
};
export const stateApp2 = (state = initialState, action) => {
  switch (action.type) {
    case SET_APP_ID:
      return action.payload;
    default:
      return state;
  }
};
export const stateApp3 = (state = initialState, action) => {
  switch (action.type) {
    case SET_APP_ID:
      return action.payload;
    default:
      return state;
  }
};

// export default combineReducers({ stateApp1, stateApp2, stateApp3 });
