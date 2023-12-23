import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { CssVarsProvider } from '@mui/joy/styles';
import theme from './theme.ts';
import { HashRouter } from 'react-router-dom';

import '@fontsource/inter';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter basename='/'>
      <CssVarsProvider theme={theme}>
        <App />
      </CssVarsProvider>
    </HashRouter>
  </React.StrictMode>,
)
