import React from "react";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DayjsUtils from "@date-io/dayjs";
import { Routes } from "./routes";
import theme from "./styles/customMuiTheme";
import store from "./providers/Store";
import { Snackbar } from "./components/Snackbar";

const App: React.FC = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DayjsUtils}>
        <CssBaseline />
        <Routes />
        <Snackbar />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  </Provider>
);

export default App;
