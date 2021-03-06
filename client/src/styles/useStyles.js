import { makeStyles } from '@material-ui/core/styles';

export const useCompareStyles = makeStyles(theme => ({
  divRoot: {
    padding: '64px 16px 16px 16px',
    [theme.breakpoints.down('xs')]: {
      padding: '56px 16px 16px 16px'
    },
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  tileRoot: {
    margin: '16px 16px 0px 0px',
    width: '100%',
    maxWidth: '425px',
    [theme.breakpoints.down('xs')]: {
      minWidth: '100%'
    }
  },
  tileWrapper: {
    padding: theme.spacing(2)
  },
  tileExpandButton: {
    display: 'flex',
    justifyContent: 'center'
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: 'transform .25s cubic-bezier(0.22, 0.61, 0.36, 1)'
  },
  expandOpen: {
    transform: 'rotate(180deg)',
    transition: 'transform .25s cubic-bezier(0.22, 0.61, 0.36, 1)'
  },
  tileCloseButtonWrapper: {
    position: 'relative'
  },
  tileCloseButton: {
    position: 'absolute',
    right: '0'
  },
  tileAvatar: {
    width: '100px',
    height: '100px',
    margin: '12px auto',
    WebkitBoxShadow: '0px 10px 10px -8px rgba(0,0,0,1)',
    MozBoxShadow: '0px 10px 10px -8px rgba(0,0,0,1)',
    boxShadow: '0px 10px 10px -8px rgba(0,0,0,1)',
    '&:hover': {
      WebkitBoxShadow: '0px 10px 15px -8px rgba(255,23,68,1)',
      MozBoxShadow: '0px 10px 15px -8px rgba(255,23,68,1)',
      boxShadow: '0px 10px 15px -8px rgba(255,23,68,1)'
    },
    border: '1px solid lightgray'
  },
  tileTitle: { textAlign: 'center', fontWeight: 'bold' },
  tileList: {
    listStyleType: 'none',
    paddingInlineStart: '0px',
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  tileListItem: { margin: '0 8px 0 8px' },
  dialogList: {
    textAlign: 'center',
    marginTop: '20px'
  },
  message: {
    textAlign: 'center',
    margin: 'auto auto 8px auto',
    paddingTop: '8px'
  },
  bannerWrapper: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

export const useLinearProgressBarStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    width: '100%',
    paddingTop: '64px',
    [theme.breakpoints.down('xs')]: {
      paddingTop: '56px'
    }
  }
}));

export const useHomeStyles = makeStyles(theme => ({
  root: {
    margin: '32px 16px',
    paddingTop: '64px',
    [theme.breakpoints.down('xs')]: {
      paddingTop: '56px'
    }
  }
}));

export const useTeamListStyles = makeStyles(() => ({
  teamListWrapper: {
    alignSelf: 'center'
  },
  listLogo: {
    height: '40px',
    '&:hover': {
      '-webkit-transform': 'scale(1.25)',
      '-ms-transform': 'scale(1.25)',
      transform: 'scale(1.25)'
    },
    transition: 'transform .25s cubic-bezier(0.22, 0.61, 0.36, 1)'
  }
}));

export const useTeamStyles = makeStyles(theme => ({
  // Separate from teamList to teamView
  root: {
    maxWidth: '1000px',
    margin: 'auto',
    paddingTop: '64px',
    [theme.breakpoints.down('xs')]: {
      paddingTop: '56px'
    }
  },
  spinner: {
    margin: 'auto 50%',
    paddingTop: '78px',
    [theme.breakpoints.down('xs')]: {
      paddingTop: '70px'
    }
  },
  teamHeaderLogo: {
    height: '200px',
    width: '200px',
    margin: '0px 4px',
    borderRadius: '50%'
  },
  rosterPosTitle: {
    marginBottom: theme.spacing(1)
  },
  rosterList: {
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(3, 1)
  },
  paper: {
    padding: theme.spacing(1, 2)
  }
}));

export const useScheduleViewStyles = makeStyles(theme => ({
  viewLogo: {
    marginRight: '8px',
    cursor: 'pointer'
  },
  tooltipPlacementTop: {
    '&&': { margin: '0px' }
  }
}));

export const useScheduleListStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      marginTop: '16px'
    }
  },
  gameWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '32px',
    alignItems: 'flex-start',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center'
    }
  },
  emptyGameWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: '16px'
  },
  emptyGameCard: {
    marginBottom: '32px',
    display: 'inline-block',
    padding: '16px'
  }
}));

