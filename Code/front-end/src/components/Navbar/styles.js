import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() => ({
  navbar: {
    display: "flex",
    flexDirection: "row",
    padding: "10px 10px",
  },
  mainDiv: {
    flex: "1",
    display: "flex",
    flexDirection: "row",
    margin: "0 5px",
  },
  title: {
    margin: "3px 80px 0 40px",
  },
  button: {
    fontSize: "0.925em",
    fontWeight: "600",
    marginLeft: "16px",
    marginRight: "16px",
  },
  poppers: {
    margin: "2px",
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
  form_email: {
    display: "flex",  
  },
  form_email_input: {
    width: "75%"
  },
  form_email_button: {
    width: "25%",
    height: "56px",
    margin: "16px 0 8px 5px",
  },
  form_option: {
    marginTop: "0.5em",
    justifyContent: "right",
  },
}));
export default useStyles;