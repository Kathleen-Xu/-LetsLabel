import React from "react";
import useStyles from "./styles";
import {useNavigate} from "react-router-dom";


const Submit = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      submit
    </div>
  );
}

export default Submit;