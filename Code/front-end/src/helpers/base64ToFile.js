export default function blobToFile (blob, fileName) {
  return new Promise(function (resolve, reject) {
    fileResizetoFile(blob,0.6,function(res){
      console.log(res);
      let file = new File([res], fileName);
      console.log(file);
      resolve(file);
      //return new File([res], fileName);
      //拿到res，做出你要上传的操作；
    })
  })
}
export function base64ToFile (base64, fileName) {
  return new Promise(function (resolve, reject) {
    fileResizetoFile(base64, 0.6, function (res) {
      console.log(res);
      //blob = res;
      let file = new File([res], fileName);
      console.log(file);
      resolve(file);
      //return new File([res], fileName);
      //拿到res，做出你要上传的操作；
    })
  })
}
/*export function base64ToFile (base64, fileName) {
  let
    arr = base64.split(','),
    type = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, {type});
}*/


function fileResizetoFile(dataurl,quality,fn){
  dataURLtoImage(dataurl,function(image){
    canvasResizetoFile(imagetoCanvas(image),quality,fn);
  })
}
function filetoDataURL(file,fn){
  let reader = new FileReader();
  reader.onloadend = function(e){
    fn(e.target.result);
  };
  reader.readAsDataURL(file);
}

function dataURLtoImage(dataurl,fn){
  let img = new Image();
  img.onload = function() {
    fn(img);
  };
  img.src = dataurl;
}

function canvasResizetoFile(canvas,quality,fn){
  canvas.toBlob(function(blob) {
    fn(blob);
  },'image/jpeg',quality);
}
function imagetoCanvas(image){
  let cvs = document.createElement("canvas");
  let ctx = cvs.getContext('2d');
  cvs.width = image.width;
  cvs.height = image.height;
  ctx.drawImage(image, 0, 0, cvs.width, cvs.height);
  return cvs ;
}