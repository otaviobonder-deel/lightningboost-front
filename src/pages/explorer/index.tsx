/* eslint-disable camelcase */

import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { ErrorOutline, Public, Timeline } from "@material-ui/icons";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { useApiRequest } from "../../hooks/useApiRequest";
import { ResiumMap } from "../../components/Map";
import { Graph } from "../../components/Graph";
import { HelmetMetaTag } from "../../components/Helmet";

interface IData {
  nodes: [
    {
      alias?: string;
      publicKey: string;
      color: string;
      lat?: number;
      lng?: number;
    }
  ];
  links: [
    {
      id: string;
      policies: [
        {
          public_key: string;
        },
        {
          public_key: string;
        }
      ];
      capacity: string;
      transaction_id: string;
      color?: string;
    }
  ];
}

const useStyles = makeStyles({
  container: {
    display: "flex",
    flex: 1,
    position: "relative",
  },
  awaiting: {
    alignItems: "center",
    display: "flex",
    flex: 1,
    justifyContent: "center",
  },
  toggleButton: {
    position: "absolute",
    top: 25,
    left: "50%",
    transform: "translate(-50%, 0%)",
  },
  iconSelected: {
    color: "yellow !important",
  },
  icon: {
    color: "#fff",
  },
});

const Explorer: React.FC = () => {
  const classes = useStyles();

  const [mapType, setMapType] = useState<"globe" | "graph">("globe");

  const { data, error, loading, reload } = useApiRequest<IData>({
    url: "/lightning/chaingraph",
    initialLoading: true,
  });

  const handleMapChange = (
    event: React.MouseEvent<HTMLElement>,
    type: "globe" | "graph" | null
  ) => {
    if (type !== null) {
      setMapType(type);
    }
  };

  if (loading) {
    return (
      <>
        <HelmetMetaTag
          title="Explore the Lightning Network | LightningBoost"
          description="Explore the all Lightning Network nodes in a map or a graph. Search for any node and see its public channels and peers."
          keywords="lightning network, explore, graph"
        />
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
      </>
    );
  }

  if (error) {
    return (
      <>
        <HelmetMetaTag
          title="Explore the Lightning Network | LightningBoost"
          description="Explore the all Lightning Network nodes in a map or a graph. Search for any node and see its public channels and peers."
          keywords="lightning network, explore, graph"
        />
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
      </>
    );
  }

  return (
    <>
      <HelmetMetaTag
        title="Explore the Lightning Network | LightningBoost"
        description="Explore the all Lightning Network nodes in a map or a graph. Search for any node and see its public channels and peers."
        keywords="lightning network, explore, graph"
      />
      <div className={classes.container}>
        {data && mapType === "globe" && <ResiumMap data={data} />}
        {data && mapType === "graph" && <Graph data={data} />}
        <div className={classes.toggleButton}>
          <ToggleButtonGroup
            value={mapType}
            exclusive
            onChange={handleMapChange}
          >
            <Tooltip title="Globe">
              <ToggleButton
                classes={{ selected: classes.iconSelected, root: classes.icon }}
                value="globe"
                selected={mapType === "globe"}
              >
                <Public />
              </ToggleButton>
            </Tooltip>
            <Tooltip title="Graph">
              <ToggleButton
                classes={{ selected: classes.iconSelected, root: classes.icon }}
                value="graph"
                selected={mapType === "graph"}
              >
                <Timeline />
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>
        </div>
      </div>
    </>
  );
};

export default Explorer;
