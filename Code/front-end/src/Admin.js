import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// layouts
import Square from "./layouts/square/square.js";
import Post from "./layouts/post/post.js";
import Submit from "./layouts/submit/submit.js";

// components
import Navbar from "./components/Navbar/navbar";

// axios
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
const server = "http://127.0.0.1:8000";

function Admin() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Square />} />
          <Route path="/post" element={<Post />} />
          <Route path="/submit" element={<Submit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Admin;
