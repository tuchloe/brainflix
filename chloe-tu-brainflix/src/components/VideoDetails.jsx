import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';
import Comments from './Comments';
import NextVideos from './NextVideos';

const API_URL = 'https://unit-3-project-api-0a5620414506.herokuapp.com';
const API_KEY = 'b9839b31-b3b8-4a10-a6c4-541c7c4b9c28';

const VideoDetails = ({ setSelectedVideo }) => {
  const { videoId } = useParams();
  const [videoDetails, setVideoDetails] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/videos/${videoId}?api_key=${API_KEY}`);
        setVideoDetails(response.data);
        setSelectedVideo(response.data);
      } catch (error) {
        console.error('Error fetching video details:', error);
      }
    };

    if (videoId) {
      fetchVideoDetails();
    }
  }, [videoId, setSelectedVideo]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${API_URL}/videos?api_key=${API_KEY}`);
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching videos list:', error);
      }
    };

    fetchVideos();
  }, []);

  if (!videoDetails) return <div>Loading...</div>;

  return (
    <div className="main-content">
      <VideoPlayer video={videoDetails} />
      <div className="main-content__details-next-videos">
        <div className="left-column">
          <div className="video-info">
            <h1>{videoDetails.title}</h1>
            <div className="video-info-data">
              <strong>By {videoDetails.channel}</strong>
              <p>{videoDetails.views} views | {videoDetails.likes} likes</p>
            </div>
            <p>{videoDetails.description}</p>
          </div>
          <Comments videoId={videoId} />
        </div>
        <div className="right-column">
          <NextVideos
            videos={videos}
            selectedVideoId={videoId} 
            onVideoSelect={(video) => setVideoDetails(video)}
          />
        </div>
      </div>
    </div>
  );
};


export default VideoDetails;
