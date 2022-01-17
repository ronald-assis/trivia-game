import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import fetchTriviaApi from '../../services/triviaApi';
import Loading from '../../components/Loading';
import { registerToken } from '../../Redux/actions';
import Game from '../../components/Game';

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
      unorderedAnswers: [],
      timesUp: false,
      counter: 30,
    };

    this.questionSequence = this.questionSequence.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.borderAnswer = this.borderAnswer.bind(this);
    this.startCounting = this.startCounting.bind(this);
    this.stopCounting = this.stopCounting.bind(this);
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

  stopCounting() {
    clearInterval(this.idInterval);
  }

  questionSequence() {
    this.startCounting();
    this.setState((state) => ({
      ...state,
      question: state.question + 1,
      correct: '',
      incorrect: '',
      counter: 30,
    }));
  }

  borderAnswer() {
    this.setState({
      correct: 'green-border',
      incorrect: 'red-border',
    });
  }

  render() {
    const {
      results,
      question,
      loading,
      unorderedAnswers,
      timesUp,
      counter,
    } = this.state;
    const response = results[question];

    return (
      <div>
        <Header />
        <div>
          <p>{ counter }</p>
          <p>
            Pergunta
            {' '}
            {question + 1}
          </p>
          <div>
            <h2 data-testid="question-category">{response?.category}</h2>
            <h3 data-testid="question-text">{response?.question}</h3>
            <div>
              { unorderedAnswers.length > 1
               && <Game
                 stopCounting={ this.stopCounting }
                 timesUp={ timesUp }
                 answers={ unorderedAnswers[question] }
               /> }
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
};

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  userToken: () => dispatch(registerToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
