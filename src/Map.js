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
      },
      places: [
        {title: 'Starbucks', location: {lat: 33.108260, lng: -96.806760}}
      ]
    }

    this.loadMap = this.loadMap.bind(this);
    this.recenterMap = this.recenterMap.bind(this);
    this.renderChildren = this.renderChildren.bind(this);

  }
  componentDidMount() {
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          const coordinates = pos.coords;
          console.log(coordinates)
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
    const map = this.map;
    const curr = this.state.currentLocation;

    const google = this.props.google;
    const maps = google.maps

    if (map) {
      let center = new maps.LatLng(curr.lat, curr.lng)
      map.panTo(center) // panTo() method from google.maps.Map() instance
    }
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

      // Listen for events on the map
      const evtNames = ['click', 'dragend', 'ready'];

      const camelize = function(str) {
        return str.split(' ').map(function(word){
          return word.charAt(0).toUpperCase() + word.slice(1);
        }).join('');
      }

      evtNames.forEach(e => {
        Map.propTypes[camelize(e)] = PropTypes.func
        this.map.addListener(e, this.handleEvent(e))
      })


    }
  }
  handleEvent(evtName) {
    const camelize = function(str) {
      return str.split(' ').map(function(word){
        return word.charAt(0).toUpperCase() + word.slice(1);
      }).join('');
    }
    let timeout;
    const handlerName = `on${camelize(evtName)}`;
    console.log(handlerName)
    return (e) => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout(() => {
        if (this.props[handlerName]) {
          this.props[handlerName](this.props, this.map, e)
        }
      }, 0);
    }
  }

  renderChildren() {
    const { children } = this.props;

    if (!children) return;

    return React.Children.map(children, c => {
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation
      })
    })
  }
  render() {
    const style = {
      width: '100vw',
      height: '100vh'
    }
    return (
      <div ref="map" style={style}>
        Loading Map...
        {this.renderChildren()}
      </div>
    )
  }
}

Map.propTypes = {
  google: PropTypes.object.isRequired,
  zoom: PropTypes.number,
  initialCenter: PropTypes.object,
  centerAroundCurrentLocation: PropTypes.bool,
  onMove: PropTypes.func
}

Map.defaultProps = {
  zoom: 14,
  initialCenter: {
    lat: 33.0814792,
    lng: -96.82613570000001
  },
  centerAroundCurrentLocation: true,
  onMove: function() {}
}
