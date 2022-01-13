import React from "react";
import "./editor.css";

import { VideoEditor } from "react-media-editor";

const VideoEdit = () => {
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
          <VideoEditor src="https://your.video.mp4" />
          {/* <img src={logo} className={"user-img"} /> */}
        </div>
      </div>
    </div>
  );
};
export default VideoEdit;
