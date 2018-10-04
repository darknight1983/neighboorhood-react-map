import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import Map from './Map';

export class Container extends Component {
  render() {

    return (
      <div>
        <Map google={this.props.google} />
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCv9DMZsLYEZDWHZdb3ugmCE13vW-2ux-0'
})(Container)
