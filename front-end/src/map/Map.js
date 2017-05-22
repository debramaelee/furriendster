import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Map.actions';
const google = window.google;


class Map extends React.Component {

  performSearch() {
    var request = {
      bounds: this.map.getBounds(),
      keyword: 'dog park'
    };
    let callback=(results, status) => {

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


  addMarker(place) {
    var marker = new google.maps.Marker({
      map: this.map,
      position: place.geometry.location,
      icon: {
        url: 'https://cdn1.iconfinder.com/data/icons/cute-corgi-dog-emoticon/595/CUTE_CORGI_DOG_EMOTICON-08-512.png',
        anchor: new google.maps.Point(10, 10),
        scaledSize: new google.maps.Size(50, 50)
      }
    });

    var ownerMarker = new google.maps.Marker({
      map: this.map,
      position: new google.maps.LatLng(33.75, -84.38),
      icon: {
        url: 'https://image.flaticon.com/icons/png/512/12/12638.png',
        anchor: new google.maps.Point(10, 10),
        scaledSize: new google.maps.Size(50, 50)
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

  fetchLocations() {
    function geocode(address) {
      return new Promise(function(accept, reject) {
        geocoder.geocode({'address': address}, (results, status) => {
          accept(results);
        });
      })
    }

    

  }

  componentDidMount() {
    var geocoder = new google.maps.Geocoder();
    let address = this.props.zip

    geocoder.geocode( { 'address': address}, (results, status)=>{
      let coord;

      if (status == google.maps.GeocoderStatus.OK) {
        var latitude = results[0].geometry.location.lat();
        var longitude = results[0].geometry.location.lng();
        console.log(latitude, longitude);
         coord = {
          lat: latitude,
          lng: longitude

        };
        let map = this.map = new google.maps.Map(this.mapElm, {
          zoom: 13,
          center: coord,
          styles: [{
                stylers: [{ visibility: 'simplified' }]
              }, {
                elementType: 'labels',
                stylers: [{ visibility: 'on' }]
              }]
        });
        this.service = new google.maps.places.PlacesService(map);
        this.map.addListener('idle', ()=>this.performSearch());

        }
    });

    console.log('component mounting')

    this.infoWindow = new google.maps.InfoWindow();

    console.log('Map did mount');

  }

   update(){
    let coord = {
      lat: this.latInput.value,
      lng: this.lngInput.value
    };
    this.props.updateCenter(coord);
  }

  componentWillReceiveProps(newProps) {
    // old props
    if (this.props.lat !== newProps.lat ||
        this.props.lng !== newProps.lng) {
      this.map.setCenter({
        lat: Number(newProps.lat),
        lng: Number(newProps.lng)
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.timeoutId);
    console.log('Map will unmount');
  }

  render() {
    console.log(this.props.zip)

    return (
      <div>

        <div className="map" ref={elm => this.mapElm = elm}>
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
    zip: state.login.loginInfo.zip
  }),

  actions
)(Map);

export default MapContainer;
