const INITIAL_STATE = {
  lat: 33.748995,
  lng: -84.387982
};

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === 'update-center') {
    return Object.assign({}, state, action.value);
  }
  return state;
}
