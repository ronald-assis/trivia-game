import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../../components/Header';
import fetchTriviaApi from '../../services/triviaApi';
import Loading from '../../components/Loading';
import { registerToken, saveScore, saveHit } from '../../Redux/actions';
import './GameScreen.css';
import Game from '../../components/Game';

export class GameScreen extends Component {
  constructor() {
    super();

    this.state = {
      results: [],
      question: 0,
      token: '',
      loading: false,
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
      this.setState({ redirect: true });
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

    return (
      <div className="game-screen">
        {redirect && <Redirect to="/feedBack" /> }
        <Header />
        <div className="main">
          <p>{ counter }</p>
          <p>
            Pergunta:
            {question + 1}
          </p>
          <div className="main-game">
            <h2 data-testid="question-category">{response?.category}</h2>
            <div className="question-and-options">
              <h3 data-testid="question-text">{response?.question}</h3>
              { unorderedAnswers.length > 1
               && <Game
                 stopCounting={ this.stopCounting }
                 timesUp={ timesUp }
                 answers={ unorderedAnswers[question] }
               /> }
            </div>
            { answered && (
              <button
                type="button"
                onClick={ () => this.questionSequence() }
                data-testid="btn-next"
              >
                Próximo
              </button>)}
          </div>
        </div>
        {loading && <Loading />}
      </div>
    );
  }
}

GameScreen.propTypes = {
  userToken: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  saveScoreDispatch: PropTypes.func.isRequired,
  saveHitDispatch: PropTypes.func.isRequired,
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
