import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import store from './Redux/store';
import Routes from './Routes';

export default function App() {
  return (
    <div className="App">
      <Provider store={ store }>
        <BrowserRouter>
          <ChakraProvider>
            <Routes />
          </ChakraProvider>
        </BrowserRouter>
      </Provider>
    </div>
  );
}
