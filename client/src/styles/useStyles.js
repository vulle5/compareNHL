import { makeStyles } from '@material-ui/core';

export const useCompareStyles = makeStyles(theme => ({
  divRoot: {
    padding: '64px 16px 16px 16px',
    [theme.breakpoints.down('xs')]: {
      padding: '56px 16px 16px 16px'
    },
    display: 'flex',
    flexWrap: 'wrap'
  },
  tileRoot: {
    display: 'inline-block',
    margin: '16px 16px 0px 0px',
    width: '100%',
    maxWidth: '425px',
    [theme.breakpoints.down('xs')]: {
      minWidth: '100%'
    }
  },
  tileWrapper: {
    padding: theme.spacing(2),
    minHeight: '780px'
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
    // Height is 53px, because anything above causes scrollbar
    // to appear briefly on fullHd (width: 1920px)
    '&:hover': { height: '53px' },
    transition: 'height .25s cubic-bezier(0.22, 0.61, 0.36, 1)'
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
    margin: '0px'
  }
}));

export const useScheduleListStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-end'
  },
  gameWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '32px',
    alignItems: 'flex-start'
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
    padding: '16px'
  },
  overViewWrapper: {
    display: 'flex',
    marginLeft: '40px',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      marginLeft: 'auto'
    }
  }
}));

export const useScheduleCardItemStyles = makeStyles(theme => ({
  gameCard: {
    width: '350px',
    margin: '16px 16px 0px 0px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
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
  }
}));

export const useDatePickerStyles = makeStyles({
  root: {
    marginBottom: '0px'
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
  }
}));

export const useGameDetailHeaderStyles = makeStyles(theme => ({
  root: {
    margin: '16px',
    padding: '16px',
    [theme.breakpoints.down('sm')]: {
      margin: '0px',
      padding: '16px 8px'
    }
  },
  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px 10%',
    [theme.breakpoints.down('sm')]: {
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
    height: 'auto',
    width: '80%'
  },
  teamName: {
    textAlign: 'center',
    margin: '16px 0px'
  },
  gameScore: {
    width: '100%',
    margin: 'auto',
    textAlign: 'center'
  }
}));
