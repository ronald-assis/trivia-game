import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Container, Flex, Heading, Image } from '@chakra-ui/react';
import FeedBackPoints from '../../components/FeedBackPoints';
import './feedback.css';
import { eraseData } from '../../Redux/actions';
import couldBeBetterImg from '../../assets/img/could-be-better.svg';
import wellDoneImg from '../../assets/img/well-done.svg';

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

  componentWillUnmount() {
    const { eraseDataOnState } = this.props;
    eraseDataOnState();
  }

  render() {
    const { assertions } = this.props;

    const MIN_NUMBER = 3;
    const feedbackImg = assertions >= MIN_NUMBER ? wellDoneImg : couldBeBetterImg;

    return (
      <Container height="100vh" backgroundColor="#003153">
        <Heading
          textAlign="center"
          paddingTop="8"
          marginBottom="8"
          color="white"
        >
          Feedback
        </Heading>
        <Image src={ feedbackImg } marginBottom="8" />
        <FeedBackPoints />
        <Flex marginTop="4" justifyContent="center">
          <Link to="/">
            <Button
              type="button"
              data-testid="btn-play-again"
              marginRight="4"
            >
              Play Again
            </Button>
          </Link>
          <Link to="/ranking">
            <Button
              type="button"
              data-testid="btn-ranking"
              colorScheme="cyan"
            >
              Ranking
            </Button>
          </Link>
        </Flex>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  eraseDataOnState: () => dispatch(eraseData()),
});

const mapStateToProps = (state) => ({
  name: state.player.name,
  picture: state.player.picture,
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  eraseDataOnState: PropTypes.func.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
