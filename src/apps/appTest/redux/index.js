const SET_APP_ID = 'SET_APP_ID';

export const setApp = str => ({
  type: SET_APP_ID,
  payload: str,
});
