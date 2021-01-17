import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Drawer as MuiDrawer,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { AiOutlineThunderbolt } from "react-icons/ai";
import theme from "../../styles/customMuiTheme";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { closeDrawer } from "../../actions/drawerActions";

interface ILinks {
  text: string;
  link: string;
}

interface IProps {
  links: ILinks[];
}

const useStyles = makeStyles({
  drawer: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.text.secondary,
    flex: 1,
    minWidth: 220,
  },
  linkText: {
    color: "#fff",
  },
  logo: {
    display: "flex",
    justifyContent: "center",
    margin: "24px 0",
  },
});

export const Drawer: React.FC<IProps> = ({ links }) => {
  const classes = useStyles();
  const { open } = useTypedSelector((state) => state.drawer);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = ({ link }: { link: string }) => {
    dispatch(closeDrawer());
    history.push(link);
  };

  return (
    <MuiDrawer open={open} onClose={() => dispatch(closeDrawer())}>
      <div className={classes.drawer}>
        <div className={classes.logo}>
          <AiOutlineThunderbolt
            color="yellow"
            size={32}
            onClick={() => handleClick({ link: "/" })}
          />
        </div>
        <List>
          {links.map((link) => (
            <ListItem
              button
              key={link.link}
              onClick={() => handleClick({ link: link.link })}
            >
              <ListItemText primary={link.text} className={classes.linkText} />
            </ListItem>
          ))}
        </List>
      </div>
    </MuiDrawer>
  );
};
