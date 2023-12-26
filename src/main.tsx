import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import theme from "./theme.ts";
import { HashRouter } from "react-router-dom";
import AuthProvider from "./hoc/AuthProvider.tsx";

import "@fontsource/inter";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter basename="/">
      <AuthProvider>
        <CssVarsProvider theme={theme} disableTransitionOnChange>
          <CssBaseline />
          <App />
        </CssVarsProvider>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
);
