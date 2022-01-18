import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './feedBackPoints.css';

const FeedBackPoints = ({ hitsProps, scoreProps }) => {
  const pontsResult = () => {
    const pontsMin = 3;
    if (hitsProps < pontsMin) return 'Could be better...';
    return 'Well Done!';
  };
  return (
    <div className="feedback-text">
      <h3 data-testid="feedback-text">
        {pontsResult()}
      </h3>
      <div className="feedback-ranking">
        <p>
          {'Você acertou '}
          <span data-testid="feedback-total-question">
            { hitsProps }
          </span>
          {' questões!'}
        </p>
        <p>
          {'Um total de '}
          <span data-testid="feedback-total-score">
            {scoreProps}
          </span>
          {' pontos'}
        </p>
      </div>
    </div>
  );
};

FeedBackPoints.propTypes = {
  hitsProps: PropTypes.number,
  scoreProps: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  hitsProps: state.player.assertions,
  scoreProps: state.player.score,
});

export default connect(mapStateToProps)(FeedBackPoints);
