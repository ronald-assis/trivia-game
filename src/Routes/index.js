import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Feedback from '../pages/Feedback';
import GameScreen from '../pages/GameScreen';
import LoginPage from '../pages/Login';
import Ranking from '../pages/Ranking';
import SettingsPage from '../pages/Settings';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ LoginPage } />
        <Route exact path="/configuracao" component={ SettingsPage } />
        <Route exact path="/triviagame" component={ GameScreen } />
        <Route exact path="/feedback" component={ Feedback } />
        <Route exact path="/ranking" component={ Ranking } />
      </Switch>
    );
  }
}

export default Routes;
