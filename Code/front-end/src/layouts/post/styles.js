import { makeStyles } from '@material-ui/core/styles';
import {createTheme} from "@material-ui/core";

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
  divider_v2: {
    height: "auto",
    margin: "0",
  },
  card: {
    width: "100%",
    display: "flex",
    margin: "10px 0 0",
    flexDirection: "row",
  },
  subCard:{
    width: "50%",
    padding: "5px 20px",
    display: "flex",
    flexDirection: "column",
  },
  head: {
    margin: "5px 20px",
  },
  subTitle: {
    width: "100%",
    margin: "0 0 5px 20px",
    fontWeight: "600",
    fontFamily: "Noto Sans SC, sans-serif",
  },
  subHead: {
    margin: "0 20px",
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
  buttonChip: {
    display: "flex",
    margin: "0 20px",
    justifyContent: "flex-end",
    justifyItems: "flex-end",
  },
  dropzone: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: "2px",
    borderRadius: "2px",
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  },
  thumbsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  },
  thumb: {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  },
  thumbInner: {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  },
  imgPreview: {
    display: 'block',
    width: 'auto',
    height: '100%'
  },
  box: {
    flex: "1",
    margin: "5px 20px",
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