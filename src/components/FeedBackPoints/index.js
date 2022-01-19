import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './feedBackPoints.css';
import { Text } from '@chakra-ui/react';

const FeedBackPoints = ({ hitsProps, scoreProps }) => {
  const pontsResult = () => {
    const pontsMin = 3;
    if (hitsProps < pontsMin) return 'Could be better...';
    return 'Well Done!';
  };
  return (
    <div className="feedback-text">
      <div className="feedback-ranking">
        <Text fontSize="22px" textAlign="center" color="white">
          {'Você acertou '}
          <span data-testid="feedback-total-question">
            { hitsProps }
          </span>
          {' questões!'}
        </Text>
        <Text fontSize="22px" textAlign="center" color="white">
          {'Um total de '}
          <span data-testid="feedback-total-score">
            {scoreProps}
          </span>
          {' pontos'}
        </Text>
        <Text
          fontSize="22px"
          textAlign="center"
          color="white"
          data-testid="feedback-text"
        >
          {pontsResult()}
        </Text>
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
