import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import FeedBackPoints from '../../components/FeedBackPoints';
import './feedback.css';

export class Feedback extends Component {
  componentDidMount() {
    const { name, score, picture } = this.props;
    const currPlayer = { name, score, picture };
    const currRanking = JSON.parse(localStorage.getItem('ranking'));
    if (currRanking) {
      currRanking.push(currPlayer);
      localStorage.setItem('ranking', JSON.stringify(currRanking));
    } else {
      localStorage.setItem('ranking', JSON.stringify([currPlayer]));
    }
  }

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
            <Link to="/ranking">
              <button
                type="button"
                data-testid="btn-ranking"
              >
                ranking
              </button>
            </Link>
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  picture: state.player.picture,
  score: state.player.score,
});

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
