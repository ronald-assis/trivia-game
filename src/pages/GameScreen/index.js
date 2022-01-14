import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import fetchTriviaApi from '../../services/triviaApi';
import Loading from '../../components/Loading';
import { registerToken } from '../../Redux/actions';

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
      });
    }
  }

  answerRender(response) {
    const { correct, incorrect } = this.state;
    const answers = response.incorrect_answers.concat(response.correct_answer);
    const MINUSONE = -1;
    answers.sort(() => (
      Math.floor(Math.random() * (1 - MINUSONE + 1) + MINUSONE)
    ));
    return (
      <div
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
                onClick={ this.borderAnswer }
              >
                {answer}
              </button>)
            : (
              <button
                key="correct"
                type="button"
                data-testid="correct-answer"
                className={ correct }
                onClick={ this.borderAnswer }
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

  borderAnswer() {
    this.setState({
      correct: 'green-border',
      incorrect: 'red-border',
    });
  }

  render() {
    const { results, question, loading } = this.state;
    const response = results[question];

    return (
      <div>
        <Header />
        <div>
          <p>
            Pergunta
            {' '}
            {question + 1}
          </p>
          <div>
            {/* {console.log(results)} */}
            {/* {console.log(response)} */}
            {/* {console.log(response.category)} */}
            <h2 data-testid="question-category">{response?.category}</h2>
            <h3 data-testid="question-text">{response?.question}</h3>
            <div>
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
