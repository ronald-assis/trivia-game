import React, { Component } from 'react';
import { Avatar, Box, Flex, Skeleton, SkeletonCircle, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

class CardRanking extends Component {
  render() {
    const { name, picture, score, place } = this.props;

    return (
      <Flex
        alignContent="center"
        m="2"
        marginLeft="4"
        marginRight="4"
        p="4"
        border="1px solid black"
        borderRadius="6"
      >
        {
          name ? (
            <>
              <Avatar size="md" src={ picture } />
              <Box marginLeft="4">
                <Text>{`${place}º lugar`}</Text>
                <Text>
                  <span data-testid={ `player-name-${place - 1}` }>{name}</span>
                  <span> - </span>
                  <span data-testid={ `player-score-${place - 1}` }>{score}</span>
                  <span> pontos</span>
                </Text>
              </Box>
            </>
          ) : (
            <>
              <SkeletonCircle size="10" />
              <Box marginLeft="4">
                <Text>{`${place}º lugar`}</Text>
                <Skeleton>Uma pessoa - 000 pontos</Skeleton>
              </Box>
            </>
          )
        }
      </Flex>
    );
  }
}

CardRanking.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  picture: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
};

export default CardRanking;
