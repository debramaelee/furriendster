import $ from 'jquery';
import {hashHistory} from 'react-router';
import BASEURL from '../baseurl';



export function pageError(resp) {
  let error=(resp && resp.responseJSON && resp.responseJSON.message) || 'Something went wrong!';
  return {type: 'pageError', error: error};
}

export function getOwnerInfo(id) {
  let asyncAction = function(dispatch) {
    $.get(`${BASEURL}/api/ownerpage/` + id)
    .then(data=> {
      dispatch({
        type: 'ownerpage',
        payload: data
      });
    })
    .catch(resp => {
          let error = (resp.responseJSON &&
            resp.responseJSON.message) ||
            resp.responseText;
          dispatch({
            type: 'ownerpage-error',
            error: error
          });
        });
    };
    return asyncAction;
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
