import $ from 'jquery';
import {hashHistory} from 'react-router';
import BASEURL from '../baseurl';
const cloudinary = window.cloudinary;


export function pageError(resp) {
  let error=(resp && resp.responseJSON && resp.responseJSON.message) || 'Something went wrong!';
  return {type: 'pageError', error: error};
}
//working on upload
export function uploadImage(event){
  return function(dispatch){
    cloudinary.openUploadWidget({cloud_name: 'dieot0dcp', upload_preset: 'tgihapgh', max_file_size: 750000},
      function(error, result) {
        if(result !== undefined){
          let urls = []
          result.forEach((result)=>{
            urls.push(result.url)
          })
          dispatch({
            type: "imageUploadComplete",
            value: urls
          })
        }else{
          dispatch({
            type: "imageUploadError",
            value: error.message
          })
        }

      });
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
