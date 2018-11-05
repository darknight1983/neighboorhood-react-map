
import React, { Component } from 'react';

// Components
import Header from './Header';
import TwoColGrid from './TwoColGrid';
import Container from './ContainerComp';

import logo from './logo.svg';
import './App.css';

// Import hard-coded location-data
import Locations from './locations.json'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = { locations: Locations}

  }
  render() {
    const { locations } = this.state;

    return (
      <div className="App">
        <Header />
          {/*
              Using Material-UI to create a two-column grid that will hold
              an input section and a map section
           */}

        <Container locations={locations}/>
      </div>
    )
  }
}
