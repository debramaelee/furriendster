let BASEURL = 'http://localhost:3003';
if(window.location.hostname !== 'localhost') {
	BASEURL = '';
}

export default BASEURL;