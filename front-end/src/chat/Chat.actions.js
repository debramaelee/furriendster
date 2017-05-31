import $ from 'jquery';
import {hashHistory} from 'react-router';
import BASEURL from '../baseurl';

export function pageError(resp) {
  let error=(resp && resp.responseJSON && resp.responseJSON.message) || 'Something went wrong!';
  return {type: 'pageError', error: error};
}

// export function sendChat(comment) {
//   let asyncAction = function(dispatch) {
//     $.ajax({
//       method: 'POST',
//       url:`${BASEURL}/api/chat_room`,
//       data: comment,
//       contentType: 'application/json'
//     })
//     .then(data=> {
//       dispatch({type: 'submit', data: comment});
//
//     })
//     .catch(resp => dispatch(pageError(resp)))
//   };
//   return asyncAction
// }


// export function pageError(resp) {
//   let error=(resp && resp.responseJSON && resp.responseJSON.message) || 'Something went wrong!';
//   return {type: 'pageError', error: error};
// }
//
// export function getOwnerInfo(id, token) {
//   let asyncAction = function(dispatch) {
//     $.get(`${BASEURL}/api/ownerpage/` + id, {token})
//     .then(data=> {
//       dispatch({
//         type: 'ownerpage',
//         payload: data
//       });
//     })
//     .catch(resp => {
//           let error = (resp.responseJSON &&
//             resp.responseJSON.message) ||
//             resp.responseText;
//           dispatch({
//             type: 'ownerpage-error',
//             error: error
//           });
//         });
//     };
//     return asyncAction;
// }
//
//
// export function getPet(id, token) {
//   let asyncAction = function(dispatch) {
//     $.get(`${BASEURL}/api/allpets/`+ id, {
//       token: token
//     })
//     .then(data=>{
//       dispatch({
//         type: 'petinfo',
//         payload: data
//       })
//     })
//     .catch(resp=> {
//       let error = (resp.responseJSON &&
//         resp.responseJSON.message) ||
//         resp.responseText;
//       dispatch({
//         type: 'petinfo-error',
//         error: error
//       });
//     });
//   };
//   return asyncAction;
//   }
