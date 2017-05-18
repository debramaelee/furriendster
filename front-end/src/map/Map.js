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

  // findCoord() {
  //
  //   let zipCode = this.map.loginInfo;
  //   console.log(zipCode);
  //
  // }

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

  // geocodeAddress(geocoder, resultsMap) {
  //   let address = this.props.zip;
  //   geocoder.geocode({'address' : address}, (results, status)=>{
  //     resultsMap.setCenter(results[0].geometry.location);
  //   })
  // }

  // var geocoder = new google.maps.Geocoder();
  // geocodeAddress(geocoder, map);

  componentDidMount() {
    console.log('component mounting')
    this.props.getUserInfo();

    this.infoWindow = new google.maps.InfoWindow();

    console.log('Map did mount');
    let coord = {
      lat: this.props.lat,
      lng: this.props.lng
    };
    let map = this.map = new google.maps.Map(this.mapElm, {
      zoom: 15,
      center: coord,
      styles: [{
            stylers: [{ visibility: 'simplified' }]
          }, {
            elementType: 'labels',
            stylers: [{ visibility: 'on' }]
          }]
    });



    this.service = new google.maps.places.PlacesService(map);
    //creating a new funct calling perfSearch method
    this.map.addListener('idle', ()=>this.performSearch());
    // this.map.addListener('idle', this.performSearch);
  }

   update(){
    let coord = {
      lat: this.latInput.value,
      lng: this.lngInput.value
    };


    this.props.updateCenter(coord);
    // this.props.getUserInfo();
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
        <label>Latitude</label>
        <input type="text"
          ref={input => this.latInput = input}/><br/>
        <label>Longitude</label>
        <input type="text"
          ref={input => this.lngInput = input}/>
        <label>Zip Code</label>
        <input type="text"
          ref={input => this.zipCode = input}/>
        <button onClick={() => this.update()}>Update</button>
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
