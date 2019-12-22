import React, { Component } from 'react';
import { toast } from 'react-interaction';

export default class App extends Component {
  render () {
    return (
      <div className="container">
        <header>react-interaction</header>
        <h2>Toast popup</h2>
        <h3>Basic usage</h3>
        <div className="playground">
          <button type="button" onClick={() => toast('This is a toast message')}>toast</button>
        </div>
      </div>
    )
  }
}
