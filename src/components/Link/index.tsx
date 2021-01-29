import React from "react";
import { Link as RRDLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

interface ILink {
  className?: string;
  to: string;
}

const useStyles = makeStyles({
  link: {
    display: "flex",
    textDecoration: "none",
    "& > *": {
      transition: "opacity 200ms ease",
    },
    "&:hover > *": {
      opacity: 0.8,
    },
  },
});

export const Link: React.FC<ILink> = ({ children, to, className }) => {
  const classes = useStyles();

  return (
    <RRDLink to={to} className={`${classes.link} ${className}`}>
      {children}
    </RRDLink>
  );
};
