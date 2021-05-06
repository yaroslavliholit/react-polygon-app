import React, {memo} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import AppRoutes from './routes/';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';

const App = () => (
    <Router>
        <ThemeProvider theme={theme}>
            <AppRoutes />
        </ThemeProvider>
    </Router>
);

export default memo(App);
