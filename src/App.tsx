import React from "react";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DayjsUtils from "@date-io/dayjs";
import ReactGA from "react-ga";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes } from "./routes";
import theme from "./styles/customMuiTheme";
import store from "./providers/Store";
import { Snackbar } from "./components/Snackbar";

ReactGA.initialize("UA-151329445-1", {
  debug: process.env.NODE_ENV === "development",
});

const App: React.FC = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DayjsUtils}>
        <CssBaseline />
        <Router>
          <Routes />
        </Router>
        <Snackbar />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  </Provider>
);

export default App;
