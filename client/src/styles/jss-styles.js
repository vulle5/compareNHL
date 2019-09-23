import { fade } from '@material-ui/core/styles/colorManipulator';

/*

var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
var isFirefox = typeof InstallTrigger !== 'undefined';
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
var isChrome = !!window.chrome && !isOpera;
var isIE = false || !!document.documentMode;

*/

let isFirefox = typeof InstallTrigger !== 'undefined';

export const searchPlayerBarStyles = theme => ({
  root: {
    width: '100%'
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      userSelect: 'none',
      cursor: 'pointer'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  }
});

export const searchResultsListStyles = theme => ({
  wrapper: {
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
      position: 'relative'
    },
    [theme.breakpoints.up('md')]: {
      left: '60%',
      position: 'relative'
    },
    [theme.breakpoints.up('lg')]: {
      left: '70%',
      position: 'relative'
    }
  },
  spinner: {
    [theme.breakpoints.up('xs')]: {
      display: 'block',
      marginRight: 'auto',
      marginLeft: 'auto',
      marginTop: '16px',
      margin: '16px auto 16px auto'
    }
  },
  paper: {
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      width: '39%'
    },
    [theme.breakpoints.up('lg')]: {
      position: 'absolute',
      width: '29%'
    }
  },
  playerList: {
    paddingBottom: '0px'
  },
  message: {
    textAlign: 'center',
    margin: 'auto auto 8px auto',
    paddingTop: '8px'
  }
});

export const playerInfoStyles = theme => ({
  wrapper: {
    maxWidth: '1000px',
    margin: 'auto',
    paddingTop: '64px',
    [theme.breakpoints.down('xs')]: {
      paddingTop: '56px'
    }
  }
});

export const playerInfoHeader = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      margin: '0px',
      borderRadius: '0px'
    },
    margin: '12px',
    textAlign: isFirefox ? '-moz-center' : '-webkit-center'
  },
  logoWrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  playerThumbnail: {
    width: '100%',
    borderRadius: '4px',
    maxHeight: '317px',
    objectFit: 'contain'
  },
  loadingThumbnail: {
    width: '100%',
    margin: '4px',
    borderRadius: '4px',
    paddingBottom: '33%',
    backgroundColor: 'lightgrey'
  },
  mainStats: {
    paddingInlineStart: '0',
    listStyleType: 'none',
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '400px',
    justifyContent: 'space-evenly'
  },
  mainStatsLi: {
    padding: '0px 8px'
  },
  playerName: {
    margin: '8px 0px 8px 16px'
  },
  spinner: {
    textAlign: 'center',
    marginTop: '20px'
  }
});

export const seasonTableStyles = theme => ({
  wrapper: {
    [theme.breakpoints.up('md')]: {
      maxHeight: '600px',
      overflow: 'auto'
    }
  },
  table: {
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
    width: '75%',
    tableLayout: 'fixed'
  }
});

export const seasonTabsStyles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    display: 'inline'
  }
});

export const floatingActionButtonStyles = theme => ({
  root: {
    display: 'inline-block'
  },
  fab: {
    margin: '0',
    top: 'auto',
    right: '16px',
    bottom: '16px',
    left: 'auto',
    position: 'fixed'
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
});
