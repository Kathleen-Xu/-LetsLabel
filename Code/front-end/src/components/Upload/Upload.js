import React, { useState, Fragment } from "react";
import { Form, Upload, Modal } from "antd";
import {PlusOutlined} from "@ant-design/icons";

import qiniu from 'qiniu';

qiniu.conf.ACCESS_KEY = "ieRt9BMS-S8m8Fh0SmpLy9TFiTYdhEQisAungyBf";
qiniu.conf.SECRET_KEY = "oR9TWDPC1XKbZ90nnkjSlbBqrASsn8K3MMdVyuVk";
// 七牛那边的对应的bucket名称
const bucket = "xklfire";
// 七牛默认的上传地址(即为post接口)
const QINIU_SERVER = "http://upload.qiniup.com";
// bucket绑定的URL
const BASE_QINIU_URL = "r51ahdes2.hd-bkt.clouddn.com";
const FormItem = Form.Item;

function ImgUpload(props) {
  //const { getFieldDecorator } = props.form;
  // 用来预览弹出预览图片的Modal框框
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  // 存储七牛返回的token值
  const [token, setToken] = useState("");
  // 存取上传七牛返回的值
  const [fileList, setFileList] = useState([]);

  const getToken = () => {
    const putPolicy = new qiniu.rs.PutPolicy({
      scope: bucket
    })
    return putPolicy.uploadToken();
  }

  // antd form表单的一个排版设计
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  };
  // 预览
  const handlePreview = file => {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewVisible(true);
  };
  const handleChange = ({ file, fileList }) => {
    const { uid, name, type, thumbUrl, status, response = {} } = file;
    const fileItem = {
      uid,
      name,
      type,
      thumbUrl,
      status,
      url: BASE_QINIU_URL + (response.hash || "")
    };
    fileList.pop();
    fileList.push(fileItem);
    // 这里必须要用展开运算符，否则会有error，具体可以参考antd文档
    setFileList([...fileList]);
  };
  const handleCancel = () => {

  };
  const getUploadToken = () => {
    const token = getToken();
    setToken(token);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">上传</div>
    </div>
  );
  return (
    <Fragment>
      <Form>
        123
        <FormItem label="上传文件 " {...formItemLayout}>
{/*          {getFieldDecorator("scwj", {
            rules: [
              {
                required: false
              }
            ]
          })(*/}
              <Upload
                action={QINIU_SERVER}
                data={{ token }}
                listType="picture-card"
                beforeUpload={getUploadToken}
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
          {/*)}*/}
        </FormItem>
      </Form>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img style={{ width: "100%" }} src={previewImage} alt="previewImg" />
      </Modal>
    </Fragment>
  );
}

export default ImgUpload;