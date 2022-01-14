import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { registerToken, saveInfoUser } from '../../Redux/actions';

export class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
    };
    this.testFields = this.testFields.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  async onClick() {
    const { userValues, userToken } = this.props;
    userValues(this.state);
    // history.push('/configuracao');
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
        <Link to="./triviagame">
          <button
            type="submit"
            disabled={ this.testFields() }
            data-testid="btn-play"
            onClick={ this.onClick }
          >
            Jogar
          </button>
        </Link>
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  userValues:
    (user) => dispatch(saveInfoUser(user)),
  userToken: () => dispatch(registerToken()),
});

Login.propTypes = {
  userValues: PropTypes.func.isRequired,
  userToken: PropTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(Login);
