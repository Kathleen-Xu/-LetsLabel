import React from "react";
import {useNavigate} from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';

import TaskCard from "../../components/TaskCard/TaskCard";
import useStyles from "./styles";

import axios from "axios";
import cookie from "react-cookies";
import {saveJSON, saveXML} from "../../helpers/downloadFile";
import DialogTitle from "@material-ui/core/DialogTitle";
import {DialogContent, FormControl, FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
const server = "http://127.0.0.1:8000";

const Submit = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [list, setList] = React.useState([]);
  const [exportTask, setExportTask] = React.useState({});
  const [openDialog2, setOpenDialog2] = React.useState(false);
  const [exportType, setExportType] = React.useState("coco");
  const toLabel = (task) => () => {
    navigate("/label/", {state: {task: task}});
  }
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
  const handleCloseDialog2 = () => {
    setExportTask({});
    setExportType("coco");
    setOpenDialog2(false);
  }
  const handleValueChange2 = (event) => {
    setExportType(event.target.value);
  };
  const toCheck = (task) => () => {}
  async function fetch() {
    if (cookie.load("username")) {
      let data = {
        Email: cookie.load("account"),
        Type: "all",
        Role: "submitter",
      };
      let res = await axios.post(`${server}/fetch/`, data);
      console.log(res.data);
      setList(res.data);
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
          我提交的
        </Typography>
      </div>
      <Divider
        variant="middle"
        orientation="horizontal"
        className={classes.divider}
      />
      {list.map((current, index) => (
        <TaskCard
          info={current}
          labelFuc={toLabel(current)}
          exprotFuc={toExport(current)}
          check={false}
          checkFuc={toCheck(current)}
        />))}
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

export default Submit;