import React from 'react';
import { BrowserRouter, Router } from 'react-router-dom';

import history from './services/history';

import GlobalStyle from './styles/global';

import AppProvider from './hooks';

import Routes from './routes';

const App: React.FC = () => (
  <BrowserRouter>
    <Router history={history}>
      <GlobalStyle />
      <AppProvider>
        <Routes />
      </AppProvider>
    </Router>
  </BrowserRouter>
);

export default App;
