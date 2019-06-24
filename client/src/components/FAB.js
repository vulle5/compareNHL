import React, { useState, useEffect, useCallback } from "react";
import { throttle } from "lodash";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { Fab, Zoom } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { floatingActionButtonStyles } from "../styles/jss-styles";

const FloatingActionButton = ({
  classes,
  width,
  onClick,
  to,
  title,
  isLink
}) => {
  const [atBottom, setAtBottom] = useState(false);

  const handleScroll = throttle(
    useCallback(() => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;

      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const scrolled = winScroll / height;

      if (scrolled === 1) {
        setAtBottom(true);
      } else {
        setAtBottom(false);
      }
    }, []),
    200
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className={classes.root}>
      <Zoom in={isWidthUp("sm", width) ? true : !atBottom}>
        <Fab
          variant={isWidthUp("sm", width) ? "extended" : "round"}
          aria-label="Add to Compare"
          className={classes.fab}
          color="primary"
          component={isLink ? Link : "button"}
          to={to}
          onClick={onClick && isLink === undefined ? onClick : null}
        >
          <AddIcon
            className={isWidthUp("sm", width) ? classes.extendedIcon : null}
          />
          {isWidthUp("sm", width) ? title : null}
        </Fab>
      </Zoom>
    </div>
  );
};

export default withWidth()(
  withStyles(floatingActionButtonStyles)(FloatingActionButton)
);
