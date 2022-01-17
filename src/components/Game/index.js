import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Game = ({ answers, timesUp, stopCounting }) => {
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [incorrectAnswer, setIncorrectAnswer] = useState('');

  const eraseBorders = () => {
    setCorrectAnswer('');
    setIncorrectAnswer('');
  };

  const borderAnswer = (answer) => {
    setCorrectAnswer('green-border');
    setIncorrectAnswer('red-border');
    stopCounting(answer);
  };

  useEffect(() => {
    eraseBorders();
  }, [answers]);

  useEffect(() => {
    if (timesUp) {
      borderAnswer();
      stopCounting(false);
    } else {
      eraseBorders();
    }
  }, [timesUp, stopCounting]);

  return (
    <div
      className="answer-options"
      data-testid="answer-options"
    >
      {answers.map(({ answer, answerCorrect }, index) => (
        answerCorrect
          ? (
            <button
              key="correct"
              type="button"
              data-testid="correct-answer"
              className={ correctAnswer }
              onClick={ () => borderAnswer(answerCorrect) }
              disabled={ timesUp }
            >
              {answer}
            </button>
          )
          : (
            <button
              key={ index }
              type="button"
              data-testid={ `wrong-answer-${index}` }
              className={ incorrectAnswer }
              onClick={ () => borderAnswer(answerCorrect) }
              disabled={ timesUp }
            >
              {answer}
            </button>)
      ))}
    </div>
  );
};

Game.propTypes = {
  timesUp: PropTypes.bool.isRequired,
  stopCounting: PropTypes.func.isRequired,
  answers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Game;
