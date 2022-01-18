import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import FeedBackPoints from '../../components/FeedBackPoints';
import './feedback.css';

export class Feedback extends Component {
  render() {
    return (
      <div className="feedback">
        <Header />
        <main>
          <h1>
            Feedback
          </h1>
          <FeedBackPoints />
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
        </main>
      </div>
    );
  }
}

export default Feedback;
