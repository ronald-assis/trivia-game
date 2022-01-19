import React, { Component } from 'react';
import { Container, Heading, Box, Text, Flex } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import Login from '../../components/login';
import './style.css';

export class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.rainbowColors = this.rainbowColors.bind(this);

    this.state = {
      rainbowColorsInHex: [
        '#9400D3',
        '#4B0082',
        '#0000FF',
        '#00FF00',
        '#FFFF00',
        '#FF7F00',
        '#FF0000',
      ],
      currIndexColors: 0,
    };
  }

  componentDidMount() {
    this.rainbowColors();
  }

  componentWillUnmount() {
    clearInterval(this.idInterval);
  }

  rainbowColors() {
    const ONE_SECOND_IN_MS = 1000;
    this.idInterval = setInterval(() => {
      const { currIndexColors } = this.state;
      this.setState({
        currIndexColors: currIndexColors + 1,
      });
    }, ONE_SECOND_IN_MS);
  }

  render() {
    const primaryRotate = -30;
    let firstRotate = primaryRotate;
    const { history } = this.props;
    const { rainbowColorsInHex } = this.state;
    return (
      <Container className="container-home" maxW="full" height="full">
        <Flex flexDir="column" justifyContent="space-around" height="full">
          <Box height="">
            <Heading position="relative" className="curved-text">
              {
                'PergunTrybe'.split('').map((word, index) => {
                  const incrementByRotation = 5.5;
                  firstRotate += incrementByRotation;
                  const currIndex = Math.floor(
                    Math.random() * (rainbowColorsInHex.length - 0) + 0,
                  );
                  return (
                    <Text
                      key={ index }
                      color={ rainbowColorsInHex[currIndex] }
                      className="letters"
                      sx={ { transform: `rotate(${firstRotate}deg)` } }
                    >
                      { word }
                    </Text>
                  );
                })
              }
            </Heading>
          </Box>
          <Login history={ history } />
          <Box as="footer" backgroundColor="orange.500" borderRadius="5px">
            <Text
              fontSize="sm"
              textAlign="center"
              color="white"
            >
              Desenvolvido por:
            </Text>
            <Text
              fontSize="sm"
              textAlign="center"
              color="white"
            >
              Gustavo (Wolfi) Meira
            </Text>
            <Text
              fontSize="sm"
              textAlign="center"
              color="white"
            >
              Laert Furquin
            </Text>
            <Text
              fontSize="sm"
              textAlign="center"
              color="white"
            >
              Rafael Nakashima
            </Text>
            <Text
              fontSize="sm"
              textAlign="center"
              color="white"
            >
              Ronald Assis
            </Text>
          </Box>
        </Flex>
      </Container>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape(Object).isRequired,
};

export default LoginPage;
