import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { GridLoader } from "react-spinners";
import theme from "../../styles/customMuiTheme";

const useStyles = makeStyles({
  container: {
    alignItems: "center",
    display: "flex",
    flex: 1,
    justifyContent: "center",
  },
});

export const Loader: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} container justify="center">
          <GridLoader color={theme.palette.primary.light} />
        </Grid>
        {children && (
          <Grid item xs={12}>
            {children}
          </Grid>
        )}
      </Grid>
    </div>
  );
};
