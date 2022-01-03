import React from 'react';
import ReactDOM from 'react-dom';
import Admin from './Admin';
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./styles.js";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Admin />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
