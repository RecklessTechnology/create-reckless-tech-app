import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';

// import grey from '@material-ui/core/colors/grey';
import { Palette } from '@material-ui/core/styles/createPalette';

const darkTheme = createMuiTheme({
  themeName: 'Dark',
  palette: {
    type: 'dark',
    // background: {
    //   default: grey[900],
    //   paper: grey[900],
    // },
    ...Palette,
    // primary: {
    //   main: grey[700],
    // },
    // secondary: {
    //   main: grey[500],
    // },
  },
});

export default darkTheme;
