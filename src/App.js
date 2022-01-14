import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/Login';
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
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}
