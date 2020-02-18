const SET_APP_ID = 'SET_APP_ID';
const initialState = '';

/**
 * ACTIONS
 */
export const setApp = str => ({
  type: SET_APP_ID,
  payload: str,
});

/**
 * REDUCERS
 */
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_APP_ID:
      return action.payload;
    default:
      return state;
  }
};

export default { appReducer };
