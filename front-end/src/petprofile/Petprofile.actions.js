import $ from 'jquery';
import {hashHistory} from 'react-router';
import BASEURL from '../baseurl';



export function pageError(resp) {
  let error=(resp && resp.responseJSON && resp.responseJSON.message) || 'Something went wrong!';
  return {type: 'pageError', error: error};
}
//working on upload 
export function upload(images){
  return {
    type: "images"
  }
}

export function submitPet(petInfo) {
  let asyncAction = function(dispatch) {
    $.ajax({
      method: 'POST',
      url:`${BASEURL}/api/petprofile`,
      data: JSON.stringify(petInfo),
      contentType: 'application/json'
    })

    .then(data => {
      dispatch({type: 'submit', data: petInfo});
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

export function gender9(text){
  return {
    type: "gender",
    data: text
  }
}

export function fixed9(text){
  return {
    type: "fixed",
    data: text
  }
}

export function age9(text){
  return {
    type: "age",
    data: text
  }
}

export function size9(text){
  return {
    type: "size",
    data: text
  }
}

export function personality9(text){
  return {
    type: "personality",
    data: text
  }
}

export function activity9(text){
  return {
    type: "activity",
    data: text
  }
}
