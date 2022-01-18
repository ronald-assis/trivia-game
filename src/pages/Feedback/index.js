import React, { Component } from 'react';
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
        </main>
      </div>
    );
  }
}

export default Feedback;
