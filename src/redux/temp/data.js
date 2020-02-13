const GET_DATA = 'GET_DATA';
const UPDATE_DATA = 'UPDATE_DATA';

export const getData = obj => ({
  type: GET_DATA,
  payload: obj,
});
export const updateData = obj => ({
  type: UPDATE_DATA,
  payload: obj,
});

export const getDataOnLaunch = () => dispatch => {
  window.ipcRenderer.on('reply-data', (evt, data) => {
    dispatch(getData(data));
  });
  window.ipcRenderer.send('data');
};

export default (state = {}, action) => {
  switch (action.type) {
    // case ADD_DATA:
    //   return { ...state, ...action.payload };
    case GET_DATA:
      return { ...state, ...action.payload };
    // case UPDATE_DATA:
    //   return { ...state, ...action.payload };
    // case REMOVE_DATA:
    //   return { ...state, ...action.payload };
    default:
      return state;
  }
};
