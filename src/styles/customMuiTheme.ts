import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#3e2e56",
      main: "#17062d",
      dark: "#000004",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#ffffff",
      main: "#ffffff",
      dark: "#cccccc",
      contrastText: "#000000",
    },
    background: {
      default: "#ffffff",
    },
  },
});

const responsiveTheme = responsiveFontSizes(theme, { factor: 1 });

export default responsiveTheme;
