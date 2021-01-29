import React from "react";
import {
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Lottie from "react-lottie";
import { useHistory } from "react-router-dom";
import lost from "../../assets/404page.json";
import { HelmetMetaTag } from "../../components/Helmet";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const NotFound: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lost,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <HelmetMetaTag title="Page not found | LightningBoost" />
      <Container maxWidth="md" className={classes.container}>
        <Grid container spacing={4} justify="center" alignItems="center">
          <Grid item xs={12} sm={6}>
            <Lottie options={defaultOptions} />
          </Grid>
          <Grid item xs={12} sm={6} container spacing={2}>
            <Grid item xs={12}>
              <Typography align="center" variant="h1" component="h1">
                404
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography align="center" variant="h4" component="h2">
                Uh oh, you&apos;re lost!
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography align="center">
                It seems you are trying to reach a page that doesn&apos;t exist.
                How you got here is a mystery, but you can click the button
                bellow to go back to the home page
              </Typography>
            </Grid>
            <Grid item xs={12} container justify="center">
              <Button onClick={() => history.push("/")} variant="outlined">
                Return to home page
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
