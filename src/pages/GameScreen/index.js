import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import fetchTriviaApi from '../../services/triviaApi';
import Loading from '../../components/Loading';
import { registerToken, saveLocalStorage } from '../../Redux/actions';
// import Timer from '../../components/Timer';
import './GameScreen.css';

export class GameScreen extends Component {
  constructor() {
    super();

    this.state = {
      results: [],
      question: 0,
      token: '',
      loading: true,
      correct: '',
      incorrect: '',
    };

    this.questionSequence = this.questionSequence.bind(this);
    this.answerRender = this.answerRender.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.borderAnswer = this.borderAnswer.bind(this);
  }

  componentDidUpdate() {
    const { token } = this.props;
    if (token) this.getQuestions(token);
  }

  async getQuestions() {
    const { token: tokenApi, userToken } = this.props;
    const { token } = this.state;
    const { results, response_code: responseCode } = await fetchTriviaApi(tokenApi);
    const INCORRECT_CODE = 3;
    if (responseCode === INCORRECT_CODE) {
      userToken();
    } else {
      if (token === tokenApi) return;
      this.setState({
        results,
        loading: false,
        token: tokenApi,
        disabled: false,
      });
    }
  }

  setNewScoreInLocalStorage = (points) => {
    const objString = localStorage.getItem('state');
    const { player } = JSON.parse(objString) || {};
    const playerScore = { player: {
      name: player.name,
      score: player.score + points,
      picture: player.picture,
    } };
    localStorage.setItem('state', JSON.stringify(playerScore));
  }

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
  }

  setStore = ({ correct_answer: correctAnswer, difficulty }, answer) => {
    const { timer } = this.props;
    const store = 10;
    let points = 0;
    const difficult = this.convertDifficultyToPoint(difficulty);
    if ((correctAnswer === answer) && answer) {
      points = store + (timer * difficult);
    }
    this.setNewScoreInLocalStorage(points);
    return points;
  }

  answerRender(response) {
    const {
      state: { correct, incorrect, disabled },
    } = this;
    const answers = response.incorrect_answers.concat(response.correct_answer);
    const MINUSONE = -1;
    answers.sort(() => (
      Math.floor(Math.random() * (1 - MINUSONE + 1) + MINUSONE)
    ));

    return (
      <div
        className="answer-options"
        data-testid="answer-options"
      >
        {answers.map((answer, index) => (
          answer !== response.correct_answer
            ? (
              <button
                key={ index }
                type="button"
                data-testid={ `wrong-answer-${index}` }
                className={ incorrect }
                disabled={ disabled }
                onClick={ () => (
                  this.borderAnswer(response, answer)
                ) }
              >
                {answer}
              </button>)
            : (
              <button
                key="correct"
                type="button"
                data-testid="correct-answer"
                className={ correct }
                disabled={ disabled }
                onClick={ () => (
                  this.borderAnswer(response, answer)
                ) }
              >
                {answer}
              </button>
            )
        ))}
      </div>
    );
  }

  questionSequence() {
    this.setState((state) => ({
      ...state,
      question: state.question + 1,
      correct: '',
      incorrect: '',
    }));
  }

  borderAnswer(response, answer) {
    this.setStore(response, answer);
    this.setState({
      correct: 'green-border',
      incorrect: 'red-border',
    });
  }

  render() {
    const { results, question, loading } = this.state;

    const response = results[question];

    return (
      <div className="game-screen">
        <Header />
        {/* <Timer /> */}
        <div className="main">
          <p>
            Pergunta
            {' '}
            {question + 1}
          </p>
          <div className="main-game">
            {/* {console.log(results)} */}
            {/* {console.log(response)} */}
            {/* {console.log(response.category)} */}
            <h2 data-testid="question-category">{response?.category}</h2>
            <div className="question-an-options">
              <h3 data-testid="question-text">{response?.question}</h3>
              {response && this.answerRender(response)}
            </div>
            <button
              type="button"
              onClick={ () => this.questionSequence() }
            >
              Próximo
            </button>
          </div>
        </div>
        { loading && <Loading />}
      </div>
    );
  }
}

GameScreen.propTypes = {
  userToken: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  timer: PropTypes.number.isRequired,
};
const mapStateToProps = (state) => ({
  token: state.token,
  timer: state.saveTime.timer,
  local: state.saveLocalStorage,
});

const mapDispatchToProps = (dispatch) => ({
  userToken: () => dispatch(registerToken()),
  saveScore: (score) => dispatch(saveLocalStorage(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
