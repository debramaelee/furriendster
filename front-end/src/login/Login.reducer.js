const INITIAL_STATE = {
  loginInfo: null
};

export default function reducer(state = INITIAL_STATE, action) {
  // add if statements to catch specific actions
  // to return different new state from previous state
if (action.type === 'login-success') {
  return Object.assign({}, state, {
    loginInfo: action.data
  })
}
if (action.type==='logout') {
  return Object.assign({}, state, {
    loginInfo: null
  })
}
//   if (action.type === 'login1'){
//
//   return Object.assign({}, state, {
//     name: action.data.name,
//     email: action.data.email,
//     password: action.data.password,
//     phone: action.data.phone,
//     street: action.data.street,
//     zip: action.data.zip
//   });
// }
//
//
// if (action.type === 'email'){
//   return Object.assign({}, state, {
//     email: action.data,
//   });
// }
//
// if (action.type === 'password1'){
//   return Object.assign({}, state, {
//     password: action.data,
//   });
// }


return state;
}
