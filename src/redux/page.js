const SET_PAGES = 'SET_PAGES';
const SET_PAGE = 'SET_PAGE';
const initialState = {
  current: '/',
  data: [],
};

export const setPages = obj => ({
  type: SET_PAGES,
  payload: obj,
});

export const setPage = str => ({
  type: SET_PAGE,
  payload: str,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PAGES:
      return { ...state, data: action.payload };
    case SET_PAGE:
      return { ...state, current: action.payload };
    default:
      return state;
  }
};
