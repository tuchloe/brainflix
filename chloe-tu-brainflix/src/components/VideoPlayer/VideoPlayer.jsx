import React from 'react';
import '../VideoPlayer/VideoPlayer.css';

const VideoPlayer = ({ video }) => {
  if (!video) return <div>Loading...</div>;

  return (
    <section className="video">
      <div className="video__player">
        <video id="NowOn" controls autoPlay poster={video.image}>
          <source src={video.video} type="video/mp4" />
        </video>
      </div>
    </section>
  );
};

export default VideoPlayer;

