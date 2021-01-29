import React from "react";
import {
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import thunderBackground from "../../assets/thunder.mp4";
import { Link } from "../../components/Link";

interface IBox {
  title: string;
  icon?: string;
}

const useStyles = makeStyles({
  container: {
    position: "relative",
  },
  aboutSection: {
    marginTop: 50,
  },
  innerGrid: {
    display: "flex",
  },
  overlay: {
    position: "absolute",
    top: "50%",
    width: "100%",
  },
  paper: {
    flex: 1,
    padding: 20,
  },
  text: {
    color: "white",
  },
});

const Box: React.FC<IBox> = ({ children, title, icon }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" component="h3" align="center">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
    </Paper>
  );
};

export const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        <video
          autoPlay
          muted
          loop
          id="thunder_background"
          width="100%"
          height={250}
          style={{ objectFit: "cover" }}
        >
          <source src={thunderBackground} type="video/mp4" />
        </video>
        <div className={classes.overlay}>
          <Container maxWidth="md">
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography
                  variant="h3"
                  component="h1"
                  align="center"
                  className={classes.text}
                >
                  Welcome to LightningBoost
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
      <Container maxWidth="md" className={classes.aboutSection}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography align="center" component="h2" variant="h6">
              Here you will find some information about the Lightning Network
              and bitcoin
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.innerGrid}>
            <Link to="/comparison">
              <Box title="Compare btc with any investment">
                <Typography>
                  Did you ever want to know how much you would have now
                  investing in bitcoin instead of that investment you made? You
                  can compare here a one time investment or a DCA (dollar cost
                  average) type of investment.
                </Typography>
              </Box>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.innerGrid}>
            <Link to="/watchtower">
              <Box title="Connect to a WatchTower">
                <Typography>
                  Do you have a Lightning Node and don&apos;t want to let it
                  online 24/7? You can use my WatchTower service to guard your
                  node&apos;s funds. Learn more!
                </Typography>
              </Box>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.innerGrid}>
            <Link to="/liquidity">
              <Box title="Open a channel to your LN node">
                <Typography>
                  Did you launch your new Lightning Network node and need
                  inbound liquidity to receive payments? Open a channel to
                  yourself and start receiving LN payments right away!
                </Typography>
              </Box>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.innerGrid}>
            <Link to="/explorer">
              <Box title="Explore the Lightning Network">
                <Typography>
                  Curious about the Lightning Network nodes? Explore all known
                  nodes in a globe or in a graph.
                </Typography>
              </Box>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
