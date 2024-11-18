import React, { useEffect, useState } from 'react';
import { API_URL } from '../config';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import Comments from '../Comments/Comments';
import NextVideos from '../NextVideosBar/NextVideos';
import './VideoDetails.css';


const VideoDetails = ({ setSelectedVideo }) => {
  const { videoId } = useParams();
  const [videoDetails, setVideoDetails] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/videos/${videoId}`);
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
        const response = await axios.get(`${API_URL}/videos`);
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
      <div className="main-content__container">
        <div className="main-content__left-column">
          <div className="main-content__video-info">
            <h1>{videoDetails.title}</h1>
            <div className="main-content__video-data">
              <strong>By {videoDetails.channel}</strong>
              <p>{videoDetails.views} views | {videoDetails.likes} likes</p>
            </div>
            <p>{videoDetails.description}</p>
          </div>
          <Comments videoId={videoId} />
        </div>
        <div className="main-content__right-column">
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
