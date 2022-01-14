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

  render() {
    const { results, question } = this.state;
    const response = results[question];
    return (
      <div>
        <Header />
        <div>
          <span>
            Pergunta
            {' '}
            { question }
          </span>
          {console.log(results)}
          {console.log(response)}
          {/* {console.log(response.category)} */}
          <button
            type="button"
            onClick={ () => this.questionSequence() }
          >
            Próximo
          </button>
        </div>
      </div>
    );
  }
}

export default GameScreen;
