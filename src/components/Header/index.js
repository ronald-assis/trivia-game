import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import './Header.css';

export class HeaderUsuário extends Component {
  constructor() {
    super();

    this.state = {
      score: 0,
    };
  }

  render() {
    const { score } = this.state;
    const { nameUserState, emailUserState } = this.props;
    const gravatarHash = md5(emailUserState).toString();
    const gravatarEmail = `https://www.gravatar.com/avatar/${gravatarHash}`;
    return (
      <div className="header">
        <div className="logo-and-user">
          <img
            src={ gravatarEmail }
            alt="userImage"
            data-testid="header-profile-picture"
          />
          <h1
            data-testid="header-player-name"
          >
            { nameUserState }
          </h1>
        </div>
        <h1
          data-testid="header-score"
        >
          { score }
        </h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  nameUserState: state.nameUser.name,
  emailUserState: state.user.email,
});

HeaderUsuário.propTypes = {
  nameUserState: PropTypes.string.isRequired,
  emailUserState: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(HeaderUsuário);
