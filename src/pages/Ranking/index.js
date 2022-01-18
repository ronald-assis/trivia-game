import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    const allPersonsOnRanking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div data-testid="ranking-title">
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Voltar a tela de inicio
          </button>
        </Link>
        <ol>
          {
            allPersonsOnRanking.sort(
              ({ score: score1 }, { score: score2 }) => (score2 - score1),
            )
              .map((person, index) => (
                <div key={ index }>
                  <img src={ person.picture } alt="player" />
                  <p data-testid={ `player-name-${index}` }>{person.name}</p>
                  <p data-testid={ `player-score-${index}` }>{person.score}</p>
                </div>
              ))
          }
        </ol>
      </div>
    );
  }
}

export default Ranking;
