import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { registerToken, saveInfoUser } from '../../Redux/actions';

export class Login extends Component {
  constructor() {
    super();

    this.testFields = this.testFields.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.onClick = this.onClick.bind(this);

    this.state = {
      email: '',
      name: '',
    };
  }

  onClick() {
    const { userValues, userToken } = this.props;
    const { email, name } = this.state;
    const gravatarHash = md5(email.toString());
    const gravatarEmail = `https://www.gravatar.com/avatar/${gravatarHash}`;
    userValues(name, gravatarEmail);
    userToken();
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
          onClick={ this.onClick }
        >
          Jogar
        </button>
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  userValues:
    (user, gravatarEmail) => dispatch(saveInfoUser(user, gravatarEmail)),
  userToken: () => dispatch(registerToken()),
});

Login.propTypes = {
  userValues: PropTypes.func.isRequired,
  userToken: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
