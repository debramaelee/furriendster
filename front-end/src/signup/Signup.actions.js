import $ from 'jquery';
import {hashHistory} from 'react-router';
import BASEURL from '../baseurl';



export function pageError(resp) {
  let error=(resp && resp.responseJSON && resp.responseJSON.message) || 'Something went wrong!';
  return {type: 'pageError', error: error};
}

export function submitSignup(ownerInfo) {
  let asyncAction = function(dispatch) {
    $.ajax({
      method: 'POST',
      url:`${BASEURL}/api/user/signup/`,
      data: JSON.stringify(ownerInfo),
      contentType: 'application/json'
    })

    .then(data => {
      dispatch({type: 'signup', data: ownerInfo});
      hashHistory.push('/')   
    })
    .catch(resp => dispatch(pageError(resp)))
  };
  return asyncAction;

}

export function name9(text){
  return {
    type: "name",
    data: text
  }
}

export function email9(text){
  return {
    type: "email",
    data: text
  }
}

export function street9(text){
  return {
    type: "street",
    data: text
  }
}

export function phone9(text){
  return {
    type: "phone",
    data: text
  }
}

export function password19(text){
  return {
    type: "password1",
    data: text
  }
}

export function zip9(text){
  return {
    type: "zip",
    data: text
  }
}


