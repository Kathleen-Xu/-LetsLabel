import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 15px",
  },
  title: {
    width: "80%",
    fontWeight: "600",
    margin: "40px 55px 10px",
    fontFamily: "Noto Sans SC, sans-serif",
  },
  divider: {
    width: "97%",
    marginBottom: "10px",
  },
  divider_v2: {
    height: "auto",
    margin: "0",
  },
  card: {
    width: "60%",
    display: "flex",
    margin: "10px 0 0",
    flexDirection: "row",
  },
  subCard:{
    width: "50%",
    padding: "5px 20px",
  },
  add: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    padding: "5px",
  },
  chip: {
    margin: "5px",
  },
  board: {
    margin: "10px 0 0",
    width: "97%",
  },
}));
export default useStyles;