export const useScheduleListItemStyles = makeStyles(theme => ({
  listRoot: {
    maxWidth: 600,
    marginTop: '16px'
  },
  card: {
    padding: '16px',
    position: 'relative'
  },
  overViewWrapper: {
    display: 'flex',
    marginLeft: '40px',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      marginLeft: 'auto'
    }
  },
  liveDot: {
    height: 20,
    width: 40,
    borderRadius: 8,
    backgroundColor: 'red',
    position: 'absolute',
    top: 8,
    left: 8
  }
}));

export const useScheduleCardItemStyles = makeStyles(theme => ({
  gameCard: {
    width: '350px',
    margin: '16px 16px 0px 0px',
    [theme.breakpoints.down('xs')]: {
      margin: '16px 0px 0px 0px'
    }
  },
  scoreLogoWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '16px 0px 8px 0px',
    alignItems: 'center'
  },
  teamLogo: {
    width: '40px',
    overflow: 'visible',
    position: 'relative',
    marginLeft: '4px'
  },
  liveBanner: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius: 8,
    backgroundColor: '#d00000',
    width: '50px'
  }
}));

export const useDatePickerStyles = makeStyles({
  root: {
    '&&': { marginBottom: '0px' }
  }
});

export const useGameDetailStyles = makeStyles(theme => ({
  root: {
    maxWidth: '1000px',
    margin: 'auto',
    paddingTop: '64px',
    [theme.breakpoints.down('xs')]: {
      paddingTop: '56px'
    }
  },
  paper: {
    margin: '16px',
    padding: '16px',
    [theme.breakpoints.down('sm')]: {
      margin: '0px',
      padding: '16px 8px'
    }
  }
}));

export const useGameDetailHeaderStyles = makeStyles(theme => ({
  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px 10%',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(1),
      padding: '0px'
    }
  },
  logoContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: '250px'
  },
  teamLogo: {
    width: '80%',
    height: '50%'
  },
  teamName: {
    textAlign: 'center',
    margin: '16px 0px'
  },
  gameScore: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  liveBanner: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius: 8,
    backgroundColor: '#d00000',
    width: '50px',
    marginTop: 8
  }
}));

export const useGameOverviewStyles = makeStyles(theme => ({
  periodWrapper: {
    marginBottom: '16px',
    padding: '16px',
    border: 'solid 1px',
    borderRadius: '4px',
    borderColor: theme.palette.grey[600]
  }
}));

export const useGameOverviewShootoutStyles = makeStyles(theme => ({
  primaryText: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  wrapper: {
    border: 'solid 1px',
    borderColor: theme.palette.grey[600],
    borderRadius: '4px',
    padding: '16px'
  }
}));

export const useGameOverviewPeriodItemStyles = makeStyles(theme => ({
  primaryText: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  secondaryText: {
    textDecoration: 'none',
    color: theme.palette.text.secondary,
    '& a:hover': {
      textDecoration: 'underline'
    }
  },
  gameTimeText: {
    fontWeight: 'bold',
    border: 'solid 1px',
    borderRadius: '4px',
    letterSpacing: '1.5px'
  },
  penaltyText: {
    color: theme.palette.text.secondary
  },
  minorPenalty: {
    fontSize: '17px',
    padding: '2px',
    borderRadius: '4px',
    backgroundColor: 'yellow',
    color: 'black',
    border: 'solid 1px',
    fontWeight: 'bold'
  },
  majorPenalty: {
    fontSize: '17px',
    padding: '2px',
    borderRadius: '4px',
    backgroundColor: 'orange',
    color: 'black',
    border: 'solid 1px',
    fontWeight: 'bold'
  },
  gameMisconduct: {
    fontSize: '17px',
    padding: '2px',
    borderRadius: '4px',
    backgroundColor: '#ff4646',
    color: 'black',
    border: 'solid 1px',
    fontWeight: 'bold'
  }
}));

export const useThreeStarsStyles = makeStyles(theme => ({
  primaryText: {
    minWidth: '75px',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}));

export const useRosterTableStyles = makeStyles(theme => ({
  primaryText: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}));
