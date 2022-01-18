import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

export class Feedback extends Component {
  render() {
    return (
      <div>
        Feedback
        <Header />
        <div>
          <Link to="/">
            <button
              type="button"
              data-testid="btn-play-again"
            >
              Play Again
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Feedback;
