import React from 'react';
import {
  Container, Grid, makeStyles, Paper, Typography,
} from '@material-ui/core';
import thunderBackground from '../../assets/thunder.mp4';
import { BtcPrice } from '../../components/BtcPrice';

interface IBox {
  title: string,
  icon?: string
}

const useStyles = makeStyles({
  container: {
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: '50%',
    width: '100%',
  },
  paper: {
    padding: 20,
  },
  text: {
    color: 'white',
  },
});

const Box: React.FC<IBox> = ({ children, title, icon }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item>
          <Typography variant="h6" component="h3">{title}</Typography>
        </Grid>
        <Grid item>
          <Typography>
            Did you ever want to know how much you would have now investing in bitcoin
            instead of that investment you made? You can compare here a one time investment
            or a DCA (dollar cost average) type of investment
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

const Comparison: React.FC = () => (
  <Box title="Compare btc with any investment" />
);

export const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        <video autoPlay muted loop id="thunder_background" width="100%" height={250} style={{ objectFit: 'cover' }}>
          <source src={thunderBackground} type="video/mp4" />
        </video>
        <div className={classes.overlay}>
          <Container maxWidth="md">
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography variant="h3" component="h1" align="center" className={classes.text}>Welcome to LightningBoost</Typography>
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
      <Container maxWidth="md">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography align="center" component="h2" variant="h6">
              Here you will find some information about the Lightning Network and bitcoin
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Comparison />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
