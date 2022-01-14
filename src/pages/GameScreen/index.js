import React, { Component } from 'react';
import Header from '../../components/Header';
import fetchTriviaApi from '../../services/triviaApi';

export class GameScreen extends Component {
  constructor() {
    super();

    this.state = {
      results: [],
      question: 0,
    };

    this.startGame = this.startGame.bind(this);
    this.questionSequence = this.questionSequence.bind(this);
    this.answerRender = this.answerRender.bind(this);
  }

  componentDidMount() {
    this.startGame();
  }

  questionSequence() {
    this.setState((state) => ({
      ...state,
      question: state.question + 1,
    }));
  }

  async startGame() {
    const token = localStorage.getItem('token');
    const { results } = await fetchTriviaApi(token);
    return this.setState({ results });
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
    const { results, question } = this.state;
    const response = results[question];
    // console.log(results);
    // console.log(response?.category);
    if (!response) {
      return <h1>Loading</h1>;
    }
    return (
      <div>
        <Header />
        <div>
          <p>
            Pergunta
            {' '}
            {question}
          </p>
          <div>
            {/* {console.log(results)} */}
            {/* {console.log(response)} */}
            {/* {console.log(response.category)} */}
            <h2 data-testid="question-category">{response.category}</h2>
            <h3 data-testid="question-text">{response.question}</h3>
            <div>
              {this.answerRender(response)}
            </div>
            <button
              type="button"
              onClick={ () => this.questionSequence() }
            >
              Próximo
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default GameScreen;
