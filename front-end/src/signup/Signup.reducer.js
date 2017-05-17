const INITIAL_STATE = {
  // put properties you need here
  name: '',
  email: '',
  password: '',
  phone: '',
  street: '',
  zip: ''
};

export default function reducer(state = INITIAL_STATE, action) {
  // add if statements to catch specific actions
  // to return different new state from previous state

  if (action.type === 'signup'){

  return Object.assign({}, state, {
    name: action.data,
    email: action.data,
    password: action.data,
    phone: action.data,
    street: action.data,
    zip: action.data
  });
}


if (action.type === 'name'){
  return Object.assign({}, state, {
    name: action.data,
  });
}

if (action.type === 'email'){
  return Object.assign({}, state, {
    email: action.data,
  });
}

if (action.type === 'street'){
  return Object.assign({}, state, {
    street: action.data,
  });
}

if (action.type === 'phone'){
  return Object.assign({}, state, {
    phone: action.data,
  });
}

if (action.type === 'password1'){
  return Object.assign({}, state, {
    password: action.data,
  });
}

if (action.type === 'zip'){
  return Object.assign({}, state, {
    zip: action.data,
  });
}


return state;
}
