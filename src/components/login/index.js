import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export class Login extends Component {
  constructor() {
    super();

    this.testFields = this.testFields.bind(this);
    this.handleInput = this.handleInput.bind(this);

    this.state = {
      email: '',
      name: '',
    };
  }

  testFields() {
    const { email, name } = this.state;

    if (
      email.includes('@')
            && email.includes('.com')
            && name.length > 1
    ) return false;
    return true;
  }

  handleInput(event) {
    const { target } = event;
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { name, email } = this.state;

    return (
      <>
        <input
          type="text"
          name="name"
          id="name"
          data-testid="input-player-name"
          value={ name }
          onChange={ this.handleInput }

        />

        <input
          type="email"
          name="email"
          id="email"
          data-testid="input-gravatar-email"
          value={ email }
          onChange={ this.handleInput }
        />

        <button
          type="submit"
          disabled={ this.testFields() }
          data-testid="btn-play"
          onClick={ () => {
            fetch('https://opentdb.com/api_token.php?command=request')
              .then((data) => data.json())
              .then(({ token }) => localStorage.setItem('token', token));
          } }
        >
          Jogar
        </button>
      </>
    );
  }
}

export default Login;
