import React from "react";
import "./editor.css";
import { AdvancedVideo } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { Gravity } from "@cloudinary/url-gen/qualifiers";
import { AutoFocus } from "@cloudinary/url-gen/qualifiers/autoFocus";

const VideoEdit = () => {
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
        .width(600)
        .height(600)
        .gravity(
          Gravity.autoGravity().autoFocus(AutoFocus.focusOn(FocusOn.faces()))
        )
    ) // Crop the video, focusing on the faces.
    .roundCorners(byRadius(20)); // R
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
          <AdvancedVideo cldVid={myVideo} controls />
          {/* <img src={logo} className={"user-img"} /> */}
        </div>
      </div>
    </div>
  );
};
export default VideoEdit;
