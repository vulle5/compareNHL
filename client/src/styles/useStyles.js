import { makeStyles } from "@material-ui/core";

export const useCompareStyles = makeStyles(theme => ({
  divRoot: {
    padding: "0px 16px 16px 16px"
  },
  tileRoot: {
    display: "inline-block",
    margin: "16px 16px 0px 0px"
  },
  tileWrapper: {
    padding: theme.spacing(2)
  },
  tileCloseButton: {
    float: "right"
  },
  tileAvatar: {
    width: "100px",
    height: "100px",
    margin: "12px auto",
    WebkitBoxShadow: "0px 10px 10px -8px rgba(0,0,0,1)",
    MozBoxShadow: "0px 10px 10px -8px rgba(0,0,0,1)",
    boxShadow: "0px 10px 10px -8px rgba(0,0,0,1)",
    border: "1px solid lightgray"
  }
}));
