import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VideoPlayer from "./VideoPlayer";
import Comments from "./Comments";
import NextVideos from "./NextVideos";
import './App.css';

const API_URL = 'https://unit-3-project-api-0a5620414506.herokuapp.com';
const API_KEY = 'b9839b31-b3b8-4a10-a6c4-541c7c4b9c28';

const HomePage = ({ setSelectedVideo }) => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setLocalSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${API_URL}/videos?api_key=${API_KEY}`);
        setVideos(response.data);
        if (response.data.length > 0) {
          fetchVideoDetails(response.data[0].id);
        }
      } catch (error) {
        console.error('Error fetching video list:', error);
      }
    };
    fetchVideos();
  }, []);

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
              <p>{selectedVideo.views ? `${selectedVideo.views} views` : 'Loading views...'} | {selectedVideo.likes ? `${selectedVideo.likes} likes` : 'Loading likes...'}</p>
            </div>
            <p>{selectedVideo.description || 'Loading description...'}</p>
          </div>
          <Comments videoId={selectedVideo.id} />
        </div>
        <div className="right-column">
          <NextVideos 
            videos={videos.filter(video => video.id !== selectedVideo.id)}
            onVideoSelect={(video) => fetchVideoDetails(video.id)}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
