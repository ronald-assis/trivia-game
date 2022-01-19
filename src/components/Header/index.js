import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { Avatar, Badge, Flex, Heading } from '@chakra-ui/react';
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
      <Flex
        flexDir="column"
        alignSelf="start"
        className="header"
        width="100%"
      >
        <Flex
          className="logo-and-user"
          alignItems="center"
          alignSelf="flex-start"
        >
          <Avatar
            src={ pictureSrc }
            alt="userImage"
            data-testid="header-profile-picture"
            size="lg"
            marginRight="2"
          />
          <Heading
            data-testid="header-player-name"
            as="h2"
            fontSize="18px"
          >
            { name }
          </Heading>
        </Flex>
        <Badge
          data-testid="header-score"
          alignSelf="flex-end"
          colorScheme="green"
          variant="solid"
          fontSize="18px"
          borderRadius="full"
          padding="2px 24px"
        >
          { score }
        </Badge>
      </Flex>
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
