import React from "react";
import Dropzone from 'react-dropzone';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from "./components/Tab/TabPanel";
import request from "superagent";
// layouts
import Home from "./layouts/home/home.js";
import Search from "./layouts/search/search.js";
import Detail from "./layouts/detail/detail.js";
import User from "./layouts/user/user.js";

import Navbar from "./components/Navbar/navbar";
import ReactImageAnnotate from "react-image-annotate";
// import ImgUpload from "./components/Upload/Upload";

import axios from "axios";
import Button from "@material-ui/core/Button";
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
// const server = "http://baicao.zjuers.com:6636"
const server = "http://127.0.0.1:8000";


const tryUrl = "https://res.cloudinary.com/xklfire/image/upload/v1641066155/kqtcbazhfoxpwllx8ye2.jpg";
const CLOUDINARY_UPLOAD_PRESET = 'zerxsi3i';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/xklfire/upload';

function Admin() {
  const [url, setUrl] = React.useState();
  const [fileList, setFileList] = React.useState([]);
  const getData = (data) => {
    alert("out!");
    let img = data.images;
    let regions = img[0].regions;
    console.log(img);
  }
  function onImageDrop(files) {
    setFileList(files);
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', files[0]);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        setUrl(response.body.secure_url);
      }
    });
  }
  const handleClick = () => {
    alert("123");
    // axios.post(`${server}/good/`, {});
  }
  return (
    <div>
      <Button onClick={handleClick}>button</Button>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </BrowserRouter>
      <Dropzone
        multiple={true}
        accept="image/*"
        onDrop={onImageDrop.bind(this)}>
        {({getRootProps, getInputProps}) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
       <ReactImageAnnotate
          labelImages
          regionClsList={["Alpha", "Beta", "Charlie", "Delta"]}
          regionTagList={["tag1", "tag2", "tag3"]}
          images={[
            {
              src: tryUrl,
              name: "Image 1",
              regions: [],
            },
          {
            src: tryUrl,
            name: "Image 2",
            regions: [],
          },
          ]}
          onExit={getData}
        />
      <img src={tryUrl} alt="try"/>
    </div>
  );
}

export default Admin;
