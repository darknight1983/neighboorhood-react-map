import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './Header';
import TwoColGrid from './TwoColGrid'









class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <section className='grid-system'>
          {/*
            Using Material-UI to create a two-column grid that will hold
            an input section and a map section
           */}
          <TwoColGrid />
        </section>
      </div>
    );
  }
}

export default App;
