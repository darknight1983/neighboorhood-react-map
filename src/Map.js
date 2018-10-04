import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class Map extends Component {
  constructor(props) {
    super(props)

    const { lat, lng } = this.props.initialCenter;

    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      }
    }

    this.loadMap = this.loadMap.bind(this)
    this.recenterMap = this.recenterMap.bind(this)
  }
  componentDidMount() {
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          const coordinates = pos.coords;
          this.setState({
            currentLocation: {
              lat: coordinates.latitude,
              lng: coordinates.longitude
            }
          })
        })
      }
    }
    this.loadMap();
  }
  componentDidUpdate(prevProp, prevState) {
    if (prevProp.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap()
    }
  }

  recenterMap() {
    // Recenter the map
  }

  loadMap() {
    if (this.props && this.props.google) {
      // Google is available
      const { google } = this.props;
      const maps = google.maps;

      // Grab reference to Map from DOM using reactDOM
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef)


      // Instantiate a Google map object on our page, we'll use the map API
      let { zoom } = this.props;
      let { lat, lng } = this.state.currentLocation
      const center = new maps.LatLng(lat, lng);
      // Using Object.assign....so dope!
      const mapConfig = Object.assign({
        center: center,
        zoom: zoom
      })


      this.map = new maps.Map(node, mapConfig);

    }
  }
  render() {
    const style = {
      width: '100vw',
      height: '100vh'
    }
    return (
      <div ref="map" style={style}>
        Loading Map...
      </div>
    )
  }
}

Map.propTypes = {
  google: PropTypes.object.isRequired,
  zoom: PropTypes.number,
  initialCenter: PropTypes.object,
  centerAroundCurrentLocation: PropTypes.bool
}

Map.defaultProps = {
  zoom: 14,
  initialCenter: {
    lat: 37.774929,
    lng: -122.419416
  },
  centerAroundCurrentLocation: false
}
