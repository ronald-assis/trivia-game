import React from 'react';
import { useToast } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const FeedbackToast = ({ name, score, picture }) => {
  const toast = useToast();
  const currRanking = JSON.parse(localStorage.getItem('ranking'));
  const currPlayer = { name, score, picture };
  if (currRanking) {
    currRanking.push(currPlayer);
    const rankingSorted = currRanking.sort(
      ({ score: score1 }, { score: score2 }) => (score2 - score1),
    );
    localStorage.setItem('ranking', JSON.stringify(currRanking));
    const positionPlayer = rankingSorted.findIndex((player) => (
      player.name === currPlayer.name && player.score === currPlayer.score
    ));
    toast({
      title: 'Parabéns!',
      description: `Você ficou em ${positionPlayer + 1}º lugar!`,
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  } else {
    localStorage.setItem('ranking', JSON.stringify([currPlayer]));
  }

  return (
    <div />
  );
};

FeedbackToast.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  picture: PropTypes.string.isRequired,
};

export default FeedbackToast;
