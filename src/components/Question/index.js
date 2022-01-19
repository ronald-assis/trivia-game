import { Box, Flex, Heading, SkeletonText, Text } from '@chakra-ui/react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import timer from '../../assets/img/timer-with-pointers.png';

class Question extends Component {
  render() {
    const {
      response,
      question,
      backgroundQuestion,
      counter,
      loading,
    } = this.props;

    return (
      <Box
        height="20vh"
        backgroundImage={ backgroundQuestion }
        backgroundSize="cover"
        backgroundPosition="center"
        padding="8"
        width="100%"
        position="relative"
      >
        <Text
          position="absolute"
          top="0"
          left="36"
        >
          {`Pergunta: ${question + 1}`}
        </Text>
        <Heading
          data-testid="question-category"
          fontSize="xl"
          textAlign="center"
        >
          { response?.category }
        </Heading>
        { loading
          ? <SkeletonText noOfLines={ 3 } spacing="2" />
          : (
            <Text
              data-testid="question-text"
              textAlign="center"
            >
              { response?.question }
            </Text>
          )}
        <Flex
          position="absolute"
          top="80%"
          left="76%"
          backgroundImage={ timer }
          backgroundSize="100% 100%"
          justifyContent="center"
          alignItems="center"
          padding="12px 20px"
        >
          <Text
            fontSize="24px"
            textAlign="center"
            paddingTop="12px"
            fontWeight="bold"
          >
            { counter }
          </Text>
        </Flex>
      </Box>
    );
  }
}

Question.propTypes = {
  question: PropTypes.number.isRequired,
  backgroundQuestion: PropTypes.string.isRequired,
  counter: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  response: PropTypes.shape({
    question: PropTypes.string,
    category: PropTypes.string,
  }),
};

Question.defaultProps = {
  response: {},
};

export default Question;
