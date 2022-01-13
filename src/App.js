import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/Login';
import SettingsPage from './pages/Settings';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ LoginPage } />
          <Route exact path="/configuracao" component={ SettingsPage } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
