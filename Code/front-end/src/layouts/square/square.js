import React, { useEffect, useState } from "react";

import Typography from "@material-ui/core/Typography";
import { Divider } from '@material-ui/core';

import useStyles from "./styles";

import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
const server = "http://127.0.0.1:8000";

const Square = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <Typography
          variant="h6"
          className={classes.title}
        >
          任务广场
        </Typography>
      </div>
      <Divider
        variant="middle"
        orientation="horizontal"
        className={classes.divider}
      />
    </div>
  );
}

export default Square;