import React, { Component } from 'react';
import { GoogleApiWrapper, Map, InfoWindow } from 'google-maps-react';

import * as helpers from './utils/helpers';

import './ContainerComp.css';

import LocationList from './LocationsList';



export class Container extends Component {
  constructor(props) {
    super(props)

    this.state = {
      markers: [],
      markerProps: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      map: null

    }

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onListItemClick = this.onListItemClick.bind(this);
    this.onMapReady = this.onMapReady.bind(this);
    this.updateMarkers = this.updateMarkers.bind(this);

  }
  componentDidMount() {
    console.log(this.state.markerProps)
    /*
      First goal was to create the markers and apply the markers to the instance
      of the map that I currently have in state.

      Second goal is to store each marker in the markers array on the state
      object.


    */

  }

  updateMarkers(locations) {

    // Check that locations are Available
    if (!locations) {
      return;
    }

    // If markers are present on the map, remove those markers
    this.state.markers.forEach(marker => marker.setMap(null));

    let markerProps = [];

    // Array for holding markers for state object. Will need to
    // re-factor soon.
    let sMarkers = [];
    let markers = locations.map((location, i) => {
      const {lat, lng} = location.corrds;




      helpers.getData(lat, lng).then(data => {
        const location_id = data.response.venues[0].id;
        helpers.getLocationImg(location_id)
          .then(data => {
            let picture;
            if (data.meta.code !== 200) {
              picture = 'https://via.placeholder.com/200'
            } else {
              const { prefix, suffix, width, height } = data.response.photos.items[0];
              picture = `${prefix}${width}x${height}${suffix}`;
            }
            let mProps = {
              key: i,
              index: i,
              name: location.name,
              position: location.corrds,
              url: location.url,
              picture: picture
            };
            markerProps.push(mProps);
            let animation = this.props.google.maps.Animation.DROP;
            let marker = new this.props.google.maps.Marker({
              position: location.corrds,
              map: this.state.map,
              animation
            });
            marker.addListener('click', () => {
              this.onMarkerClick(mProps, marker, null)
            })
            // Return marker was here
            sMarkers.push(marker)
            return marker;
          }).catch(err => console.log(err))

      }).catch(err => console.log(err))

    })


    this.setState({
      markers: sMarkers,
      markerProps
    })
  }


  onMarkerClick(props, marker, e) {
    console.log(marker)
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
  }

  onListItemClick(name, marker, mProps) {
    console.log(marker)
    this.setState({
      showingInfoWindow: true,
      activeMarker: marker,
      selectedPlace: mProps
    })
  }
  onMapReady(props, map) {
    this.setState({map});
    this.updateMarkers(this.props.locations);
  }
  render() {
    const { locations } = this.props;
    const { markers, markerProps } = this.state;

    const bounds = new this.props.google.maps.LatLngBounds();
    locations.forEach(location => {
      bounds.extend(location.corrds)
    })

    return (
      <div className="flex-container">
        <div className="list">
          <LocationList spots={locations}
                        handleItemClick={this.onListItemClick}
                        markers={markers}
                        markerProps={markerProps}/>
        </div>
        <div className="google-map">
          <div>
            <Map google={this.props.google}
                 zoom={13}
                 initialCenter={{
                   lat: 33.019844,
                   lng: -96.698883
                 }}
                 bounds={bounds}
                 onReady={this.onMapReady}
                 >

              <InfoWindow marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                  <div>
                    <h1>{this.state.selectedPlace.name}</h1>
                    <div className="location-img">
                      <img src={this.state.selectedPlace.picture} alt={'library'} />
                    </div>
                  </div>
              </InfoWindow>
            </Map>
          </div>
        </div>
      </div>

    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCv9DMZsLYEZDWHZdb3ugmCE13vW-2ux-0'
})(Container)
