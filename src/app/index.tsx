import React, { memo } from 'react';
import { ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';

import ErrorBoundary from '../shared/components/ErrorBoundary';
import AppRoutes from './routes/';
import theme from './theme';

const App = () => (
  <Router>
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
    </ThemeProvider>
  </Router>
);

export default memo(App);
