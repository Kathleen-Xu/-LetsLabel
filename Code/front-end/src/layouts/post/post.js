import React from "react";
import {useNavigate} from "react-router-dom";
import useStyles from "./styles";
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
const server = "http://127.0.0.1:8000";

const tryUrl = "https://res.cloudinary.com/xklfire/image/upload/v1641066155/kqtcbazhfoxpwllx8ye2.jpg";

const Post = () => {
  const navigate = useNavigate();
  async function post() {
    let data = {
      Name: "try",
      Email: "3190103367@zju.edu.cn",
      ImageList: [
        {
          Name: "Image1",
          Url: tryUrl,
        },
        {
          Name: "Image2",
          Url: tryUrl,
        },
      ]
    };
    let res = await axios.post(`${server}/post/`, data);
  }
  async function fetch() {
    let data = {
      Email: "3190103367@zju.edu.cn",
      Type: "off",
      Role: "submitter",
    };
    let res = await axios.post(`${server}/fetch/`, data);
    alert("come on!");
    console.log(res.data);
  }
  async function submit() {
    let data = {
      Email: "3190103367@zju.edu.cn",
      TaskId: "98b051ae6d1e4c0c830b06cd9363ff29",
      ImageList: [
        {
          UID: "59c96b0764874214a8cc7b93762e5191",
          Weight: 400,
          Height: 300,
          Annotation: [
            {
              Name: "dog",
              Xmin: 100,
              Ymin: 100,
              Xmax: 150,
              Ymax: 150,
            },
            {
              Name: "cat",
              Xmin: 200,
              Ymin: 200,
              Xmax: 250,
              Ymax: 250,
            },
          ]
        },
        {
          UID: "7e6814fa6c16424793d41c69d7bffe8e",
          Weight: 500,
          Height: 300,
          Annotation: []
        },
      ]
    };
    let res = await axios.post(`${server}/submit/`, data);
    alert("come on!");
    console.log(res.data);
  }
  async function check() {
    let data = {
      TaskId: "98b051ae6d1e4c0c830b06cd9363ff29",
      Result: "good", //"bad" "pending"
    };
    let res = await axios.post(`${server}/check/`, data);
    alert("come on!");
    console.log(res.data);
  }
  return (
    <div>
      <button onClick={post}>
        发布任务
      </button>
      <button onClick={fetch}>
        任务广场
      </button>
      <button onClick={submit}>
        妄图提交
      </button>
      <button onClick={check}>
        虚假批改
      </button>
      post
    </div>
  );
}

export default Post;