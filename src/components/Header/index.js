import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import './Header.css';
import { saveLocalStorage } from '../../Redux/actions';

export class Header extends Component {
  constructor(props) {
    super(props);

    this.saveInfosOnState = this.saveInfosOnState.bind(this);

    this.state = {
      pictureSrc: '',
      name: '',
    };
  }

  componentDidMount() {
    this.saveInfosOnState();
  }

  saveInfosOnState() {
    const { nameUserState, emailUserState, saveNameAndPicture } = this.props;
    const gravatarHash = md5(emailUserState).toString();
    const gravatarSrc = `https://www.gravatar.com/avatar/${gravatarHash}`;
    saveNameAndPicture({ name: nameUserState, picture: gravatarSrc });
    this.setState({
      pictureSrc: gravatarSrc,
      name: nameUserState,
    });
  }

  render() {
    const { pictureSrc, name } = this.state;
    const { score } = this.props;

    return (
      <div className="header">
        <div className="logo-and-user">
          <img
            src={ pictureSrc }
            alt="userImage"
            data-testid="header-profile-picture"
          />

          <h1
            data-testid="header-player-name"
          >
            { name }
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
  saveNameAndPicture: PropTypes.func.isRequired,
};

const mapDispatchToProps = (distpatch) => ({
  saveNameAndPicture: (user) => distpatch(saveLocalStorage(user)),
});

const mapStateToProps = (state) => ({
  nameUserState: state.nameUser.name,
  emailUserState: state.user.email,
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
