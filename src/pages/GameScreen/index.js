import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Box, Button, Container, Flex } from '@chakra-ui/react';
import Header from '../../components/Header';
import fetchTriviaApi from '../../services/triviaApi';
import { registerToken, saveScore, saveHit } from '../../Redux/actions';
import './GameScreen.css';
import Game from '../../components/Game';
import backgroundQuestion from '../../assets/img/empty-question.png';
import Question from '../../components/Question';

export class GameScreen extends Component {
  constructor() {
    super();

    this.state = {
      results: [],
      question: 0,
      token: '',
      loading: true,
      unorderedAnswers: [],
      timesUp: false,
      counter: 30,
      redirect: false,
      answered: false,
    };

    this.questionSequence = this.questionSequence.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.startCounting = this.startCounting.bind(this);
    this.stopCounting = this.stopCounting.bind(this);
    // this.renderButtonNext = this.renderButtonNext.bind(this);
  }

  componentDidMount() {
    const { token } = this.props;
    if (token) this.getQuestions();
  }

  componentDidUpdate() {
    const { token } = this.props;
    if (token) this.getQuestions();
  }

  async getQuestions() {
    const { token: tokenApi, userToken } = this.props;
    const { token } = this.state;
    if (token === tokenApi) return;
    const { results, response_code: responseCode } = await fetchTriviaApi(tokenApi);
    const INCORRECT_CODE = 3;
    if (responseCode === INCORRECT_CODE) {
      userToken();
    } else {
      const unorderedAnswers = results.map((result) => {
        const allAnswers = result.incorrect_answers.map((incorrect) => ({
          answer: incorrect,
          answerCorrect: false,
        }));
        allAnswers.push(({ answer: result.correct_answer, answerCorrect: true }));
        const HALF_ONE = 0.5;
        allAnswers.sort(() => HALF_ONE - Math.random());
        return allAnswers;
      });
      this.startCounting();
      this.setState({
        results,
        loading: false,
        token: tokenApi,
        unorderedAnswers,
      });
    }
  }

  totalHits = (points) => {
    const { saveHitDispatch } = this.props;
    let assert = 0;
    if (points > 0) assert = 1;
    saveHitDispatch(assert);
  };

  convertDifficultyToPoint = (difficult) => {
    const EASY = 1;
    const MEDIUM = 2;
    const HARD = 3;
    switch (difficult) {
    case 'easy':
      return EASY;
    case 'medium':
      return MEDIUM;
    case 'hard':
      return HARD;
    default:
      return 0;
    }
  };

  setStore = (answer = false) => {
    const { counter, results, question } = this.state;
    const { saveScoreDispatch } = this.props;
    const { difficulty } = results[question];
    const store = 10;
    let points = 0;
    const difficult = this.convertDifficultyToPoint(difficulty);
    if (answer) {
      points = store + (counter * difficult);
    }
    this.setState({
      answered: true,
    });
    this.totalHits(points);
    saveScoreDispatch(points);
    return points;
  };

  stopCounting(payload) {
    this.setStore(payload);
    clearInterval(this.idInterval);
  }

  startCounting() {
    const ONE_SECOND_IN_MS = 1000;
    this.idInterval = setInterval(() => {
      const { counter } = this.state;
      if (counter <= 0) {
        this.stopCounting();
        this.setState({
          timesUp: true,
        });
      } else {
        this.setState({
          counter: counter - 1,
        });
      }
    }, ONE_SECOND_IN_MS);
  }

  questionSequence() {
    const { history } = this.props;
    this.startCounting();
    this.setState((state) => ({
      ...state,
      question: state.question + 1,
      counter: 30,
      answered: false,
    }));
    const { question } = this.state;
    const maxQuestions = 4;
    if (question === maxQuestions) {
      history.push('/feedBack');
    }
  }

  render() {
    const {
      results,
      question,
      loading,
      unorderedAnswers,
      timesUp,
      counter,
      redirect,
      answered,
    } = this.state;
    const response = results[question];

    const backgroundColors = [
      '#8DABD6',
      '#7291BA',
      '#58779F',
      '#3E5F85',
      '#23476B',
    ];

    return (
      <Container
        height="100vh"
        backgroundColor={ backgroundColors[question] }
        maxWidth="full"
        className="game-screen"
      >
        {/* {loading && <Loading />} */}
        { redirect && <Redirect to="/feedBack" /> }
        <Flex
          height="100vh"
          flexDir="column"
          justifyContent="space-around"
          alignItems="center"
        >
          <Header />
          <Question
            backgroundQuestion={ backgroundQuestion }
            question={ question }
            response={ response }
            counter={ counter }
            loading={ loading }
          />
          <Box width="full">
            { unorderedAnswers.length > 1
               && <Game
                 stopCounting={ this.stopCounting }
                 timesUp={ timesUp }
                 answers={ unorderedAnswers[question] }
               /> }
          </Box>
          <Box width="full">
            { answered && (
              <Button
                type="button"
                onClick={ () => this.questionSequence() }
                data-testid="btn-next"
                width="full"
                colorScheme="teal"
              >
                Próximo
              </Button>)}
          </Box>
        </Flex>
      </Container>
    );
  }
}

GameScreen.propTypes = {
  userToken: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  saveScoreDispatch: PropTypes.func.isRequired,
  saveHitDispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token,
  local: state.saveLocalStorage,
});

const mapDispatchToProps = (dispatch) => ({
  userToken: () => dispatch(registerToken()),
  saveScoreDispatch: (score) => dispatch(saveScore(score)),
  saveHitDispatch: (assert) => dispatch(saveHit(assert)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
