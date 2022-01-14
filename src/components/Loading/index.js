import React, { Component } from 'react';
import './style.css';

class Loading extends Component {
  constructor() {
    super();

    this.state = {
      stripeIndex: 0,
      stripeMaxIndex: 3,
    };
  }

  componentDidMount() {
    const INTERVAL = 50;
    this.idInterval = setInterval(() => {
      const { stripeMaxIndex } = this.state;
      this.setState((prevState) => ({
        stripeIndex: prevState.stripeIndex + 1 > stripeMaxIndex ? 0
          : prevState.stripeIndex + 1,
      }));
    }, INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.idInterval);
  }

  render() {
    return (
      <>
        <div className="stripes">
          <div className="stripe" style={ { animationDelay: '0.25s' } } />
          <div className="stripe" style={ { animationDelay: '0.35s' } } />
          <div className="stripe" style={ { animationDelay: '0.45s' } } />
          <div className="stripe" style={ { animationDelay: '0.55s' } } />
        </div>
        <div>
          <h2>Carregando...</h2>
        </div>
      </>
    );
  }
}

export default Loading;
