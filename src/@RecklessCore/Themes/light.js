import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';

import grey from '@material-ui/core/colors/grey';
import { Palette } from '@material-ui/core/styles/createPalette';

const lightTheme = createMuiTheme({
  themeName: 'Light',
  palette: {
    type: 'light',
    background: {
      default: grey[900],
      paper: grey[900],
    },
    ...Palette,
  },
});

export default lightTheme;
