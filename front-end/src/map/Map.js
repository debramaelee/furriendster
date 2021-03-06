import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Map.actions';
const google = window.google;
import bluebird from 'bluebird';


class Map extends React.Component {

  performSearch() {

    var request = {
      bounds: this.map.getBounds(),
      keyword: 'dog park'
    };

    let callback = (results, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        console.error(status);
        return;
      }
      for (var i = 0, result; result = results[i]; i++) {
        this.addMarker(result);
      }
    }

    this.service.radarSearch(request, callback);


  }
///need to pass in a string, not 2 objects

///test insert

///test insert

  addMarker(place) {
    var marker = new google.maps.Marker({
      map: this.map,
      position: place.geometry.location,
      icon: {
        url: '/owner.png',
        anchor: new google.maps.Point(10, 10),
        scaledSize: new google.maps.Size(40, 40)
      }
    });



    // console.log('here is the markers: ' + marker.position + ownerMarker.position)

    google.maps.event.addListener(marker, 'click', ()=> {
      this.service.getDetails(place, (result, status)=> {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          console.error(status);
          return;
        }
        this.infoWindow.setContent(result.name);
        this.infoWindow.open(this.map, marker);
      });
    });
  }

  fetchLocations(addresses) {
    let geocoder = new google.maps.Geocoder();
    // let addressid = [];
    // // let allAddresses = this.props.addresses
    // for (let i = 0; i < allAddresses.length; i++) {
    //   // let street = allAddresses[i].street
    //   // let zip = allAddresses[i].zip
    //   // let id = allAddresses[i].id
    //   // let streetzip = street + ' ' + zip
    //   // addresses.splice(i, 0, streetzip)
    //
    //
    //   //attempt to run bluebird map when addresses becomes complete
    //   // if (addresses.length === allAddresses.length) {
    //   //
    //   // }
    // }

    // let addresses = [
    //   '527 Main St Atlanta GA 30324',
    //   '3453 Piedmont Atlanta GA',
    //   '7301 Sloan Square Atlanta GA 30329'
    // ]
    // function findLat(){
    //   return geometry.location.lat();
    // }


    bluebird.mapSeries(addresses, geocode)
      .then(resultss => {
        // var geocoder = new google.maps.Geocoder();
        let arr=[]
        for (let i = 0; i < addresses.length; i++){
        // addresses.forEach((results, i)=>{
          let id = addresses[i].id;
          let name = addresses[i].name;
          if (resultss[i] == null) {
          }
          let latitude = resultss[i][0].geometry.location.lat();
          let longitude = resultss[i][0].geometry.location.lng();
          let latlong = [latitude, longitude]
          arr.splice(i, 0, latlong)

          let infowindow = new google.maps.InfoWindow({
            content: `<a href="#/ownerpage/${id}">${name}</a>`
          });

          let ownerMarker = new google.maps.Marker({
            url: "#",
            map: this.map,
            position: new google.maps.LatLng(latitude, longitude),
            icon: {
              url: '/paw80.png',
              anchor: new google.maps.Point(10, 10),
              scaledSize: new google.maps.Size(40, 40)
            }
          });

          ownerMarker.addListener('click', function() {
            infowindow.open(this.map, ownerMarker);

          });

        }

        // let longitude = resultss.map.geometry.location.lat();
        //
        // // var latitude = resultss[0].geometry.location.lat();
        // // var longitude = resultss[0].geometry.location.lng();
        // console.log(latitude, longitude);
        //
        //  let coord = {
        //   lat: latitude,
        //   lng: longitude
        // }
        // console.log('coord', coord);

      })
      .catch (err=>{
        console.log(err.stack)
      });
    function geocode(address) {
      return new Promise(function(accept, reject) {
        var geocoder = new google.maps.Geocoder();
        setTimeout(function() {
          geocoder.geocode({'address': address.street + ' ' + address.zip}, (results, status) => {
            console.log('status', status);
            if (status === 'OVER_QUERY_LIMIT') {
              reject(new Error('Over query limit'));
            } else {
              accept(results);
            }
          });
        }, 1000);
      })
    }


    // geocode('kjkgkdjjgfhgfgfjfhfjdhfjdhfjjdfjdhjfhdjfhdfhd')
    //   .then(results => {
    //     console.log('results', results);
    //   });



  }

  initializeMap() {

    let address = this.props.zip

    let map = this.map = new google.maps.Map(this.mapElm, {
      zoom: 13,
      styles: [{
            stylers: [{ visibility: 'simplified' }]
          }, {
            elementType: 'labels',
            stylers: [{ visibility: 'on' }]
          }]
    });

    this.service = new google.maps.places.PlacesService(map);


    this.center(address, () => {
      this.map.addListener('idle', ()=>{

        this.performSearch();
      });

    });


    this.infoWindow = new google.maps.InfoWindow();

  }

  center(address, callback) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': address}, (results, status)=>{
      let coord;

      if (status == google.maps.GeocoderStatus.OK) {
        console.log('Got info');
        var latitude = results[0].geometry.location.lat();
        var longitude = results[0].geometry.location.lng();
         coord = {
          lat: latitude,
          lng: longitude

        };
        this.map.setCenter(coord);
        if (callback) {
          callback();
        }
      } else {
        console.log('No info', status);
      }
    });
  }
  componentDidMount() {

    this.initializeMap();
    this.props.getLocations();
  }

   update(){

    let coord = {
      lat: this.latInput.value,
      lng: this.lngInput.value
    };
    this.props.updateCenter(coord);
  }

  componentWillReceiveProps(newProps) {


    if (this.props.lat !== newProps.lat ||
        this.props.lng !== newProps.lng) {
      this.map.setCenter({
        lat: Number(newProps.lat),
        lng: Number(newProps.lng)
      });
    }

    if(this.props.zip !== newProps.zip) {
      this.center(newProps.zip);
    }
    if(this.props.addresses !== newProps.addresses){
      console.log('fetching locations');
      this.fetchLocations(newProps.addresses);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timeoutId);
  }

  render() {

    let allAddresses = this.props.addresses

    return (
      <div className="mappage">
        <h1>Local Map</h1>
        <div className="map" ref={elm => this.mapElm = elm}>

        </div>
        <div className="iconbox">
        <h2>Icon Key</h2>
        <div className="iconkey">
          <div>
            <img src="/owner.png" width="50px"/>
            <label>Dog Parks</label>
          </div>
          <div>
            <img src="http://www.clker.com/cliparts/N/X/V/T/T/U/teal-paw-print-hi.png" width="50px"/>
            <label>Nearby Furriends</label>
          </div>
          </div>
        </div>

      </div>
    );
  }
}


const MapContainer = ReactRedux.connect(
  state => ({
    lat: state.map.lat,
    lng: state.map.lng,
    // login: state.login,
    addresses: state.map.addresses,
    name: state.map.name,

    // zips: state.map.addresses.zip,
    zip: state.login.loginInfo && state.login.loginInfo.zip
  }),

  actions
)(Map);

export default MapContainer;
