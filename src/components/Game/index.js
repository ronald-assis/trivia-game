import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Flex } from '@chakra-ui/react';

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
    <Flex
      data-testid="answer-options"
      flexDir="column"
    >
      {answers && answers.map(({ answer, answerCorrect }, index) => (
        answerCorrect
          ? (
            <Button
              key="correct"
              type="button"
              data-testid="correct-answer"
              className={ correctAnswer }
              onClick={ () => borderAnswer(answerCorrect) }
              disabled={ timesUp }
              backgroundColor={ correctAnswer ? 'green' : 'white' }
              colorScheme="green"
              color="black"
              marginTop="2"
              marginBottom="2"
              width="full"
            >
              {answer}
            </Button>
          )
          : (
            <Button
              key={ index }
              type="button"
              data-testid={ `wrong-answer-${index}` }
              className={ incorrectAnswer }
              onClick={ () => borderAnswer(answerCorrect) }
              disabled={ timesUp }
              color="black"
              backgroundColor={ incorrectAnswer ? 'red' : 'white' }
              colorScheme="red"
              marginTop="2"
              marginBottom="2"
              width="full"
            >
              {answer}
            </Button>
          )
      ))}
    </Flex>
  );
};

Game.propTypes = {
  timesUp: PropTypes.bool.isRequired,
  stopCounting: PropTypes.func.isRequired,
  answers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Game;
