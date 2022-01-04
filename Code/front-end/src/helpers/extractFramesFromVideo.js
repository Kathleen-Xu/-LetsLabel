export default async function ExtractFramesFromVideo(videoSource, interval = 1 / 30) {
  return new Promise(async (resolve) => {
    let videoBlob;

    // 如果视频源是视频文件对象，直接赋值
    if (typeof videoSource === "object") {
      videoBlob = videoSource
    } else {
      // 如果是url路径，要先完全下载（无缓冲）
      videoBlob = await fetch(videoSource).then(r => r.blob());
    }

    const videoObjectUrl = URL.createObjectURL(videoBlob);
    const video = document.createElement("video");

    let seekResolve;
    video.addEventListener('seeked', async function() {
      // 音视频移动/跳跃到新的位置，并寻址完成后执行此函数
      if (seekResolve) seekResolve();
    });

    // 当前帧的数据可用时执行
    video.addEventListener('loadeddata', async function() {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      // 画布宽高为视频原始宽高(考虑要不要做成配置项)
      const [w, h] = [video.videoWidth, video.videoHeight]
      canvas.width = w;
      canvas.height = h;

      // base64格式与blob对象格式的帧数组
      const base64Frames = [],
        blobFrames = [];

      let currentTime = 0;
      const duration = video.duration;

      while (currentTime < duration) {
        video.currentTime = currentTime;
        // 设置完时间点后等待寻址完成
        await new Promise(r => seekResolve = r);

        context.drawImage(video, 0, 0, w, h);
        let base64ImageData = canvas.toDataURL();
        base64Frames.push(base64ImageData);

        canvas.toBlob((blob) => {
          blobFrames.push(blob)
        })

        // 提取画面的时间步进（间隔）
        currentTime += interval;
      }
      resolve({
        base64Frames, // base64格式的字符串数组
        blobFrames, // blob对象格式的文件对象数组
        duration // 视频总时长
      });
    });

    // 在设置视频路径前先注册好监听事件，防止资源加载太快，事件发生在注册监听之前
    video.src = videoObjectUrl;
  });
}