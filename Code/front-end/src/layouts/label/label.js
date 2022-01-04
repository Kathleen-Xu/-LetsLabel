import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import useStyles from "./styles";
import axios from "axios";
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Divider from "@material-ui/core/Divider";
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";

import ReactImageAnnotate from "react-image-annotate";
import Button from "@material-ui/core/Button";
import cookie from "react-cookies";
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
const server = "http://127.0.0.1:8000";

const tryUrl = "https://res.cloudinary.com/xklfire/image/upload/v1641066155/kqtcbazhfoxpwllx8ye2.jpg";
const Label = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const task = location.state.task;
  const images = task.Img.map((current) => ({
    id: current.UID,
    src: current.Url,
    name: current.Name,
    regions: [],
  }))
  const [formData, setFormData] = React.useState({
    cls: "",
    tag: "",
  });
  const [clsList, setClsList] = React.useState(cookie.load("class") ? cookie.load("class") : []);
  const [tagList, setTagList] = React.useState(cookie.load("tag") ? cookie.load("tag") : []);
  const [selectedImage, setSelectedImage] = React.useState(0)
  const [start, changeStart] = React.useState(false);
  const [result, setResult] = React.useState([]);
  const [state, setState] = React.useState(false);
  const save = (data) => {
    setState(true);
    setResult(data.images);
    console.log(data.images);
  }
  const handleNext = ()=>{
    if ( selectedImage === images.length-1)
      return
    setSelectedImage(selectedImage + 1)
  }
  const handlePrev = ()=>{
    if (selectedImage === 0)
      return
    setSelectedImage(selectedImage - 1)
  }
  const handleInputChange = (e) => {
    let {name, value} = e.target;
    setFormData({...formData, [name]: value,});
  }
  function addCls() {
    setClsList([...clsList, formData.cls]);
    setFormData({...formData, cls: ""});
  }
  const dltCls = (i) => () => {
    setClsList(clsList.filter((current, index) => index !== i));
  };
  function addTag() {
    setTagList([...tagList, formData.tag]);
    setFormData({...formData, tag: ""});
  }
  const dltTag = (i) => () => {
    setTagList(tagList.filter((current, index) => index !== i));
  };
  function refresh() {
    cookie.save("class", clsList, {
      path: "/label",
    })
    cookie.save("tag", tagList, {
      path: "/label",
    })
    changeStart(true);
    setState(false);
  }
  async function submit() {
    if (!state) {
      alert("你的标注结果尚未保存。");
      return;
    }
    let done = result.every((current) => (current.regions.length !== 0));
    if (!done) {
      alert("你有图片没有标注。");
      return;
    }
    let data = {
      Email: "3190103367@zju.edu.cn",
      TaskId: task.UID,
      ImageList: result.map((current) => ({
        UID: current.id,
        Weight: current.pixelSize.w,
        Height: current.pixelSize.h,
        Annotation: current.regions.map((item) => {
          let cls = item.cls !== undefined ? item.cls : "";
          let tags = item.tags !== undefined ? item.tags.join("-") : "";
          return ({
            Name: cls + "/" + tags,
            Xmin: item.x * current.pixelSize.w,
            Ymin: item.y * current.pixelSize.h,
            Xmax: (item.x + item.w) * current.pixelSize.w,
            Ymax: (item.y + item.h) * current.pixelSize.h,
          })}),
        })),
    };
    let res = await axios.post(`${server}/submit/`, data);
    if (res.data === "提交成功") {
      alert("提交成功");
      navigate("/submit");
      setState(false);
    }
  }
  return (
    <div className={classes.root}>
      <div>
        <Typography
          variant="h6"
          className={classes.title}
        >
          标注界面
        </Typography>
      </div>
      { !start &&
        <Card className={classes.card} variant="outlined" visibility={!start}>
          <div className={classes.subCard}>
            <div className={classes.add}>
              <Chip
                variant="outlined"
                label="Class"
                className={classes.chip}
              />
              <TextField
                required
                variant="outlined"
                size="small"
                name="cls"
                value={formData.cls}
                onChange={handleInputChange}
                className={classes.input}
              />
              <Chip
                label="添加"
                onClick={addCls}
                clickable
              />
            </div>
            {clsList.map((current, index) => {
              return (
                <Chip
                  key={index}
                  variant="outlined"
                  color="secondary"
                  onDelete={dltCls(index)}
                  avatar={<Avatar>{index + 1}</Avatar>}
                  label={current}
                  className={classes.chip}
                />
              );
            })}
          </div>
          <Divider
            variant="middle"
            orientation="vertical"
            className={classes.divider_v2}
          />
          <div className={classes.subCard}>
            <div className={classes.add}>
              <Chip
                variant="outlined"
                label="Tag"
                className={classes.chip}
              />
              <TextField
                variant="outlined"
                size="small"
                color="secondary"
                name="tag"
                value={formData.tag}
                onChange={handleInputChange}
                className={classes.input}
              />
              <Chip
                label="添加"
                onClick={addTag}
                clickable
              />
            </div>
            {tagList.map((current, index) => {
              return (
                <Chip
                  key={index}
                  variant="outlined"
                  color="secondary"
                  onDelete={dltTag(index)}
                  avatar={<Avatar>{index + 1}</Avatar>}
                  label={current}
                  className={classes.chip}
                />
              );
            })}
          </div>
        </Card>
      }
      <Card variant="outlined" className={classes.card} >
        <Button color="secondary" onClick={ start ? submit: refresh} fullWidth>
          {start ? "确定提交":"开始标注"}
          </Button>
      </Card>
      {start &&
        <Card variant="outlined" className={classes.board}>
          <ReactImageAnnotate
            labelImages
            regionClsList={clsList}
            regionTagList={tagList}
            images={images}
            selectedImage={selectedImage}
            enabledTools="create-box"
            onNextImage={handleNext}
            onPrevImage={handlePrev}
            onExit={save}
            hideClone
            hideSettings
            showTags={false}
          />
        </Card>
      }
    </div>
  );
}

export default Label;

/*let data = {
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
    };*/