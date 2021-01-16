import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { Routes } from './routes';
import theme from './styles/customMuiTheme';

const App: React.FC = () => (
  <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  </>
);

export default App;
