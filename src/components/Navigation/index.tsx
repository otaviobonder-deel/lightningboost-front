import React from 'react';
import { Container, makeStyles, Typography } from '@material-ui/core';
import { AiOutlineThunderbolt } from 'react-icons/ai';
import theme from '../../styles/customMuiTheme';
import { Link } from '../Link';
import { BtcPrice } from '../BtcPrice';

const useStyles = makeStyles({
  container: {
    backgroundColor: theme.palette.primary.light,
    padding: '1.2em',
  },
  links: {
    display: 'flex',
    flexDirection: 'row',
  },
  linkComponent: {
    marginLeft: '1em',
  },
  nav: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
  text: {
    color: 'white',
  },
});

export const Navigation: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Container maxWidth="md">
        <div className={classes.nav}>
          <div>
            <Link to="/">
              <AiOutlineThunderbolt color="yellow" size={32} />
            </Link>
          </div>
          <div className={classes.links}>
            <Link to="/comparison" className={classes.linkComponent}>
              <Typography className={classes.text}>Compare BTC</Typography>
            </Link>
            <Link to="/channels" className={classes.linkComponent}>
              <Typography className={classes.text}>Channels</Typography>
            </Link>
            <Link to="/watchtower" className={classes.linkComponent}>
              <Typography className={classes.text}>WatchTower</Typography>
            </Link>
            <Link to="/liquidity" className={classes.linkComponent}>
              <Typography className={classes.text}>Liquidity provider</Typography>
            </Link>
            <Link to="/explorer" className={classes.linkComponent}>
              <Typography className={classes.text}>Explorer</Typography>
            </Link>
            <span className={classes.linkComponent}><BtcPrice /></span>
          </div>
        </div>
      </Container>
    </div>
  );
};
