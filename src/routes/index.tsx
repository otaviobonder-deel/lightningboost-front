import React from "react";
import { Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { Home } from "../pages/home";
import { Navigation } from "../components/Navigation";
import { Explorer } from "../pages/explorer";
import { WatchTower } from "../pages/watchtower";
import { LiquidityProvider } from "../pages/liquidity";
import { Comparison } from "../pages/comparison";
import ErrorBoundary from "../components/ErrorBoundary";
import { Footer } from "../components/Footer";
import { NotFound } from "../pages/notFound";
import { useTracking } from "../hooks/useTracking";

const useStyles = makeStyles({
  body: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  components: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
  },
});

export const Routes: React.FC = () => {
  const classes = useStyles();

  // update page changes
  useTracking();

  return (
    <div className={classes.body}>
      <Navigation />
      <ErrorBoundary>
        <div className={classes.components}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/explorer">
              <Explorer />
            </Route>
            <Route path="/watchtower">
              <WatchTower />
            </Route>
            <Route path="/liquidity">
              <LiquidityProvider />
            </Route>
            <Route path="/comparison">
              <Comparison />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </ErrorBoundary>
      <Footer />
    </div>
  );
};
