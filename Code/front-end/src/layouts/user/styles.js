import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme)=>({
  block: {
    margin: "0 0 5px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  logo: {
    maxWidth: "360px",
    maxHeight: "270px",
  },
  paper: {
    flexGrow: 1,
    margin: "0 15%",
  },
  divider: {
    margin: "-1px 16px 0",
  },
  username: {
    textAlign: "center",
    margin: "20px 0 0",
  },
  email: {
    textAlign: "center",
    margin: "10px 0 20px",
  },
  text: {
    width: "95%",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
}));

export default useStyles;