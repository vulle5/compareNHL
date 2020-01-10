import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  useMediaQuery,
  ListSubheader,
  Button
} from '@material-ui/core/';
import InvertColors from '@material-ui/icons/InvertColors';
import { toggleDrawer } from '../reducers/drawerReducer';
import { setTheme } from '../reducers/themeReducer';

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  }
});

const SideDrawer = ({ drawer, toggleDrawer, theme, setTheme }) => {
  const classes = useStyles();
  const matches = useMediaQuery('(prefers-color-scheme: dark)');
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleOnClose = () => setAnchorEl(null);

  const handleOnClick = theme => {
    theme === 'auto' ? setTheme('auto', matches) : setTheme(theme, matches);
    setAnchorEl(null);
  };

  // If you add more settings here separate settings items into own reusable component
  return (
    <div>
      <Drawer open={drawer} onClose={event => toggleDrawer(event)}>
        <div className={classes.list}>
          <List subheader={<ListSubheader>Settings</ListSubheader>}>
            <ListItem>
              <ListItemIcon>
                <InvertColors />
              </ListItemIcon>
              <ListItemText primary={'Theme'} />
              <Button
                aria-controls="theme-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                {theme}
              </Button>
              <Menu
                id="theme-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleOnClose}
              >
                <MenuItem onClick={() => handleOnClick('auto')}>Auto</MenuItem>
                <MenuItem onClick={() => handleOnClick('light')}>
                  Light
                </MenuItem>
                <MenuItem onClick={() => handleOnClick('dark')}>Dark</MenuItem>
              </Menu>
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
    theme: state.theme.themeType
  };
};

export default connect(mapStateToProps, { toggleDrawer, setTheme })(SideDrawer);
