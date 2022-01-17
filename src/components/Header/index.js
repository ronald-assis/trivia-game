import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import './Header.css';

export class Header extends Component {
  savePlayerScoreInLocalStorage(name, gravatarEmail) {
    const player = { player: {
      name,
      score: 0,
      picture: gravatarEmail,
    } };
    localStorage.setItem('state', JSON.stringify(player));
  }

  render() {
    const { nameUserState, emailUserState, score } = this.props;
    const gravatarHash = md5(emailUserState).toString();
    const gravatarEmail = `https://www.gravatar.com/avatar/${gravatarHash}`;
    this.savePlayerScoreInLocalStorage(nameUserState, gravatarEmail);
    console.log(score);

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

Header.propTypes = {
  nameUserState: PropTypes.string.isRequired,
  emailUserState: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  nameUserState: state.nameUser.name,
  emailUserState: state.user.email,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
