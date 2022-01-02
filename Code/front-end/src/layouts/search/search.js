import React from "react";
import useStyles from "./styles";
import axios from "axios";
import {useNavigate} from "react-router-dom";

axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
// const server = "http://baicao.zjuers.com:6636"

const Search = () => {
  const navigate = useNavigate();



  return (
    <div>
      search
    </div>
  );
}

export default Search;