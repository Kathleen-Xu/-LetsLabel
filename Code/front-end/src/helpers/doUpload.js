import * as qiniu from 'qiniu-js';
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
const server = "http://127.0.0.1:8000";
export default async function doUpload(file) {
  return new Promise(async (resolve) => {
    let key=file.name;
    let data = {
      Name: file.name,
    };
    let res = await axios.post(`${server}/gettoken/`, data);
    let token = res.data.token;
    console.log(token);
    function complete(res) {
      console.log(res);
      let url = "http://r51ahdes2.hd-bkt.clouddn.com/"+res.key;
      console.log(url);
      resolve(url);
    }
    function next(res) {}
    function error(err) {
      console.log(err);
    }
    console.log(token);
    let observable = qiniu.upload(
      file,
      key,
      token,
      { fname: key, params: {}, mimeType: null }, //putExtra
      { useCdnDomain: true } //config
    );

    //开始上传
    observable.subscribe(next, error, complete);
  });
}
