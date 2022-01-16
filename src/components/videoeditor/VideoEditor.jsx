import React, { useState } from "react";
import "./editor.css";
import { video } from "@cloudinary/url-gen/qualifiers/source";
// import { AdvancedVideo } from "@cloudinary/react";

// import { Cloudinary } from "@cloudinary/url-gen";
// import { fill } from "@cloudinary/url-gen/actions/resize";
// import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
// import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
// import { Gravity } from "@cloudinary/url-gen/qualifiers";
// import { AutoFocus } from "@cloudinary/url-gen/qualifiers/autoFocus";

// import Transformation from "@cloudinary/url-gen/backwards/transformation";
// import { Transformation } from "@cloudinary/url-gen";

// import { Position } from "@cloudinary/url-gen/qualifiers/position";
// import { compass } from "@cloudinary/url-gen/qualifiers/gravity";
// import { upload } from "@testing-library/user-event/dist/upload";

const VideoEdit = () => {
  const [file, setFile] = useState(null);
  const [videoSrc, setVideoSrc] = useState([]);
  const [loading, setLoading] = useState(false);

  // const cld = new Cloudinary({
  //   cloud: {
  //     cloudName: "demo",
  //   },
  // });

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
      .then((res) => console.log(res))
      .then((res) => {
        setVideoSrc((videoSrc) => [...videoSrc, res.secure_url]);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };
  // const myVideo = cld.video("docs/walking_talking");

  // Apply the transformation.
  // myVideo
  //   .resize(
  //     fill()
  //       .width(150)
  //       .height(150)
  //       .gravity(
  //         Gravity.autoGravity().autoFocus(AutoFocus.focusOn(FocusOn.faces()))
  //       )
  //   )
  //   // Crop the video, focusing on the faces.

  //   .roundCorners(byRadius(20)); // R

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
            {videoSrc.map((videoplaying) => {
              // <video controls src={video}></video>;
              <video
                id="demo-player"
                controls
                autoplay
                class="cld-video-player"
                data-cld-public-id={videoplaying}></video>;
            })}
          </div>
          {/* <AdvancedVideo cldVid={myVideo} controls></AdvancedVideo> */}
          {/* <Video publicId={myVideos}>
            <Transformation height="200" width="300" crop="fill" />
            <Transformation flags="splice" overlay="video:dog" />
            <Transformation height="200" width="300" crop="fill" />
            <Transformation flags="layer_apply" />
          </Video> */}

          {/* <img src={logo} className={"user-img"} /> */}
        </div>
      </div>
    </div>
  );
};
export default VideoEdit;
