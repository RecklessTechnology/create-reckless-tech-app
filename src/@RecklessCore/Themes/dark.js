import grey from '@material-ui/core/colors/grey';
import { Palette } from '@material-ui/core/styles/createPalette';

const darkTheme = {
  themeName: 'Dark',
  palette: {
    type: 'dark',
    ...Palette,
    background: {
      default: grey[900],
      paper: grey[900],
    },
    primary: {
      main: grey[700],
    },
    secondary: {
      main: grey[500],
    },
  },
  spacing: 40,
};

export default darkTheme;
