import { makeStyles } from "@material-ui/core";

export const useCompareStyles = makeStyles(theme => ({
  divRoot: {
    padding: "64px 16px 16px 16px",
    display: "flex",
    flexWrap: "wrap"
  },
  tileRoot: {
    display: "inline-block",
    margin: "16px 16px 0px 0px",
    width: "100%",
    maxWidth: "425px",
    [theme.breakpoints.down("xs")]: {
      minWidth: "100%"
    }
  },
  tileWrapper: {
    padding: theme.spacing(2),
    minHeight: "780px"
  },
  tileCloseButtonWrapper: {
    position: "relative"
  },
  tileCloseButton: {
    position: "absolute",
    right: "0"
  },
  tileAvatar: {
    width: "100px",
    height: "100px",
    margin: "12px auto",
    WebkitBoxShadow: "0px 10px 10px -8px rgba(0,0,0,1)",
    MozBoxShadow: "0px 10px 10px -8px rgba(0,0,0,1)",
    boxShadow: "0px 10px 10px -8px rgba(0,0,0,1)",
    "&:hover": {
      WebkitBoxShadow: "0px 10px 15px -8px rgba(255,23,68,1)",
      MozBoxShadow: "0px 10px 15px -8px rgba(255,23,68,1)",
      boxShadow: "0px 10px 15px -8px rgba(255,23,68,1)"
    },
    border: "1px solid lightgray"
  },
  tileTitle: { textAlign: "center", fontWeight: "bold" },
  tileList: {
    listStyleType: "none",
    paddingInlineStart: "0px",
    display: "flex",
    justifyContent: "space-evenly"
  },
  tileListItem: { margin: "0 8px 0 8px" },
  dialogList: {
    textAlign: "center",
    marginTop: "20px"
  },
  bannerWrapper: {
    display: "flex",
    justifyContent: "center"
  }
}));
