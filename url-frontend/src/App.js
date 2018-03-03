import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">

          {/* HOME */}
          <Route path='/' exact={true} component={Landing} />

          {/* SIGNUP */}
          <Route path='/signup' exact={true} component={Signup} />

          {/* LOGIN */}
          <Route path='/login' exact={true} component={Login} />

          {/* DASHBOARD */}
          <Route path='/dashboard' exact={true} component={Dashboard} />


          
        </div>
      </Router>
      
    )
  }
}

export default App;
