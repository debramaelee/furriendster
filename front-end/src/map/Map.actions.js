import $ from 'jquery';



export function updateCenter(center) {
  return {
    type: 'update-center',
    value: center
  };
}
