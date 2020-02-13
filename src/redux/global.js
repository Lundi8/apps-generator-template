const SET_GLOBAL = 'SET_GLOBAL';
const initialState = {};

export const setGlobal = obj => ({
  type: SET_GLOBAL,
  payload: obj,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLOBAL:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
