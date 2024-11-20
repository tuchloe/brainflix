import React, { useEffect, useState } from 'react';
import { API_URL } from '../../config';
import axios from 'axios';
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer.jsx";
import Comments from "../../components/Comments/Comments.jsx";
import NextVideos from "../../components/NextVideosBar/NextVideos.jsx";
import './Home.css';
import viewsIcon from '../../assets/Icons/views.svg';
import likesIcon from '../../assets/Icons/likes.svg';

const Home = ({ setSelectedVideo }) => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideoState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${API_URL}/videos`);
        setVideos(response.data);
        if (response.data.length > 0) {
          setSelectedVideoState(response.data[0]);
          setSelectedVideo(response.data[0]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching video list:', error);
        setLoading(false);
      }
    };
    fetchVideos();
  }, [setSelectedVideo]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="main-content">
      <VideoPlayer video={selectedVideo} />
      <div className="main-content__details-next-videos">
        <div className="left-column">
          <div className="video-info">
            <h1>{selectedVideo.title}</h1>
            <div className="video-info-data">
              <strong>By {selectedVideo.channel}</strong>
              <p className="video-info-stats">
                <img src={viewsIcon} alt="views icon" className="icon" /> 
                {selectedVideo.views} views  
                <img src={likesIcon} alt="likes icon" className="icon" /> 
                {selectedVideo.likes} likes
              </p>
            </div>
            <p className="video-info-description">{selectedVideo.description}</p>
          </div>
          <Comments videoId={selectedVideo.id} />
        </div>
        <div className="right-column">
          <NextVideos
            videos={videos}
            selectedVideoId={selectedVideo.id} 
            onVideoSelect={(video) => {
              setSelectedVideoState(video); 
              setSelectedVideo(video);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
