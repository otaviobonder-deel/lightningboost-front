import React from "react";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { ErrorOutline } from "@material-ui/icons";
import { useApiRequest } from "../../hooks/useApiRequest";
import { ResiumMap } from "../../components/Map";

interface IData {
  alias?: string;
  publicKey: string;
  color: string;
  lat?: number;
  lng?: number;
}

const useStyles = makeStyles({
  container: {
    flex: 1,
    position: "relative",
  },
  awaiting: {
    alignItems: "center",
    display: "flex",
    flex: 1,
    justifyContent: "center",
  },
});

export const Explorer: React.FC = () => {
  const classes = useStyles();

  const { data, error, loading, reload } = useApiRequest<IData[]>({
    url: "/lightning/chaingraph",
    initialLoading: true,
  });

  if (loading) {
    return (
      <Container maxWidth="md" className={classes.awaiting}>
        <Grid container spacing={2} justify="center">
          <Grid item xs={12} container justify="center">
            <CircularProgress />
          </Grid>
          <Grid item xs={12}>
            <Typography align="center">Loading chain graph</Typography>
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" className={classes.awaiting}>
        <Grid container spacing={2} justify="center">
          <Grid item xs={12} container justify="center">
            <ErrorOutline style={{ fill: "red" }} />
          </Grid>
          <Grid item xs={12}>
            <Typography align="center">
              There was an error loading the chain graph
            </Typography>
          </Grid>
          <Grid item xs={12} container justify="center">
            <Button onClick={() => reload()} variant="outlined">
              Retry
            </Button>
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <div className={classes.container}>{data && <ResiumMap data={data} />}</div>
  );
};
