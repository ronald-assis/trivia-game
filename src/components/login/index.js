import React, { Component } from 'react';

export class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
    };
    this.testFields = this.testFields.bind(this);
    this.handleInput = this.handleInput.bind(this);
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
        >
          Jogar
        </button>
      </>
    );
  }
}

export default Login;
