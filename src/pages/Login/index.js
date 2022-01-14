import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Login from '../../components/login';

export class LoginPage extends Component {
  render() {
    const { history } = this.props;

    console.log(this.props);

    return (
      <div>
        <Login />
        <button
          data-testid="btn-settings"
          type="button"
          onClick={ () => history.push('/configuracao') }
        >
          Configurações
        </button>
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape(Object).isRequired,
};

export default LoginPage;
