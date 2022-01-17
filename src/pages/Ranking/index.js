import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    return (
      <div>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Voltar a tela de inicio

          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
