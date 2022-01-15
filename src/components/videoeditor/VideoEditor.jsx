import React, { useState } from "react";
import "./editor.css";
import { AdvancedVideo } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { Gravity } from "@cloudinary/url-gen/qualifiers";
import { AutoFocus } from "@cloudinary/url-gen/qualifiers/autoFocus";

const VideoEdit = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const cld = new Cloudinary({
    cloud: {
      cloudName: "demo",
    },
  });
  const myVideo = cld.video("docs/walking_talking");

  // Apply the transformation.
  myVideo
    .resize(
      fill()
        .width(150)
        .height(150)
        .gravity(
          Gravity.autoGravity().autoFocus(AutoFocus.focusOn(FocusOn.faces()))
        )
    ) // Crop the video, focusing on the faces.
    .roundCorners(byRadius(20)); // R
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };
  const handleSubmission = () => {
    const formData = new FormData();

    formData.append("File", selectedFile);

    fetch("https://api.cloudinary.com/v1_1/${cloudName}/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className={"header-banner"}>
      <div className={"banner-content-wrapper"}>
        <section className={"banner-content"}>
          <h1 id={"title"}>Cloudinary video Editor</h1>
          <p className={"about-me"}>
            If you find it difficult uploading videos, worry no more. Using our
            app you can easily upload, edit videos to cloudinary.
          </p>
        </section>
        <div className={"user-img-wrapper"}>
          <AdvancedVideo
            cldVid={myVideo}
            controls
            // onPlay={playFunction}
            // onEnded={endFunction}
          />
          <input type="file" name="file" onChange={changeHandler} />
          {isSelected ? (
            <div>
              <p>Filename: {selectedFile.name}</p>
              <p>Filetype: {selectedFile.type}</p>
              <p>Size in bytes: {selectedFile.size}</p>
              <p>
                lastModifiedDate:{" "}
                {selectedFile.lastModifiedDate.toLocaleDateString()}
              </p>
            </div>
          ) : (
            <p>Select a file to show details</p>
          )}
          <div>
            <button onClick={handleSubmission}>Submit</button>
          </div>
          {/* <img src={logo} className={"user-img"} /> */}
        </div>
      </div>
    </div>
  );
};
export default VideoEdit;
