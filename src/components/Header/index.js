import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class HeaderUsuário extends Component {
  constructor() {
    super();

    this.state = {
      score: 0,
    };
  }

  render() {
    const { score } = this.state;
    const { nameUserState, gravatarImage } = this.props;
    return (
      <div>
        <img
          src={ gravatarImage }
          alt="userImage"
          data-testid="header-profile-picture"
        />

        <h1
          data-testid="header-player-name"
        >
          { nameUserState }
        </h1>
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
  nameUserState: state.user.name,
  gravatarImage: state.nameUser.gravatarEmail,
});

HeaderUsuário.propTypes = {
  nameUserState: PropTypes.string.isRequired,
  gravatarImage: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(HeaderUsuário);
