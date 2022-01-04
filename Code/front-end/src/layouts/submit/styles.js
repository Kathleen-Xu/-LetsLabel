import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 10%",
  },
  title: {
    width: "100%",
    fontWeight: "600",
    margin: "40px 55px 10px",
    fontFamily: "Noto Sans SC, sans-serif",
  },
  divider: {
    width: "100%",
    marginBottom: "10px",
  },
  form_head: {
    textAlign: "center",
    padding: "20px 24px 0",
  },
  form_content: {
    padding: "8px 24px 20px",
  },
  form_button: {
    marginTop: "0.5em",
  },
}));
export default useStyles;