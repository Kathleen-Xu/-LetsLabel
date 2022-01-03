import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    width: "100%",
    fontWeight: "600",
    margin: "40px 55px 10px",
    fontFamily: "Noto Sans SC, sans-serif",
  },
  divider: {
    width: "80%",
  },
}));
export default useStyles;