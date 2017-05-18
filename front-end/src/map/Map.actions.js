import $ from 'jquery';



export function updateCenter(center) {
  return {
    type: 'update-center',
    value: center
  };
}

// export function getUserInfo() {
//   let asyncAction = function(dispatch) {
//     $.ajax({
//       method: 'GET',
//       url:`http://localhost:3003/user/login`
//     })
//     .then(data => dispatch({type: 'loginInfo', data: data}))
//     .catch(resp => dispatch('error'))
//
//   };
//   return asyncAction;
// }
