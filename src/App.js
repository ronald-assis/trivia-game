import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import HeaderUsuário from './components/Header';
import LoginPage from './pages/Login';
import store from './Redux/store';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={ store }>
          <LoginPage />
          <HeaderUsuário />
        </Provider>
      </BrowserRouter>
    </div>
  );
}
