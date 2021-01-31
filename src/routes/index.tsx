import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { Home } from "../pages/home";
import { Navigation } from "../components/Navigation";
import ErrorBoundary from "../components/ErrorBoundary";
import { Footer } from "../components/Footer";
import { NotFound } from "../pages/notFound";
import { useTracking } from "../hooks/useTracking";
import { Loader } from "../components/Loader";

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
  load: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const SuspenseFallback: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.load}>
      <Loader />
    </div>
  );
};

export const Routes: React.FC = () => {
  const classes = useStyles();

  // lazy load
  const Explorer = lazy(() => import("../pages/explorer"));
  const Comparison = lazy(() => import("../pages/comparison"));
  const LiquidityProvider = lazy(() => import("../pages/liquidity"));
  const WatchTower = lazy(() => import("../pages/watchtower"));

  // update page changes
  useTracking();

  return (
    <div className={classes.body}>
      <Navigation />
      <ErrorBoundary>
        <div className={classes.components}>
          <Suspense fallback={SuspenseFallback}>
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
          </Suspense>
        </div>
      </ErrorBoundary>
      <Footer />
    </div>
  );
};
