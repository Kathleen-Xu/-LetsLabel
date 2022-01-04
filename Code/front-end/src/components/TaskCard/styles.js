import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "10px 0",
  },
  realSummary: {
    flexWrap: "wrap",
    display: "flex",
    flexGrow: "1",
  },
  row: {
    display: "flex",
    width: '100%',
    alignItems: "center",
  },
  divider: {
    width: "90%",
    margin: "10px 8% 10px 0",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    padding: "6px 8px",
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    padding: "6px 8px",
  },
  icon: {
    margin: "0px 20px",
  },
  details: {
    alignItems: 'center',
    padding: "8px 8% 16px",
  },
  column: {
    flexBasis: '28%',
  },
  columnEdge: {
    flexBasis: '8%',
    alignSelf: "center",
  },
}));
export default useStyles;