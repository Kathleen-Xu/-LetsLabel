import React from "react";
import ReactImageAnnotate from "react-image-annotate";

const tryUrl = "https://res.cloudinary.com/xklfire/image/upload/v1641066155/kqtcbazhfoxpwllx8ye2.jpg";

const Board = () => {
  const [selectedImage, setSelectedImage] = React.useState(0)
  const [images, setImages] = React.useState([
    {
      src: tryUrl,
      name: "Image 1",
      regions: [],
    },
    {
      src: tryUrl,
      name: "Image 2",
      regions: [],
    },
  ]);
  const getData = (data) => {
    alert("out!");
    let img = data.images;
    let regions = img[0].regions;
    console.log(img);
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
  return (
    <ReactImageAnnotate
      regionClsList={["Alpha", "Beta", "Charlie", "Delta"]}
      regionTagList={["tag1", "tag2", "tag3"]}
      images={images}
      selectedImage={selectedImage}
      onNextImage={handleNext}
      onPrevImage={handlePrev}
      onExit={getData}
      hideClone
      hideSettings
    />
  );
};

export default Board;