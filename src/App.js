import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';

import GiftPage from './components/GiftPage.js'
import GuardPage from './components/GuardPage.js'
import GiftPage1 from './components/GiftPage1.js'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/gift" component={GiftPage}></Route>
          <Route path="/guard" component={GuardPage}></Route>
          <Route path="/gift1" component={GiftPage1}></Route>
        </div>
      </Router>
    );
  }
}

export default App;
