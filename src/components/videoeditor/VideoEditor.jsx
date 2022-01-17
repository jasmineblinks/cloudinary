import React, { useState } from "react";
import "./editor.css";
import { video } from "@cloudinary/url-gen/qualifiers/source";
import { AdvancedVideo } from "@cloudinary/react";

import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { Gravity } from "@cloudinary/url-gen/qualifiers";
import { AutoFocus } from "@cloudinary/url-gen/qualifiers/autoFocus";
import { transform } from "lodash";

// import Transformation from "@cloudinary/url-gen/backwards/transformation";
// import { Transformation } from "@cloudinary/url-gen";

// import { Position } from "@cloudinary/url-gen/qualifiers/position";
// import { compass } from "@cloudinary/url-gen/qualifiers/gravity";
// import { upload } from "@testing-library/user-event/dist/upload";
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

const VideoEdit = () => {
  const [file, setFile] = useState(null);
  const [videoSrc, setVideoSrc] = useState("");
  const [transformState, setTransformState] = useState({
    fill: 60,
    width: 60,
    height: 60,
  });

  const [loading, setLoading] = useState(false);
  const onChange = (e) => {
    setTransformState({
      ...transformState,
      [e.target.name]: e.target.value,
    });
  };

  const cld = new Cloudinary({
    cloud: {
      cloudName: "pueneh",
    },
  });

  const handleEventChange = (e) => {
    const read = e.target.files[0];
    setFile(read);
  };
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "oqiie6dy");
    setLoading(true);
    fetch("https://api.cloudinary.com/v1_1/pueneh/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      // .then((res) => console.log(res))
      .then((res) => {
        console.log(res);
        setVideoSrc(res.public_id);

        setLoading(false);
      })
      .then(handleErrors);
  };
  const myVideo = cld.video(transformState);
  console.log(myVideo);

  // Apply the transformation.

  myVideo.resize(
    fill(transformState.fill)
      .width(transformState.width)
      .height(transformState.height)
    // .gravity(
    //   Gravity.autoGravity().autoFocus(AutoFocus.focusOn(FocusOn.faces()))
    // )
  );
  // Crop the video, focusing on the faces.

  // .roundCorners(byRadius(20)); // R

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
          <h1>Upload your videos here</h1>
          <input type="file" name="file" id="" onChange={handleEventChange} />
          <button onClick={handleSubmit}>Upload</button>
          <div>
            {loading && <p>Loading...</p>}
            {videoSrc ? (
              <AdvancedVideo
                // src={}
                cldVid={
                  cld.video(videoSrc)
                  // .fill(transformState.fill)
                  // .width(transformState.width)
                  // .height(transformState.height)
                }
                controls
              />
            ) : (
              <div></div>
            )}
          </div>
          <label htmlFor="">
            fill
            <input
              onChange={onChange}
              type="text"
              value={transformState.fill}
              name="fill"
            />
          </label>
          <label htmlFor="">
            width
            <input
              onChange={onChange}
              type="text"
              value={transformState.width}
              name="width"
            />
          </label>
          <label htmlFor="">
            height
            <input
              onChange={onChange}
              type="text"
              value={transformState.height}
              name="height"
            />
          </label>
          <div style={{ backGroundColor: "blue" }}>
            <p>fill:{transformState.fill}</p>
            <p>width:{transformState.width}</p>
            <p>height:{transformState.height}</p>
          </div>
          {/* <button onClick={() => myVideo}>Transform</button> */}
        </div>
      </div>
    </div>
  );
};
export default VideoEdit;
