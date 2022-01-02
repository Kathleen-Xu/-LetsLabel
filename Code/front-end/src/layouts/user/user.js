import React from "react";
import {useNavigate} from "react-router-dom";
import useStyles from "./styles";
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
//const server = "http://baicao.zjuers.com:6636"


const User = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div>
      user
    </div>
  );
}

export default User;