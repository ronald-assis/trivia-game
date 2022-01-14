import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import fetchTriviaApi from '../../services/triviaApi';
import Loading from '../../components/Loading';
import { registerToken } from '../../Redux/actions';
import './GameScreen.css';

export class GameScreen extends Component {
  constructor() {
    super();

    this.state = {
      results: [],
      question: 0,
      token: '',
      loading: true,
    };

    this.questionSequence = this.questionSequence.bind(this);
    this.answerRender = this.answerRender.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
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
      });
    }
  }

  answerRender(response) {
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
              >
                {answer}
              </button>)
            : (
              <button
                key="correct"
                type="button"
                data-testid="correct-answer"
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
    }));
  }

  render() {
    const { results, question, loading } = this.state;
    const response = results[question];

    return (
      <div className="game-screen">
        <Header />
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
};
const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  userToken: () => dispatch(registerToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
