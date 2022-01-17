import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import GameScreen from './pages/GameScreen';
import LoginPage from './pages/Login';
import Feedback from './pages/Feedback';
import SettingsPage from './pages/Settings';
import store from './Redux/store';

export default function App() {
  return (
    <div className="App">
      <Provider store={ store }>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ LoginPage } />
            <Route exact path="/configuracao" component={ SettingsPage } />
            <Route exact path="/triviagame" component={ GameScreen } />
            <Route exact path="/feedback" component={ Feedback } />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}
