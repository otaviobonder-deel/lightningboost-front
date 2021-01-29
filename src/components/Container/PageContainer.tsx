import React from "react";
import { Container, ContainerProps, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    margin: "30px 0",
  },
});

export const PageContainer: React.FC<ContainerProps> = ({
  children,
  maxWidth,
}) => {
  const classes = useStyles();

  return (
    <Container className={classes.container} maxWidth={maxWidth}>
      {children}
    </Container>
  );
};
