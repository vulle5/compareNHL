import { fade } from "@material-ui/core/styles/colorManipulator";

/*

var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
var isFirefox = typeof InstallTrigger !== 'undefined';
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
var isChrome = !!window.chrome && !isOpera;
var isIE = false || !!document.documentMode;

*/

let isFirefox = typeof InstallTrigger !== "undefined";

export const searchPlayerBarStyles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
});

export const searchResultsListStyles = theme => ({
  wrapper: {
    [theme.breakpoints.up("md")]: {
      left: "75%",
      position: "relative"
    },
    [theme.breakpoints.down("sm")]: {
      position: "relative"
    }
  },
  spinner: {
    [theme.breakpoints.up("xs")]: {
      display: "block",
      marginRight: "auto",
      marginLeft: "auto"
    }
  },
  paper: {
    [theme.breakpoints.up("sm")]: {
      position: "absolute",
      width: "24%"
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  }
});

export const playerInfoStyles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    [theme.breakpoints.down("xs")]: {
      margin: "0px",
      borderRadius: "0px"
    },
    margin: theme.spacing.unit,
    maxWidth: "1000px",
    textAlign: "-webkit-center"
  },
  wrapper: {
    textAlign: isFirefox ? "-moz-center" : "-webkit-center"
  },
  mainStats: {
    paddingInlineStart: "0",
    listStyleType: "none",
    display: "table"
  },
  mainStatsLi: {
    float: "left",
    padding: "0px 8px"
  },
  playerThumbnail: {
    width: "100%",
    objectFit: "contain",
    maxHeight: "317px",
    borderRadius: "4px"
  }
});

export const seasonTableStyles = theme => ({
  root: {
    overflow: "auto",
    marginBottom: "8px"
  },
  table: {
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    },
    width: "75%",
    tableLayout: "fixed"
  },
  headItem: {
    backgroundColor: "#fff",
    position: "sticky",
    top: 0,
    zIndex: 10
  }
});

export const seasonTabsStyles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    display: "inline"
  }
});

export const floatingActionButtonStyles = theme => ({
  root: {
    display: "inline-block"
  },
  fab: {
    margin: "0",
    top: "auto",
    right: "16px",
    bottom: "16px",
    left: "auto",
    position: "fixed"
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

export const compareStyles = theme => ({
  paper: {
    display: "inline-block",
  },
  root: {
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    display: "inline-block",
  },
});
