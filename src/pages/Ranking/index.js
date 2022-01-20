import React, { Component } from 'react';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  SkeletonCircle,
  SkeletonText,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import CardRanking from '../../components/CardRanking';

class Ranking extends Component {
  render() {
    const allPersonsOnRanking = JSON.parse(localStorage.getItem('ranking'));
    const rankingSorted = allPersonsOnRanking.sort(
      ({ score: score1 }, { score: score2 }) => (score2 - score1),
    );
    const fiveFirstPlaces = [
      rankingSorted[0],
      rankingSorted[1],
      rankingSorted[2],
      rankingSorted[3],
      rankingSorted[4],
    ];
    return (
      <div data-testid="ranking-title">
        <Heading
          marginBottom="4"
          paddingTop="4"
          textAlign="center"
        >
          Ranking
        </Heading>
        <Flex flexDir="column">
          <Flex justifyContent="center">
            <Box textAlign="center">
              <Text fontSize="22px">1º lugar</Text>
              <Avatar size="xl" src={ fiveFirstPlaces[0].picture } />
              <Text fontSize="28px">{ fiveFirstPlaces[0].name }</Text>
              <Text>{ `${fiveFirstPlaces[0].score} Pontos` }</Text>
            </Box>
          </Flex>
          <Flex marginTop="4" justifyContent="space-evenly">
            <Box width="30%" textAlign="center">
              {
                fiveFirstPlaces[1] ? (
                  <>
                    <Text fontSize="18px">2º lugar</Text>
                    <Avatar size="lg" src={ fiveFirstPlaces[1].picture } />
                    <Text
                      overflow="hidden"
                      textOverflow="clip"
                      whiteSpace="nowrap"
                      fontSize="18px"
                    >
                      { fiveFirstPlaces[1].name }
                    </Text>
                    <Text>{ `${fiveFirstPlaces[1].score} Pontos` }</Text>
                  </>
                ) : (
                  <>
                    <Text fontSize="18px">2º lugar</Text>
                    <Flex flexDir="column" justifyContent="center" alignItems="center">
                      <SkeletonCircle size="65" />
                      <SkeletonText
                        spacing="4"
                        noOfLines={ 2 }
                        m="2"
                      >
                        Uma pessoa
                      </SkeletonText>
                    </Flex>
                  </>
                )
              }
            </Box>
            <Box width="30%" textAlign="center">
              {
                fiveFirstPlaces[2] ? (
                  <>
                    <Text fontSize="18px">3º lugar</Text>
                    <Avatar size="lg" src={ fiveFirstPlaces[2].picture } />
                    <Text
                      overflow="hidden"
                      textOverflow="clip"
                      whiteSpace="nowrap"
                      fontSize="18px"
                    >
                      { fiveFirstPlaces[2].name }
                    </Text>
                    <Text>{ `${fiveFirstPlaces[2].score} Pontos` }</Text>
                  </>
                ) : (
                  <>
                    <Text fontSize="18px">3º lugar</Text>
                    <Flex flexDir="column" justifyContent="center" alignItems="center">
                      <SkeletonCircle size="65" />
                      <SkeletonText
                        spacing="4"
                        noOfLines={ 2 }
                        m="2"
                      >
                        Uma pessoa
                      </SkeletonText>
                    </Flex>
                  </>
                )
              }
            </Box>
          </Flex>
          <Flex flexDir="column" marginTop="4">
            <CardRanking
              name={ fiveFirstPlaces[3] ? fiveFirstPlaces[3].name : undefined }
              score={ fiveFirstPlaces[3] ? fiveFirstPlaces[3].score : undefined }
              picture={ fiveFirstPlaces[3] ? fiveFirstPlaces[3].picture : undefined }
              place="4"
            />
            <CardRanking
              name={ fiveFirstPlaces[4] ? fiveFirstPlaces[4].name : undefined }
              score={ fiveFirstPlaces[4] ? fiveFirstPlaces[4].score : undefined }
              picture={ fiveFirstPlaces[4] ? fiveFirstPlaces[4].picture : undefined }
              place="5"
            />
          </Flex>
        </Flex>
        <Flex marginTop="8" justifyContent="center">
          <Link to="/">
            <Button
              type="button"
              data-testid="btn-go-home"
              colorScheme="teal"
            >
              Voltar a tela de inicio
            </Button>
          </Link>
        </Flex>
      </div>
    );
  }
}

export default Ranking;
