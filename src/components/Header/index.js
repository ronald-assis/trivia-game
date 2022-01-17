import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { saveLocalStorage } from '../../Redux/actions';
import './Header.css';

export class Header extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     score: 0,
  //   };
  // }

  savePlayerScoreInLocalStorage(name, gravatarEmail) {
    const player = { player: {
      name,
      score: 0,
      picture: gravatarEmail,
    } };
    localStorage.setItem('state', JSON.stringify(player));
  }

  render() {
    // const { score } = this.state;
    const { nameUserState, emailUserState, saveScore } = this.props;
    const gravatarHash = md5(emailUserState).toString();
    const gravatarEmail = `https://www.gravatar.com/avatar/${gravatarHash}`;
    this.savePlayerScoreInLocalStorage(nameUserState, gravatarEmail);
    const { player } = JSON.parse(localStorage.getItem('state'));
    const { score } = player;
    console.log(player);
    saveScore(player);

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
  saveScore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  nameUserState: state.nameUser.name,
  emailUserState: state.user.email,
  score: state.saveLocalStorage.score,
});

const mapDispatchToProps = (dispatch) => ({
  saveScore: (state) => dispatch(saveLocalStorage(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
