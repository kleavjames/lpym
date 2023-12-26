import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import theme from "./theme.ts";
import { HashRouter } from "react-router-dom";
import AuthProvider from "./store/AuthProvider.tsx";
import ResultsProvider from "./store/ResultsProvider.tsx";
import TallySchoolProvider from "./store/TallySchoolProvider.tsx";
import FirebaseProvider from "./store/FirebaseProvider.tsx";

import "@fontsource/inter";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter basename="/">
      <FirebaseProvider>
        <AuthProvider>
          <ResultsProvider>
            <TallySchoolProvider>
              <CssVarsProvider theme={theme} disableTransitionOnChange>
                <CssBaseline />
                <App />
              </CssVarsProvider>
            </TallySchoolProvider>
          </ResultsProvider>
        </AuthProvider>
      </FirebaseProvider>
    </HashRouter>
  </React.StrictMode>
);
