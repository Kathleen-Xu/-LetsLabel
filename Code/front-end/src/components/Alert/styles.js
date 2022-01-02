import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 600,
    width: "400px",
    top: "12px",
    display: "fixed",
    position: "absolute",
  },
  alert: {
    width: "100%",
  },
}));

export default useStyles;
