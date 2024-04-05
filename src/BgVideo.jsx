import React from "react";
import bgVideo from "./Asset/lite_rain.mp4";

const BgVideo = () => {
  return (
    <div>
      <video className="bg-video" autoPlay loop muted>
        <source src={bgVideo} type="video/mp4" />
      </video>
    </div>
  );
};

export default BgVideo;
