import $ from 'jquery';
import {hashHistory} from 'react-router';
import BASEURL from '../baseurl';



export function pageError(resp) {
  let error=(resp && resp.responseJSON && resp.responseJSON.message) || 'Something went wrong!';
  return {type: 'pageError', error: error};
}

export function getPetInfo(id) {
  let asyncAction = function(dispatch) {
    $.get(`${BASEURL}/api/petpage/` + id)
    .then(data=> {
      dispatch({
        type: 'petpage',
        payload: data
      });
    })
    .catch(resp => {
          let error = (resp.responseJSON &&
            resp.responseJSON.message) ||
            resp.responseText;
          dispatch({
            type: 'petpage-error',
            error: error
          });
        });
    };
    return asyncAction;
  }
