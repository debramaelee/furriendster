const INITIAL_STATE = {
  // put properties you need here
pet_info: null
};

export default function reducer(state = INITIAL_STATE, action) {
  // add if statements to catch specific actions
  // to return different new state from previous state

  if (action.type === 'petpage'){

  return Object.assign({}, state, {
    pet_info: action.payload

  });
}

return state;
}
