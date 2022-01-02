import React, { useEffect, useState } from "react";

import useStyles from "./styles";

import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
// const server = "http://1.15.97.64:1241/:6636";  
// const server = "http://baicao.zjuers.com:6636"

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      home
    </div>
  );
}

export default Home;