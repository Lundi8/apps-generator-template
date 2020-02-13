const SET_TIME = 'SET_TIME';
const SET_VOLUME = 'SET_VOLUME';

const initialState = {
  time: 0,
  volume: 1,
};

export const setPlayerTime = (value = 0) => ({
  type: SET_TIME,
  value,
});

export const setPlayerVolume = (value = 0) => ({
  type: SET_VOLUME,
  value,
});

export const player = (state = initialState, action) => {
  switch (action.type) {
    case SET_TIME:
      return { ...state, time: action.value };
    case SET_VOLUME:
      return { ...state, volume: action.value };
    default:
      return state;
  }
};
