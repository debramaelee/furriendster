import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Map.actions';
const google = window.google;

class Map extends React.Component {

  componentDidMount() {

    var infoWindow;
    var service;

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

    service = new google.maps.places.PlacesService(map);
    map.addListener('idle', performSearch);


    function performSearch() {
      var request = {
        bounds: map.getBounds(),
        keyword: 'dog park'
      };
      service.radarSearch(request, callback);
    }

    function callback(results, status) {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        console.error(status);
        return;
      }
      for (var i = 0, result; result = results[i]; i++) {
        addMarker(result);
      }
    }

    function addMarker(place) {
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: {
          url: 'https://cdn1.iconfinder.com/data/icons/cute-corgi-dog-emoticon/595/CUTE_CORGI_DOG_EMOTICON-08-512.png',
          anchor: new google.maps.Point(10, 10),
          scaledSize: new google.maps.Size(50, 50)
        }
      });

      google.maps.event.addListener(marker, 'click', function() {
        service.getDetails(place, function(result, status) {
          if (status !== google.maps.places.PlacesServiceStatus.OK) {
            console.error(status);
            return;
          }
          infoWindow.setContent(result.name);
          infoWindow.open(map, marker);
        });
      });
    }

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
    return (
      <div>
        <label>Latitude</label>
        <input type="text"
          ref={input => this.latInput = input}/><br/>
        <label>Longitude</label>
        <input type="text"
          ref={input => this.lngInput = input}/>
        <button onClick={() => this.update()}>Update</button>
        <div className="map" ref={elm => this.mapElm = elm}>
        </div>
      </div>
    );
  }
}


const MapContainer = ReactRedux.connect(
  state => state.map,
  actions
)(Map);

export default MapContainer;
