import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

export class Feedback extends Component {
  render() {
    return (
      <div>
        <h1
          data-testid="feedback-text"
        >
          Feedback

        </h1>
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
          <Link to="/ranking">
            <button
              type="button"
              data-testid="btn-ranking"
            >
              ranking
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Feedback;
