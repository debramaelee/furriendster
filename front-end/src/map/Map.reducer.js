const INITIAL_STATE = {
  lat: 33.748995,
  lng: -84.387982,
  loginInfo: []
};

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === 'update-center') {
    return Object.assign({}, state, {
      loginInfo: action.value
    })
  }
  if (action.type === 'loginInfo') {
    return Object.assign({}, state, {
      loginInfo: this.props.data
    })
  }
  return state;
}
