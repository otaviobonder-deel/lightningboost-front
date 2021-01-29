import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import theme from "../../styles/customMuiTheme";

const useStyles = makeStyles({
  footer: {
    backgroundColor: theme.palette.primary.light,
    padding: "15px 0",
  },
  link: {
    color: "#fff",
  },
  text: {
    fontSize: 12,
  },
});

export const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.footer}>
      <Grid item xs={12}>
        <Typography align="center" color="secondary" className={classes.text}>
          Developed with ❤️ by{" "}
          <a
            href="https://twitter.com/otaviobonder"
            target="_blank"
            rel="noreferrer"
            className={classes.link}
          >
            @otaviobonder
          </a>
        </Typography>
      </Grid>
    </Grid>
  );
};
