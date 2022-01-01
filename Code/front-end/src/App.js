import React from "react";
import ReactImageAnnotate from "react-image-annotate";

function App() {
  return (
    <div>
      <header>
        <ReactImageAnnotate
          labelImages
          regionClsList={["Alpha", "Beta", "Charlie", "Delta"]}
          regionTagList={["tag1", "tag2", "tag3"]}
          images={[
            {
              src: "https://placekitten.com/408/287",
              name: "Image 1",
              regions: []
            }
          ]}
        />
      </header>
    </div>
  );
}

export default App;
