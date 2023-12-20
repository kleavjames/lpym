import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@emotion/react';
import theme from './theme.ts';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.ts';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter basename='/'>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </HashRouter>
    </Provider>
  </React.StrictMode>,
)
