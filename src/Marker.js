import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class Marker extends Component {
  componentDidUpdate(prevProps) {
    if ((this.props.map !== prevProps.map) ||
      (this.props.position !== prevProps.position)) {
        // The relevant props have changed
        this.renderMarker()
      }
  }

  componentWillUnmount() {
    if (this.marker) {
      this.marker.setMap(null)
    }
  }

  handleEvent(evtName) {
    const camelize = function(str) {
      return str.split(' ').map(function(word){
        return word.charAt(0).toUpperCase() + word.slice(1);
      }).join('');
    }
    return (e) => {
      const eName = `on${camelize(evtName)}`;
      if (this.props[eName]) {
        this.props[eName](this.props, this.marker, e);
      }
    }
  }

  renderMarker() {
    let { map, google, position, mapCenter } = this.props;
    let pos = position || mapCenter;

    position = new google.maps.LatLng(pos.lat, pos.lng)

    const pref = {
      map: map,
      position: position
    };

    // Events that I want listen for on the markers
    const evtNames = ['click', 'mouseover'];

    this.marker = new google.maps.Marker(pref);

    evtNames.forEach(e => {
      this.marker.addListener(e, this.handleEvent(e))
    })

  }
  render() {
    return (
      null
    )
  }
}

Marker.propTypes = {
  postion: PropTypes.object,
  map: PropTypes.object
}
