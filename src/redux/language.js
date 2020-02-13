const SET_LANGUAGES = 'SET_LANGUAGES';
const SET_LANGUAGE = 'SET_LANGUAGE';
const initialState = {
  current: 'fr',
  data: [],
};

export const setLanguages = obj => ({
  type: SET_LANGUAGES,
  payload: obj,
});

export const setLanguage = str => ({
  type: SET_LANGUAGE,
  payload: str,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LANGUAGES:
      return { ...state, data: action.payload };
    case SET_LANGUAGE:
      return { ...state, current: action.payload };
    default:
      return state;
  }
};
