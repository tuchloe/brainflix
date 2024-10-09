import React, { useState, useEffect } from 'react';
import Header from "./components/Header";
import VideoPlayer from "./components/VideoPlayer";
import Comments from "./components/Comments";
import NextVideos from "./components/NextVideos";
import videosData from './assets/data/video-details.json';
import "./App.css";

const App = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    setVideos(videosData);
    setSelectedVideo(videosData[0]);
  }, []);

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

return (
  <div className="App">
    <Header />
    <main className="main-content">
      <VideoPlayer video={selectedVideo} />

      <div className="main-content__details-next-videos">
        <div className="left-column">
          <div className="video-info">
            <h1>{selectedVideo?.title}</h1>
            <div className="video-info-data"><strong>By {selectedVideo?.channel}</strong> <p> {selectedVideo?.views} views | {selectedVideo?.likes} likes</p></div>
            <p>{selectedVideo?.description}</p>
          </div>
          <Comments comments={selectedVideo ? selectedVideo.comments : []} />
        </div>
        
        <div className="right-column">
        <NextVideos 
              videos={videos.filter(video => video.id !== selectedVideo?.id)} 
              onVideoSelect={handleVideoSelect}
              />
        </div>
      </div>
    </main>
  </div>
);
}

export default App;


