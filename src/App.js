import React, { Component } from 'react';

// Components
import Header from './Header';
import TwoColGrid from './TwoColGrid';
import Container from './ContainerComp';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
          {/*
              Using Material-UI to create a two-column grid that will hold
              an input section and a map section
           */}

        <Container />


      </div>
    );
  }
}

export default App;
