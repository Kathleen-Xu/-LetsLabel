import React from "react";
import {useNavigate} from "react-router-dom";
import useStyles from "./styles";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";

import DialogTitle from "@material-ui/core/DialogTitle";
import {ThemeProvider, DialogContent, FormControl, FormControlLabel, RadioGroup, Radio, Card, TextField} from "@material-ui/core";

import TaskCard from "../../components/TaskCard/TaskCard";
import ExtractFramesFromVideo from  "../../helpers/extractFramesFromVideo";

import axios from "axios";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import {theme} from "../../styles";
import {useDropzone} from "react-dropzone";
import request from "superagent";
import cookie from "react-cookies";
import {saveJSON, saveXML} from "../../helpers/downloadFile";
import blobToFile, {base64ToFile} from "../../helpers/base64ToFile";
import doUpload from "../../helpers/doUpload";
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
const server = "http://127.0.0.1:8000";

const CLOUDINARY_UPLOAD_PRESET = 'zerxsi3i';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/xklfire/upload';
const tryUrl = "https://res.cloudinary.com/xklfire/image/upload/v1641066155/kqtcbazhfoxpwllx8ye2.jpg";

const Post = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [newIng, setNewIng] = React.useState(false);
  const [type, setType] = React.useState("image");
  const [rawImgList, setRawImgList] = React.useState([]);
  const [imgList, setImgList] = React.useState([]);
  const [list, setList] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [value, setValue] = React.useState("good");
  const [checkId, setCheckId] = React.useState("");
  const [formData, setFormData] = React.useState({
    name: "",
  });
  const [leftImg, setLeftImg] = React.useState([]);
  const [rightImg, setRightImg] = React.useState([]);
  const [preData, setPreData] = React.useState([]);
  const [tip, setTip] = React.useState("");
  const [exportTask, setExportTask] = React.useState({});
  const [openDialog2, setOpenDialog2] = React.useState(false);
  const [exportType, setExportType] = React.useState("coco");
  const acceptImage = (acceptedFiles) => {
    let list = [... rawImgList, ...acceptedFiles];
    setRawImgList(list);
    setRightImg(list.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file),
    })));
  };
  const acceptVideo = async (acceptedFiles) => {
    //let frames = await ExtractFramesFromVideo(acceptedFiles[0].path);
    //console.log(frames);
    setTip("视频帧提取中...");
    let overAll = [];
    let count = 0;
    acceptedFiles.forEach((current, i) => {
      ExtractFramesFromVideo(current, 10).then(async (data) => {
        console.log(data);
        //const box = document.getElementById("imgBox")
        console.log(data.base64Frames.length);
        let tmp = [];
        let pr = new Promise(function (resolve, reject) {
          let n = 0;
          for (let x = 0; x < data.base64Frames.length; x++) {
            console.log(x);
            base64ToFile(data.base64Frames[x], current.name + "_" + x + ".jpg").then(function (res) {
              tmp = [...tmp, res];
              if (++n === data.base64Frames.length) {
                resolve(tmp);
                //console.log(tmp);
              }
            });
          }
        }).then(function (t) {
          console.log(t);
          overAll = [...overAll, ...tmp];
          count++;
          if (count === acceptedFiles.length) {
            setRawImgList(overAll);
            setRightImg(overAll.map(file => Object.assign(file, {
              preview: URL.createObjectURL(file),
            })));
            alert("视频帧提取完成。");
            setTip("");
          }
        })
      })
    })
  };
  const {getRootProps, getInputProps} = useDropzone({
    accept: type === "image" ? 'image/*' : '.mp4',
    onDrop: type === "image" ? acceptImage : acceptVideo,
  });
  const pick = (i) => () => {
    let list = [...imgList, rawImgList[i]];
    setImgList(list);
    setLeftImg(list.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file),
    })));
  }
  const thumbs = rightImg.map((file, index) => (
    <div className={classes.thumb} key={file.name}>
      <div
        className={classes.thumbInner}
        onClick={pick(index)}
      >
        <img
          src={file.preview}
          alt={file.name}
          className={classes.imgPreview}
        />
      </div>
    </div>
  ));
  const pickedThumbs = leftImg.map((file, index) => (
    <div className={classes.thumb} key={file.name}>
      <div
        className={classes.thumbInner}
      >
        <img
          src={file.preview}
          alt={file.name}
          className={classes.imgPreview}
        />
      </div>
    </div>
  ));
  React.useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    rightImg.forEach(file => URL.revokeObjectURL(file.preview));
  }, [rightImg]);
  React.useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    leftImg.forEach(file => URL.revokeObjectURL(file.preview));
  }, [leftImg]);
  const handleInputChange = (e) => {
    let {name, value} = e.target;
    setFormData({...formData, [name]: value,});
  }
  function cancel() {
    setNewIng(false);
    setLeftImg([]);
    setRightImg([]);
    setRawImgList([]);
    setImgList([]);
    setFormData({
      name: "",
    });
    setType("image");
    setPreData([]);
  }
  function newTask() {
    if (cookie.load("username")) {
      setNewIng(true);
    } else {
      alert("请先登录");
    }
  }
  function clear() {
    setImgList([]);
    setLeftImg([]);
  }
  const toLabel = (task) => () => {
    console.log(task);
    navigate("/label/", {state: {task: task}});
  };
  const toExport = (task) => () => {
    if (cookie.load("username")) {
      setExportTask(task);
      setOpenDialog2(true);
    } else {
      alert("请先登录");
    }
  }
  function realExport() {
    if (exportType === "coco") {
      saveJSON(exportTask, "Task_"+exportTask.UID);
    } else {
      saveXML(exportTask, "Task_"+exportTask.UID);
    }
    handleCloseDialog2();
  }
  const toCheck = (task) => () => {
    setCheckId(task.UID);
    setOpenDialog(true);
  }
  const handleCloseDialog = () => {
    setCheckId("");
    setValue("good");
    setOpenDialog(false);
  }
  const handleCloseDialog2 = () => {
    setExportTask({});
    setExportType("coco");
    setOpenDialog2(false);
  }
  const handleValueChange = (event) => {
    setValue(event.target.value);
  };
  const handleValueChange2 = (event) => {
    setExportType(event.target.value);
  };
  async function check() {
    if (checkId === "") {
      alert("没有选择任务。");
      return;
    }
    let data = {
      TaskId: checkId,
      Result: value,
    };
    let res = await axios.post(`${server}/check/`, data);
    console.log(res.data);
    fetch();
    handleCloseDialog();
  }
  function post() {
    if (formData.name === "") {
      alert("没有填写任务名称。");
      return;
    }
    if (imgList.length === 0) {
      alert("没有上传并选择图片。");
      return;
    }
    let tmp = [];
    setTip("图片上传至七牛云...");
    let count = 0;
    imgList.forEach((current, index) => {
      let pr = new Promise(function (resolve, reject) {
        doUpload(current).then( (url) => {
          console.log(url);
          tmp = [...tmp, {name: current.name, url: url}];
          count++;
          if (count === imgList.length) {
            resolve(tmp);
          }
        });
      }).then(function (t) {
        console.log(t);
        realPost(t);
      });
    });
      /*request.post(CLOUDINARY_UPLOAD_URL)
        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
        .field('file', current).end((err, response) => {
          if (err) {
            console.error(err);
          }
          console.log(response.body);
          if (response.body.secure_url !== '') {
            tmp = [...tmp, {name: current.name, url: response.body.secure_url}];
            console.log(tmp);
            console.log(index);
            console.log(imgList.length);
            count++;
            if (count === imgList.length) {
              console.log(tmp);
              realPost(tmp);
            }
          }
      });*/
  }
  async function realPost(tmp) {
    let data = {
      Name: formData.name,
      Email: cookie.load("account"),
      ImageList: tmp.map((current) => ({
        Name: current.name,
        Url: current.url,
      }))
    };
    setTip("任务发布中...");
    console.log(data);
    let res = await axios.post(`${server}/post/`, data);
    if (res.data === "发布成功") {
      alert("发布成功");
      setTip("");
      fetch();
      cancel();
    }
  }
  async function fetch() {
    if (cookie.load("username")) {
      let data = {
        Email: cookie.load("account"),
        Type: "all",
        Role: "poster",
      };
      let res = await axios.post(`${server}/fetch/`, data);
      console.log(res.data);
      setList(res.data)
    } else {
      alert("请先登录");
    }
  }
  React.useEffect(() => {
    fetch();
  }, []);
  return (
    <div className={classes.root}>
      <div>
        <Typography
          variant="h6"
          className={classes.title}
        >
          我发布的
        </Typography>
      </div>
      <Divider
        variant="middle"
        orientation="horizontal"
        className={classes.divider}
      />
      <Card className={classes.card} variant="outlined">
        <Button color="secondary" onClick={ tip === "" ? (newIng ? cancel: newTask) : ()=>{}} fullWidth>
          { tip === "" ? (newIng ? "取消任务" : "新建任务" ) : tip}
        </Button>
      </Card>
      { newIng &&
        <Card className={classes.card} variant="outlined">
          <div className={classes.subCard}>
            <div className={classes.head}>
              <Typography
                variant="h6"
                className={classes.subTitle}
              >
                任务
              </Typography>
              <Divider
                variant="fullWidth"
                orientation="horizontal"
                className={classes.divider}
              />
            </div>
            <div className={classes.subHead}>
              <Chip
                variant="outlined"
                label="任务名称"
                className={classes.chip}
              />
              <TextField
                required
                variant="outlined"
                size="small"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={classes.input}
              />
            </div>
            <section className={classes.box}>
              <aside className={classes.thumbsContainer}>
                {pickedThumbs}
              </aside>
            </section>
            {
              tip === ""
            }
            <div className={classes.buttonChip}>
              <Chip
                variant="outlined"
                label="重置"
                onClick={clear}
                clickable
                className={classes.chip}
              />
              <Chip
                variant="outlined"
                label="发布任务"
                onClick={post}
                clickable
                className={classes.chip}
              />
            </div>
          </div>
          <Divider
            variant="middle"
            orientation="vertical"
            className={classes.divider_v2}
          />
          <div className={classes.subCard}>
            <div className={classes.head}>
              <Typography
                variant="h6"
                className={classes.subTitle}
              >
                上传
              </Typography>
              <Divider
                variant="fullWidth"
                orientation="horizontal"
                className={classes.divider}
              />
            </div>
            <div className={classes.subHead}>
              <Chip
                variant="outlined"
                label="上传图片"
                onClick={() => {setType("image");}}
                clickable
                className={classes.chip}
              />
              <Chip
                variant="outlined"
                label="上传视频"
                onClick={() => {setType("video");}}
                clickable
                className={classes.chip}
              />
            </div>
            <section className={classes.box}>
              <div {...getRootProps({className: classes.dropzone})}>
                <input {...getInputProps()} />
                <p>将{type==="image" ? "图片" : "视频"}拖动至此，或点击选择{type==="image" ? "图片" : "视频"}</p>
              </div>
              <aside className={classes.thumbsContainer}>
                {thumbs}
              </aside>
            </section>
          </div>
        </Card>
      }
      {list.map((current, index) => (
        <TaskCard
          info={current}
          labelFuc={toLabel(current)}
          exprotFuc={toExport(current)}
          check={true}
          checkFuc={toCheck(current)}
        />))}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className={classes.form_head}>
          <Typography component="h1" variant="h5">
            复核
          </Typography>
        </DialogTitle>
        <DialogContent className={classes.form_content}>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="position"
              name="position"
              value={value}
              onChange={handleValueChange}
            >
              <FormControlLabel
                value="good"
                control={<Radio color="primary" />}
                label="通过"
                labelPlacement="start"
              />
              <FormControlLabel
                value="bad"
                control={<Radio color="primary" />}
                label="不通过"
                labelPlacement="start"
              />
            </RadioGroup>
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.form_button}
            onClick={handleCloseDialog}
          >
            取消
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.form_button}
            onClick={check}
          >
            确定
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openDialog2}
        onClose={handleCloseDialog2}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className={classes.form_head}>
          <Typography component="h1" variant="h5">
            选择格式
          </Typography>
        </DialogTitle>
        <DialogContent className={classes.form_content}>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="position"
              name="position"
              value={exportType}
              onChange={handleValueChange2}
            >
              <FormControlLabel
                value="coco"
                control={<Radio color="primary" />}
                label="COCO"
                labelPlacement="start"
              />
              <FormControlLabel
                value="voc"
                control={<Radio color="primary" />}
                label="VOC"
                labelPlacement="start"
              />
            </RadioGroup>
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.form_button}
            onClick={handleCloseDialog2}
          >
            取消
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.form_button}
            onClick={realExport}
          >
            确定
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Post;