import $ from 'jquery';
import {hashHistory} from 'react-router';
import BASEURL from '../baseurl';


export function updateCenter(center) {
  return {
    type: 'update-center',
    value: center
  };
}

export function getPet(id) {
  let asyncAction = function(dispatch) {
    $.get(`${BASEURL}/api/petpage`)
    .then(data=>{
      dispatch({
        type: 'petinfo',
        payload: data
      })
    })
    .catch(resp=> {
      let error = (resp.responseJSON &&
        resp.responseJSON.message) ||
        resp.responseText;
      dispatch({
        type: 'petinfo-error',
        error: error
      });
    });
  };
  return asyncAction;
  }

export function getLocations() {
  let asyncAction = function(dispatch) {
    $.get(`${BASEURL}/api/owner_info/`)
    .then(data=>{
      dispatch({
      type: 'usermap',
      payload: data
    });
  })
  .catch(resp=> {
    let error = (resp.responseJSON &&
      resp.responseJSON.message) ||
      resp.responseText;
    dispatch({
      type: 'usermap-error',
      error: error
    });
  });
};
return asyncAction;
}
