import FileSaver from "file-saver";
import xmlbuilder from "xmlbuilder";
import JSZip from "jszip";
export function saveJSON(data, filename) {
  console.log(data);
  let category = data.Img.map((current) => current.Annotation.map((c) => (c.Name)));
  console.log(category);
  for(let i=0; i<category.length; i++){
    for(let j=i+1; j<category.length; j++){
      if(category[i]===category[j]){         //第一个等同于第二个，splice方法删除第二个
        category.splice(j,1);
        j--;
      }
    }
  }
  console.log(category);
  let count = 0;
  let antt = [];
  for (let i = 0; i < data.Img.length; i++) {
    for (let j = 0; j < data.Img[i].Annotation.length; j++) {
      let c = data.Img[i].Annotation[j];
      let tmp = {
        id: count++,
        image_id: i,
        category_id: category.indexOf(c.Name),
        segmentation: [
          c.Xmin, c.Ymin,
          c.Xmax, c.Ymin,
          c.Xmax, c.Ymax,
          c.Xmin, c.Ymax,
        ],
        area: (c.Xmax-c.Xmin)*(c.Ymax-c.Ymin),
        bbox: [
          c.Xmin, c.Ymin, c.Xmax-c.Xmin, c.Ymax-c.Ymin
        ],
        iscrowd: 0,
      }
      antt = [...antt, tmp];
    }
  }
  let jsonObj = {
    info: {
      year: 2022,
      version: 0,
      description: data.Name,
      contributor: data.Submitter,
      date_created: data.PostTime,
    },
    licenses: [
      {
        id: 1,
        name: "Attribution-NonCommercial-ShareAlike License",
        url: "http:\\/\\/creativecommons.org\\/licenses\\/by-nc-sa\\/2.0\\/",
      },
    ],
    images: data.Img.map((current, index) => ({
      id: index,
      width: current.Width,
      height: current.Height,
      filename: current.Name,
      license: 1,
      cloudinary_url: current.Url,
      date_captured: data.PostTime,
    })),
    annotations: antt,
  }
  if (typeof jsonObj === 'object') {
    jsonObj = JSON.stringify(jsonObj, undefined, 4)
  }
  let blob = new Blob([jsonObj], { type: 'text/json' });
  FileSaver.saveAs(blob, filename+".json");
  /*var e = document.createEvent('MouseEvents');
  var a = document.createElement('a');
  a.download = filename;
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
  console.log(a);
  e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  a.dispatchEvent(e);*/
}

export function saveXML(data, filename) {
  if (!data) {
    alert('data is null');
    return;
  }
  if (!filename) {
    filename = 'xml'
  }
  let blobs = data.Img.map((current, index) => {
    let xmlObj = {
      annotation: {
        folder: "images",
        filename: current.Name,
        source: {
          database: "Database",
          annotation: "PASCAL VOC",
          image: "Cloudinary"
        },
        size: {
          width: current.Width,
          height: current.Height,
          depth: 3,
        },
        segmented: 0,
        object: current.Annotation.map((c,i) => ({
          name: c.Name,
          pose: "Unspecified",
          truncated: 0,
          difficult: 0,
          bndbox: {
            xmin: c.Xmin,
            ymin: c.Ymin,
            xmax: c.Xmax,
            ymax: c.Ymax,
          },
        }))
      },
    };
    let xml = xmlbuilder.create(xmlObj, { encoding: 'utf-8' }).end({ pretty: true });
    return new Blob([xml], { type: 'text/xml;charset=utf-8' });
  })
  console.log(blobs)

  let zip = new JSZip();
  let annotations = zip.folder("Annotations");
  blobs.forEach((blob, index) => annotations.file(filename+index+".xml", blob));
  //zip.generateAsync({type: "blob"}).then(content => FileSaver.saveAs(content, filename+".zip"));
  let images = zip.folder("images");
  Promise.resolve().then(() => {
    return data.Img.reduce((accumulator, file) => {
      return accumulator.then(() => fetch(file.Url)
        .then(resp => resp.blob())
        .then(blob => images.file(file.Name, blob)))
    }, Promise.resolve())
  }).then(() => {
    zip.generateAsync({type: "blob"}).then(content => FileSaver.saveAs(content, filename+".zip"));
  })
}

