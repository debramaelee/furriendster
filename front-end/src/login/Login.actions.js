import $ from 'jquery';
import {hashHistory} from 'react-router';

export function login(email, password) {
  let asyncAction = (dispatch) => {
    $.ajax({
      url: 'http://localhost:3003/api/user/login',
      method: 'POST',
    
      data: JSON.stringify({
        email: email,
        password: password
      }),
      contentType: 'application/json'
    })
    .then(data => {
      dispatch({
        type: 'login-success',
        data: data
      });
      hashHistory.push('/');
    })
    .catch(resp => {
      dispatch({
        type: 'login-error'
      });
    })
  };
  return asyncAction;

}
//
// export function pageError(resp) {
//   let error=(resp && resp.responseJSON && resp.responseJSON.message) || 'Something went wrong!';
//   return {type: 'pageError', error: error};
// }

// export function submitLogin(ownerInfo) {
//   let asyncAction = function(dispatch) {
//     $.ajax({
//       method: 'POST',
//       url:`http://localhost:3003/api/user/login/`,
//       data: JSON.stringify(ownerInfo),
//       contentType: 'application/json'
//     })
//
//     .then(data => {
//       dispatch({type: 'login1', data: data});
//       hashHistory.push('/')
//     })
//     .catch(resp => dispatch(pageError(resp)))
//   };
//   return asyncAction;
//
// }

// export function email9(text){
//   return {
//     type: "email",
//     data: text
//   }
// }
//
// export function password19(text){
//   return {
//     type: "password1",
//     data: text
//   }
// }
