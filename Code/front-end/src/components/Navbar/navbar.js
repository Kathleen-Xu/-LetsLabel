import React from "react";
import { useNavigate } from "react-router-dom";
import cookie from "react-cookies";

// @material-ui/core components
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Poppers from "@material-ui/core/Popper";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import CustomizedSnackbars from "../Alert/Alert";

import AccountCircle from '@material-ui/icons/AccountCircle';

import useStyles from "./styles";

import axios from "axios";
import ButtonGroup from "antd/es/button/button-group";
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
// const server = "http://baicao.zjuers.com:6636"
const server = "http://127.0.0.1:8000";

const Navbar = () => {
  const classes = useStyles(); 
  const navigate = useNavigate();
  const [op, setOp] = React.useState("login");
  const [account, setAccount] = React.useState({
    email: cookie.load("username") ? cookie.load("account") : "",
    username: cookie.load("username") ? cookie.load("username") : "",
  });
  const [openProfile, setOpenProfile] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [remember, setRemember] = React.useState(cookie.load("remember"));
  const initialFormState = {
    email: cookie.load("account") ? cookie.load("account") : "",
    password:
      remember && cookie.load("password") ? cookie.load("password") : "",
    username: "",
    email_check: "",
    password_check: "",
    username_check: "",
  };
  const [snackbar, setSnackbar] = React.useState({
    logDone: false,
    regDone: false,
    logOut: false,
  });
  function closeSnackbar(name) {
    setSnackbar({ ...snackbar, [name]: false });
  }
  const [formData, setFormData] = React.useState(initialFormState);
  const handleClickButton = (event) => {
    if (account.email === "") {
      handleClickDialog();
    } else {
      handleClickProfile(event);
    }
  };
  const handleClickProfile = (event) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(false);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(false);
  };
  const handleClickDialog = () => {
    setOpenDialog(true);
    setOp("login");
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData(initialFormState);
  };
  const handleInputChange = (event) => {
    let { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleLogout = () => {
    handleCloseProfile();
    cookie.remove("username", { path: "/" });
    setSnackbar({ ...snackbar, logOut: true });
    setAccount({ ...account, email: "", username: "" });
  };
  const handleSubmitLogin = () => {
    let ec = "";
    let pc = "";
    if (formData.email === "") {
      ec = "邮箱不能为空。";
    } else if (
      !/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(
        formData.email
      )
    ) {
      ec = "邮箱格式错误。";
    }
    if (formData.password === "") {
      pc = "密码不能为空。";
    }
    setFormData({ ...formData, email_check: ec, password_check: pc });
    //初步验证完成，连接后端，尝试登录
    if (ec === "" && pc === "") {
      login();
    }
  };
  async function login() {
    let ec = "";
    let pc = "";
    let data = {
      Password: formData.password,
      Email: formData.email,
    };
    let res = await axios.post(`${server}/login/`, data);
    if (res.data === "密码正确") {
      let name = await axios.post(`${server}/getusername/`, data);
      setAccount({ email: formData.email, username: name.data });
      handleCloseDialog();
      setSnackbar({ ...snackbar, logDone: true });
      cookie.save("account", formData.email, { path: "/" });
      cookie.save("username", name.data, { path: "/" });
      if (remember) {
        cookie.save("password", formData.password, { path: "/" });
      } else {
        cookie.remove("password", { path: "/" });
      }
    } else {
      if (res.data === "密码错误") {
        pc = "密码错误。";
      } else {
        ec = "该邮箱未注册。";
      }
      setFormData({
        ...formData,
        email_check: ec,
        password_check: pc,
      });
    }
  }
  const handleSubmitRegister = () => {
    let ec = "正确。";
    let uc = "正确。";
    let pc = "正确。";
    if (formData.email === "") {
      ec = "邮箱不能为空。";
    } else if (
      !/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(
        formData.email
      )
    ) {
      ec = "邮箱格式错误。";
    }
    if (formData.username === "") {
      uc = "用户名不能为空。";
    } else if (
      !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(formData.username)
    ) {
      uc = "用户名格式错误。";
    }
    if (formData.password === "") {
      pc = "密码不能为空。";
    } else if (
      !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(formData.password)
    ) {
      pc = "密码格式错误。";
    }
    setFormData({
      ...formData,
      email_check: ec,
      password_check: pc,
      username_check: uc,
    });
    //初步验证完成，连接后端，尝试注册
    if (ec === "正确。" && pc === "正确。" && uc === "正确。") {
      register();
    }
  };
  async function register() {
    let ec = "";
    let data = {
      Name: formData.username,
      Password: formData.password,
      Email: formData.email,
    };
    console.log(data);
    let res = await axios.post(`${server}/register/`, data);
    if (res.data === "注册成功！") {
      setSnackbar({ ...snackbar, regDone: true });
      handleToLogin();
    } else {
      ec = "该邮箱已被注册。";
      setFormData({
        ...formData,
        email_check: ec,
      });
    }
  }
  const handleRemember = (e) => {
    let tmp = e.target.checked;
    setRemember(tmp);
    cookie.save("remember", tmp, { path: "/" });
    if (!tmp && cookie.load("password")) {
      cookie.remove("password", { path: "/" });
    }
  };
  const handleToLogin = () => {
    setFormData(initialFormState);
    setOp("login");
  };
  const handleToRegister = () => {
    setFormData(initialFormState);
    setFormData({ ...formData, email: "", password: "" });
    setOp("register");
  };
  return (
    <AppBar position="static" className={classes.navbar}>
      <div className={classes.mainDiv}>
        <Typography className={classes.title} variant="h6" noWrap>
          LetsLabel
        </Typography>
        <ButtonGroup variant="text" color="secondary" aria-label="text primary button group">
          <Button
            className={classes.button}
            onClick={() => { navigate("/"); }}
          >
            任务广场
          </Button>
          <Button
            className={classes.button}
            onClick={() => { navigate("/post"); }}>
            我发布的
          </Button>
          <Button
            className={classes.button}
            onClick={() => { navigate("/submit"); }}>
            我领取的
          </Button>
        </ButtonGroup>
      </div>
      <div>
        <Button
          variant="text"
          startIcon={<AccountCircle />}
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickButton}
          className={classes.button}
        >
          {account.email === "" ? "登录" : account.username}
        </Button>
        {account.email && (
          <Poppers
            open={openProfile}
            anchorEl={openProfile}
            transition
            disablePortal
            className={classes.poppers}
          >
            {({ TransitionProps }) => (
              <Grow
                {...TransitionProps}
                id="profile-menu-list-grow"
                style={{ transformOrigin: "center top" }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleCloseProfile}>  
                    <MenuList role="menu">
                      <MenuItem
                        onClick={handleLogout}
                      >
                        登出
                      </MenuItem>
                    </MenuList>          
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Poppers>
        )}
      </div>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
      >
        {op === "login" && (
          <div>
            <DialogTitle id="form-dialog-title" className={classes.form_head}>
              <Typography component="h1" variant="h5">
                登录
              </Typography>
            </DialogTitle>
            <DialogContent className={classes.form_content}>
              <TextField
                error={formData.email_check !== ""}
                color="secondary"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="邮箱"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                helperText={formData.email_check}
                onChange={handleInputChange}
              />
              <TextField
                error={formData.password_check !== ""}
                color="secondary"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="密码"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                helperText={formData.password_check}
                onChange={handleInputChange}
              />
              <FormControlLabel
                control={
                  <Checkbox 
                    name="remember" 
                    color="secondary"
                    checked={remember}
                    onChange={handleRemember} 
                    />
                  }
                label="记住密码"
              />
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.form_button}
                onClick={handleSubmitLogin}
              >
                确定
              </Button>
              <Grid container className={classes.form_option}>
                <Grid item>
                  <Link onClick={handleToRegister}  color="secondary" variant="body2">
                    注册账号
                  </Link>
                </Grid>
              </Grid>
            </DialogContent>
          </div>
        )}
        {op === "register" && (
          <div>
            <DialogTitle id="form-dialog-title" className={classes.form_head}>
              <Typography component="h1" variant="h5">
                注册
              </Typography>
            </DialogTitle>
            <DialogContent className={classes.form_content}>
              <TextField
                error={
                  formData.email_check !== "" &&
                  formData.email_check !== "正确。"
                }
                color="secondary"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="邮箱"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                helperText={formData.email_check}
                onChange={handleInputChange}
              />
              <TextField
                error={
                  formData.username_check !== "" &&
                  formData.username_check !== "正确。"
                }
                color="secondary"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="用户名"
                name="username"
                autoComplete="username"
                value={formData.username}
                helperText={formData.username_check}
                onChange={handleInputChange}
              />
              <TextField
                error={
                  formData.password_check !== "" &&
                  formData.password_check !== "正确。"
                }
                color="secondary"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="密码"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                helperText={
                  formData.password_check === "正确。"
                    ? "正确。"
                    : formData.password_check +
                      "密码必须包含6~20个字符，有且仅由数字与字母构成。"
                }
                onChange={handleInputChange}
              />
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.form_button}
                onClick={handleSubmitRegister}
              >
                确定
              </Button>
              <Grid container className={classes.form_option}>
                <Grid item>
                  <Link onClick={handleToLogin} color="secondary" variant="body2">
                    已有账号？登录
                  </Link>
                </Grid>
              </Grid>
            </DialogContent>
          </div>
        )}
      </Dialog>
      <CustomizedSnackbars
        name="logDone"
        message="登录成功。"
        type="success"
        open={snackbar.logDone}
        close={closeSnackbar}
      />
      <CustomizedSnackbars
        name="logOut"
        message="登出成功。"
        type="success"
        open={snackbar.logOut}
        close={closeSnackbar}
      />
      <CustomizedSnackbars
        name="regDone"
        message="账号注册成功！请进行登录。"
        type="success"
        open={snackbar.regDone}
        close={closeSnackbar}
      />
    </AppBar>
  );
}

export default Navbar;