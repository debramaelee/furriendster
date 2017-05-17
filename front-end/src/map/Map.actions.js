import $ from 'jquery';
import {hashHistory} from 'react-router';



export function updateCenter(center) {
  return {
    type: 'update-center',
    value: center
  };
}
