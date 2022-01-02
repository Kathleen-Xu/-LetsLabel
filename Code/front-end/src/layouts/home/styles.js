import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  img: {
    width: "100%",
  },
  imgBlock: {
    width: "20%",
  },
  searchform: {
    width: "100%",
    justifyContent: "center", 
    alignItems: "center",
    display: "flex",
  },
  wordCloud: {
    margin: "10px 0",
    display: "flex",
    width: "100%",
    justifyContent: "center",
  },
  wordContent: {
    maxWidth: "900px",
    maxHeight: "300px",
  },
}));
export default useStyles;