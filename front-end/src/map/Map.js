import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Map.actions';
const google = window.google;

class Map extends React.Component {
  componentDidMount() {
    this.timeoutId = setInterval(function() {
      console.log('hey');
    }, 1000);
    console.log('Map did mount');
    let coord = {
      lat: this.props.lat,
      lng: this.props.lng
    };
    this.map = new google.maps.Map(this.mapElm, {
      zoom: 6,
      center: coord
    });
  }
  update() {
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
