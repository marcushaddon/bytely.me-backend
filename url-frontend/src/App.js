import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Landing from './components/landing/Landing';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Landing longUrl=''/>
      </div>
    )
  }
}

export default App;
