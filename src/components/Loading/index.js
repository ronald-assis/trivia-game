import React, { Component } from 'react';
import './style.css';

class Loading extends Component {
  render() {
    return (
      <div className="stripes">
        <div className="stripe" />
        <div className="stripe" style={ { animationDelay: '0.10s' } } />
        <div className="stripe" style={ { animationDelay: '0.20s' } } />
        <div className="stripe" style={ { animationDelay: '0.30s' } } />
      </div>
    );
  }
}

export default Loading;
