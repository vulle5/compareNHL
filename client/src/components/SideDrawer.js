import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch
} from "@material-ui/core/";
import InvertColors from "@material-ui/icons/InvertColors";
import { toggleDrawer } from "../reducers/drawerReducer";
import { setTheme } from "../reducers/themeReducer";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

const SideDrawer = ({ drawer, toggleDrawer, theme, setTheme }) => {
  const classes = useStyles();

  const onDrawerClose = () => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    toggleDrawer();
  };

  return (
    <div>
      <Drawer open={drawer} onClose={onDrawerClose()}>
        <div className={classes.list}>
          <List>
            <ListItem>
              <ListItemIcon>
                <InvertColors />
              </ListItemIcon>
              <ListItemText primary={"Dark mode"} />
              <Switch
                checked={theme === "dark"}
                onChange={() =>
                  theme === "dark" ? setTheme("light") : setTheme("dark")
                }
              />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    drawer: state.drawer,
    theme: state.theme.palette.type
  };
};

export default connect(
  mapStateToProps,
  { toggleDrawer, setTheme }
)(SideDrawer);
