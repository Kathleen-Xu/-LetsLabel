import request from "superagent";
import Dropzone from "react-dropzone";
import React from "react";

const CLOUDINARY_UPLOAD_PRESET = 'zerxsi3i';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/xklfire/upload';

function Upload() {
  const [url, setUrl] = React.useState();
  const [fileList, setFileList] = React.useState([]);
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
  return (
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
  );
}
