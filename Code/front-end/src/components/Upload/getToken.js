import qiniu from 'qiniu';

qiniu.conf.ACCESS_KEY = "ieRt9BMS-S8m8Fh0SmpLy9TFiTYdhEQisAungyBf";
qiniu.conf.SECRET_KEY = "oR9TWDPC1XKbZ90nnkjSlbBqrASsn8K3MMdVyuVk";
// 七牛那边的对应的bucket名称
const bucket = "xklfire";

export const getToken = () => {
  const putPolicy = new qiniu.rs.PutPolicy({
    scope: bucket
  })
  return putPolicy.uploadToken();
}