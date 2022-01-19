import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import GameScreen from './pages/GameScreen';
import LoginPage from './pages/Login';
import Feedback from './pages/Feedback';
import SettingsPage from './pages/Settings';
import Ranking from './pages/Ranking';
import store from './Redux/store';

export default function App() {
  return (
    <div className="App">
      <Provider store={ store }>
        <BrowserRouter>
          <ChakraProvider>
            <Switch>
              <Route exact path="/" component={ LoginPage } />
              <Route exact path="/configuracao" component={ SettingsPage } />
              <Route exact path="/triviagame" component={ GameScreen } />
              <Route exact path="/feedback" component={ Feedback } />
              <Route exact path="/ranking" component={ Ranking } />
            </Switch>
          </ChakraProvider>
        </BrowserRouter>
      </Provider>
    </div>
  );
}
