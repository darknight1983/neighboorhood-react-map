import React, { Component } from 'react';
import { GoogleApiWrapper, Map, Marker, InfoWindow } from 'google-maps-react';

import * as helpers from './utils/helpers';

import './ContainerComp.css';

import LocationList from './LocationsList';



export class Container extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      map: null,
      markers: []
    }

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onListItemClick = this.onListItemClick.bind(this);
    this.onMapReady = this.onMapReady.bind(this);

  }
  componentDidMount() {
    console.log(this.props.google)
    /*
      First goal was to create the markers and apply the markers to the instance
      of the map that I currently have in state.

      Second goal is to store each marker in the markers array on the state
      object.


    */
    const Markers = this.props.locations.map(location => {
      return new this.props.google.maps.Marker({
        position: location.corrds,
        name: location.name,
      })
    })
    console.log(Markers)
    this.setState({markers: Markers})
  }


  onMarkerClick(props, marker, e) {
    console.log(props)
    const {lat, lng} = props.position;

    helpers.getData(lat, lng)
      .then(data => {
        const location_id = data.response.venues[0].id;
        helpers.getLocationImg(location_id)
          .then(data => {
            const { prefix, suffix, width, height } = data.response.photos.items[0];
            const picture = `${prefix}${width}x${height}${suffix}`;
            const propsWithImg = {
              ...props,
              picture
            };
            this.setState({
              selectedPlace: propsWithImg,
              activeMarker: marker,
              showingInfoWindow: true
            });
          })
      })

  }

  onListItemClick(name) {
    console.log(this.state.map)
    this.props.locations.forEach(location => {
      // console.log(location.name);
      if(location.name === name){
        return location;
      }
    })
    // Use the name that was passed to filter the locations array
    // to make sure that only the locatioan associated with this name
    // is on the map
    // const newList = this.state.locations.filter((spot) => spot.name === name)

  }
  onMapReady(props, map) {
    this.setState({map});
    // const { locations } = this.state;
    // locations.forEach((spot) => {
    //   const { lat, lng } = spot.corrds;
    //   helpers.getData(lat, lng)
    //   // I need to determine whether I store the data in the components
    //   // state or find a better way to make this api call.
    //     .then(data => console.log(data))
    // })

  }
  render() {
    const { locations } = this.props;

    const bounds = new this.props.google.maps.LatLngBounds();
    locations.forEach(location => {
      bounds.extend(location.corrds)
    })

    return (
      <div className="flex-container">
        <div className="list">
          <LocationList spots={locations}
                        handleItemClick={this.onListItemClick}/>
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
                 {locations.map((location, i) => (
                   <Marker position={location.corrds}
                           name={location.name}
                           onClick={this.onMarkerClick}
                           key={i}/>
                 ))}
              <InfoWindow marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                  <div>
                    <h1>{this.state.selectedPlace.name}</h1>
                    <img src={this.state.selectedPlace.picture} alt={'library'} />
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
