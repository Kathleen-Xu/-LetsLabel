import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
  logo: {
    maxWidth: "120px",
    maxHeight: "90px",
    margin: "-10px 10px 0 0",
  },
  root: {
    margin: "0 0 0 20px",
    display: "flex",
  },
  main: {
    marginLeft: "25px",
  },
  searchForm: {
    width: "800px",
    padding: "12px 0 0 0",
  },
  list: {
    width: "800px",
  },
}));
export default useStyles;