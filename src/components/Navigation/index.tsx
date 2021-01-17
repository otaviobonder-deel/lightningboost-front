import React from 'react';
import { makeStyles } from '@material-ui/core';
import theme from '../../styles/customMuiTheme';
import { AppBar } from './Appbar';
import { Drawer } from './Drawer';

const useStyles = makeStyles({
  offset: theme.mixins.toolbar,
});

const links = [
  {
    text: 'Compare BTC',
    link: '/comparison',
  },
  {
    text: 'Channels',
    link: '/channels',
  },
  {
    text: 'WatchTower',
    link: '/watchtower',
  },
  {
    text: 'Liquidity Provider',
    link: 'liquidity',
  },
  {
    text: 'Explorer',
    link: '/explorer',
  },
];

export const Navigation: React.FC = () => {
  const classes = useStyles();

  return (
    <div>
      <AppBar links={links} />
      <div className={classes.offset} />
      <Drawer links={links} />
    </div>
  );
};
