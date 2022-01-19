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
    // fill: 60,
    width: 60,
    height: 60,
  });
  const [cldCloudName, setCldCloudName] = useState("");

  const [loading, setLoading] = useState(false);
  const [preset, setPreset] = useState("");

  const handleCloudName = (e) => {
    setCldCloudName(e.target.value);
  };
  const handlePresetName = (e) => {
    setPreset(e.target.value);
  };

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
    formData.append("upload_preset", preset);
    setLoading(true);
    fetch(`https://api.cloudinary.com/v1_1/${cldCloudName}/upload`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      // .then((res) => console.log(res))
      .then((res) => {
        console.log(res);
        setVideoSrc(res.public_id);
        setTransformState((prev) => ({
          ...prev,
          height: res.height,
          width: res.width,
        }));

        setLoading(false);
      })
      .then(handleErrors);
  };
  // const myVideo = cld.video(transformState);
  // console.log(myVideo);

  // // Apply the transformation.

  // myVideo.resize(
  //   fill(transformState.fill)
  //     .width(transformState.width)
  //     .height(transformState.height)
  //   // .gravity(
  //   //   Gravity.autoGravity().autoFocus(AutoFocus.focusOn(FocusOn.faces()))
  //   // )
  // );
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
            <br />
            <span style={{ color: "red", fontWeight: "bold" }}> Note:</span>
            Kindly input your cloud name and upload preset before uploading your
            video.
          </p>

          <div className={"banner-input"}>
            <div>
              <label htmlFor="">Cloud Name:</label>
              <input
                onChange={handleCloudName}
                type="text"
                value={cldCloudName}
                name="cloudname"
              />

              <label htmlFor="">Upload Preset:</label>
              <input
                onChange={handlePresetName}
                type="text"
                value={preset}
                name="preset"
              />
            </div>

            {/* <label htmlFor="">
              fill
              <input
                onChange={onChange}
                type="text"
                value={transformState.fill}
                name="fill"
              />
            </label> */}
            <div>
              <label htmlFor="">width:</label>
              <input
                onChange={onChange}
                type="text"
                value={transformState.width}
                name="width"
              />
              <label htmlFor="">height:</label>
              <input
                onChange={onChange}
                type="text"
                value={transformState.height}
                name="height"
              />
            </div>
          </div>
          <div className={"banner-text"}>
            {/* <p>fill:{transformState.fill}</p> */}
            <p>width:{transformState.width}</p>
            <p>height:{transformState.height}</p>
          </div>
        </section>
        <div className={"user-img-wrapper"}>
          <div className={"upload-video"}>
            <h1>Upload Your Videos Here</h1>
            <div className={"upload"}>
              <input
                type="file"
                name="file"
                id=""
                onChange={handleEventChange}
              />
              <button
                onClick={handleSubmit}
                disabled={(!cldCloudName, !preset)}>
                Upload
              </button>
            </div>
          </div>

          <div>
            {loading && <p>Loading...</p>}
            {videoSrc ? (
              <AdvancedVideo
                // src={}
                cldVid={cld.video(videoSrc).resize(
                  fill(transformState.fill)
                    .width(transformState.width)
                    .height(transformState.height)
                  // .gravity(
                  //   Gravity.autoGravity().autoFocus(AutoFocus.focusOn(FocusOn.faces()))
                  // )
                )}
                controls
              />
            ) : (
              <div></div>
            )}
          </div>

          {/* <button onClick={() => myVideo}>Transform</button> */}
        </div>
      </div>
    </div>
  );
};
export default VideoEdit;
