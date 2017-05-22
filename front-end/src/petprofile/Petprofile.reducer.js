const INITIAL_STATE = {
  // put properties you need here
  name: '',
  gender: '',
  fixed: 'FALSE',
  age: 'puppy',
  size: 'small',
  personality: 'energetic',
  activities: 'fetch',
  petInfo: []
};

export default function reducer(state = INITIAL_STATE, action) {
  // add if statements to catch specific actions
  // to return different new state from previous state

  if (action.type === 'submit'){

  return Object.assign({}, state, {
    petprofile: action.data
    // name: action.data,
    // gender: action.data,
    // fixed: action.data,
    // age: action.data,
    // size: action.data,
    // personality: action.data,
    // activities: action.data
  });
}


if (action.type === 'name'){
  return Object.assign({}, state, {
    name: action.data,
  });
}

if (action.type === 'gender'){
  return Object.assign({}, state, {
    gender: action.data,
  });
}

if (action.type === 'fixed'){
  return Object.assign({}, state, {
    fixed: action.data,
  });
}

if (action.type === 'age'){
  return Object.assign({}, state, {
    age: action.data,
  });
}

if (action.type === 'personality'){
  return Object.assign({}, state, {
    personality: action.data,
  });
}

if (action.type === 'activity'){
  return Object.assign({}, state, {
    activities: action.data,
  });
}

if (action.type === 'size'){
  return Object.assign({}, state, {
    size: action.data,
  });
}


return state;
}
