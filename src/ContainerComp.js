import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import Map from './Map';
import Marker from './Marker';
import InfoWindow from './InfoWindow';

import './ContainerComp.css';

import LocationList from './LocationsList';

export class Container extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      locations: [
        { name: "Starbucks", corrds: {lat: 33.108260, lng: -96.806760}},
        { name: "Petes", corrds: {lat: 33.110570, lng: -96.807040}},
        { name: "JavaHouse", corrds: {lat: 33.047269, lng: -96.757092}}
      ]
    }

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onListItemClick = this.onListItemClick.bind(this);

  }
  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onListItemClick(item) {
    console.log('You are clicking', item)
  }
  render() {
    const { locations } = this.state;

    return (
      <div className="flex-container">
        <div className="list">
          <LocationList spots={locations}
                        handleItemClick={this.onListItemClick}/>
        </div>
        <div className="google-map">
          <div>
            <Map google={this.props.google}>
              <Marker position={locations[0].corrds}
                      name={"Starbucks"}
                      onClick={this.onMarkerClick}/>
                    <Marker position={locations[1].corrds}
                      name={"Pete"}
                      onClick={this.onMarkerClick}/>

                    <InfoWindow marker={this.state.activeMarker}
                          visible={this.state.showingInfoWindow}>
                        <div>
                          <h1>{this.state.selectedPlace.name}</h1>
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
