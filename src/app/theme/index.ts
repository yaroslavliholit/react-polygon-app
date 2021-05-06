import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3f50b5',
      dark: '#001458',
      contrastText: '#8B40CB',
    },
    secondary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#5887D3',
    },
    text: {
      primary: '#141111',
      secondary: '#1D2021',
      disabled: '#B6B7C3',
    },
    common: {
      black: '#000000',
      white: '#FFFFFF',
    },
    success: {
      main: '#58D38C',
    },
    error: {
      main: '#E83E3E',
    },
    grey: {},
  },
});

export default theme;
