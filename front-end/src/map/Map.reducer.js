const INITIAL_STATE = {
  lat: 33.748995,
  lng: -84.387982,
  loginInfo: [],
  addresses: []
};

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === 'update-center') {
    return Object.assign({}, state, {
      loginInfo: action.value
    })
  }
  // if (action.type === 'loginInfo') {
  //   return Object.assign({}, state, {
  //     loginInfo: this.props.data
  //   })
  // }
  if(action.type === 'usermap'){
    return Object.assign({}, state, {
      addresses: action.payload
    })
  }
  return state;
}
