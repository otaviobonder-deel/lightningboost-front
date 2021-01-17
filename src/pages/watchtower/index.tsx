import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { useApiRequest } from '../../hooks/useApiRequest';
import { PageContainer } from '../../components/Container/PageContainer';

const useStyles = makeStyles({
  code: {
    backgroundColor: '#f6f8fa',
    padding: 5,
  },
});

export const WatchTower: React.FC = () => {
  const classes = useStyles();
  const { data: uri, loading, error } = useApiRequest({ initialLoading: true, url: '/lightning/watchtower' });

  return (
    <PageContainer maxWidth="md">
      <div style={{ padding: 24 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} container spacing={2}>
            <Grid item xs={12}>
              <Typography align="center" component="h1" variant="h4">What are Watchtowers</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography align="center">
                Watchtowers act as a second line of defense in responding to
                malicious or accidental breach scenarios in the event that the
                client’s node is offline or unable to respond at the time of a
                breach, offering greater degree of safety to channel funds. The
                watchtower node will monitor the Lightning Network channel for
                breaches; if it notices one, the watchtower will launch a “penalty”
                transaction that will return the funds to the offline node.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} container spacing={2}>
            <Grid item xs={12}>
              <Typography align="center" component="h2" variant="h4">
                How to connect to a Watchtower
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography align="center" variant="h5">
                Using LND
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography align="center">
                In order to set up a watchtower client, you’ll need two things:
                <br />
                <br />
                1. The watchtower client must be enabled with the
                {' '}
                <code className={classes.code}>--wtclient.active</code>
                {' '}
                flag.
              </Typography>
            </Grid>
            <Grid item xs={12} container justify="center">
              <Typography className={classes.code}>
                <code>lnd --wtclient.active</code>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography align="center">
                2. The watchtower URI of an active watchtower.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {loading && (<Typography variant="body2">Loading my node&apos;s URI</Typography>)}
              {error && (<Typography variant="body2">There was a problem loading the URI</Typography>)}
              {uri
              && (
              <Typography align="center" className={classes.code}>
                <code style={{ wordBreak: 'break-all', textAlign: 'center' }}>
                  lncli wtclient add
                  {' '}
                  {uri}
                </code>
              </Typography>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography align="center">
              That&apos;s it! As long as my node is connected and observing the
              network, you are safe.
            </Typography>
          </Grid>
        </Grid>
      </div>
    </PageContainer>
  );
};
