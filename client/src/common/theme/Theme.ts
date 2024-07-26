import { createTheme, responsiveFontSizes } from '@mui/material';
import { ERROR, PRIMARY, SECONDARY, SUSCESS, WARNING } from '@common/constants';

declare module '@mui/material/styles/createTheme' {
  interface Theme {
    border: {
      primary: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    border?: {
      primary?: string;
    };
  }
}

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        autoComplete: 'off',
        size: 'small',
        inputProps: {
          sx: {
            fontSize: '.9rem',
            fontWeight: 500
          }
        }
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        size: 'small'
      }
    },
    MuiStack: {
      defaultProps: {
        direction: 'row'
      }
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained'
      }
    },
    MuiTypography: {
      defaultProps: {}
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: PRIMARY,
          fontWeight: 700
        },
        body: {}
      }
    }
  },

  palette: {
    primary: {
      main: PRIMARY
    },
    secondary: {
      main: SECONDARY
    },
    success: {
      main: SUSCESS
    },
    error: {
      main: ERROR
    },
    warning: {
      main: WARNING
    }
  },
  typography: {
    h1: {
      fontSize: '1.5rem',
      fontWeight: 800
    },
    h2: {
      fontSize: '1.4rem',
      fontWeight: 700
    },
    h3: {
      fontSize: '1.3rem',
      fontWeight: 600
    },
    h4: {
      fontSize: '1.2rem',
      fontWeight: 600
    },
    h5: {
      fontSize: '1.1rem',
      fontWeight: 600
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600
    },
    subtitle1: {
      fontSize: '.9rem',
      fontWeight: 500
    },
    allVariants: {
      fontFamily: '"Roboto Condensed", sans-serif'
    }
  }
});

export default responsiveFontSizes(theme);
