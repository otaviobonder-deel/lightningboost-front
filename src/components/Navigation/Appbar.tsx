import React from "react";
import { useDispatch } from "react-redux";
import {
  AppBar as MuiAppBar,
  Container,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { AiOutlineThunderbolt } from "react-icons/ai";
import theme from "../../styles/customMuiTheme";
import { Link } from "../Link";
import { openDrawer } from "../../actions/drawerActions";
import { BtcPrice } from "../BtcPrice";

interface ILinks {
  text: string;
  link: string;
}

interface IProps {
  links: ILinks[];
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: theme.palette.primary.light,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: theme.palette.secondary.main,
  },
  title: {
    flexGrow: 1,
  },
  innerDiv: {
    display: "flex",
    alignItems: "center",
  },
  outterDiv: {
    justifyContent: "space-between",
  },
  links: {
    color: "#fff",
    textDecoration: "none",
    transition: "color 300ms ease",
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  span: {
    marginLeft: 32,
  },
});

export const AppBar: React.FC<IProps> = ({ links }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const openAppDrawer = () => {
    dispatch(openDrawer());
  };

  return (
    <MuiAppBar className={classes.appBar}>
      <Container maxWidth="md">
        <Toolbar className={classes.outterDiv}>
          <div className={classes.innerDiv}>
            <Hidden mdUp>
              <IconButton
                edge="start"
                className={classes.menuButton}
                onClick={openAppDrawer}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Hidden smDown>
              <Link to="/">
                <AiOutlineThunderbolt color="yellow" size={32} />
              </Link>
            </Hidden>
          </div>
          <Hidden smDown>
            <div className={classes.innerDiv}>
              {links.map((link) => (
                <span key={link.link} className={classes.span}>
                  <Link to={link.link} className={classes.links}>
                    <Typography>{link.text}</Typography>
                  </Link>
                </span>
              ))}
              <span className={classes.span}>
                <BtcPrice />
              </span>
            </div>
          </Hidden>
          <Hidden mdUp>
            <BtcPrice />
          </Hidden>
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
};
