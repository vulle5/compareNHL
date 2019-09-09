import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  ListSubheader
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

  return (
    <div>
      <Drawer open={drawer} onClose={event => toggleDrawer(event)}>
        <div className={classes.list}>
          <List subheader={<ListSubheader>Settings</ListSubheader>}>
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
