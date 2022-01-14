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
    };

    this.startGame = this.startGame.bind(this);
    this.questionSequence = this.questionSequence.bind(this);
    this.answerRender = this.answerRender.bind(this);
  }

  componentDidMount() {
    this.startGame();
  }

  // componentDidUpdate() {
  //   const { token } = this.props;
  //   this.setState((state) => ({
  //     ...state,
  //     token,
  //   }));
  // }

  questionSequence() {
    this.setState((state) => ({
      ...state,
      question: state.question + 1,
    }));
  }

  async startGame() {
    // const otherToken = localStorage.getItem('token');
    const { userToken, token } = this.props;
    const { results, response_code: reponseCode } = await fetchTriviaApi(token);
    // console.log(otherToken);
    // console.log(token);
    const CODE = 3;
    if (reponseCode === CODE) {
      userToken();
    }
    return this.setState({
      results,
      loading: false,
    });
  }

  answerRender(response) {
    // const { results, question } = this.state;
    // const response = results[question];
    const answers = response.incorrect_answers.concat(response.correct_answer);
    return (
      // console.log(answers)
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

  render() {
    const { results, question, loading } = this.state;
    const response = results[question];
    // console.log(results);
    // console.log(response?.category);
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
