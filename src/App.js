import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';

import GiftPage from './components/GiftPage.js'
import GuardPage from './components/GuardPage.js'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/gift" component={GiftPage}></Route>
          <Route path="/guard" component={GuardPage}></Route>
        </div>
      </Router>
      // <div style={{color: 'red'}}>
      //   hello huahua
      // </div>
    );
  }
}

export default App;
