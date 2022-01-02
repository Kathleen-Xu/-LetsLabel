import React from "react";
import useStyles from "./styles";
import {useNavigate} from "react-router-dom";


const Detail = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      detail
    </div>
  );
}

export default Detail;