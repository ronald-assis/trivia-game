import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Box, Input, Text, Button, Flex } from '@chakra-ui/react';
import { FaPlay } from 'react-icons/fa';
import { MdBuild } from 'react-icons/md';
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
    const { userValues, userToken, history } = this.props;
    userValues(this.state);
    userToken();
    history.push('/triviagame');
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
    const { history } = this.props;

    return (
      <Box>
        <Box margin="2">
          <Text color="yellow">Nome:</Text>
          <Input
            type="text"
            name="name"
            id="name"
            data-testid="input-player-name"
            value={ name }
            onChange={ this.handleInput }
            backgroundColor="white"
            borderColor="yellow"
          />
        </Box>
        <Box margin="2">
          <Text color="yellow">Email:</Text>
          <Input
            type="email"
            name="email"
            id="email"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.handleInput }
            backgroundColor="white"
            borderColor="yellow"
          />
        </Box>
        <Flex flexDir="column" marginTop="4">
          <Button
            type="submit"
            disabled={ this.testFields() }
            data-testid="btn-play"
            onClick={ this.onClick }
            rightIcon={ <FaPlay /> }
            colorScheme="blue"
            margin="2"
          >
            Jogar
          </Button>
          <Button
            data-testid="btn-settings"
            type="button"
            onClick={ () => history.push('/configuracao') }
            rightIcon={ <MdBuild /> }
            colorScheme="pink"
            margin="2"
          >
            Configurações
          </Button>
        </Flex>
      </Box>
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
  history: PropTypes.shape(Object).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
