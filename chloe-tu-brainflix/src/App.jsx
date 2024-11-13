import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from "./components/Header/Header";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import Comments from "./components/Comments/Comments";
import NextVideos from "./components/NextVideosBar/NextVideos";
import VideoDetails from './components/VideoDetails/VideoDetails';

const API_KEY = 'b9839b31-b3b8-4a10-a6c4-541c7c4b9c28';
const API_URL = 'https://unit-3-project-api-0a5620414506.herokuapp.com';


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


  const fetchVideoDetails = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/videos/${id}?api_key=${API_KEY}`);
      setLocalSelectedVideo(response.data);
      setSelectedVideo(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching video details:', error);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="home-page">
      <VideoPlayer video={selectedVideo} />
      <div className="home-page__layout">
        <div className="home-page__left-column">
          <div className="home-page__video-info">
            <h1>{selectedVideo.title}</h1>
            <div className="home-page__video-info-data">
              <strong>By {selectedVideo.channel}</strong>
              <p>{selectedVideo.views ? `${selectedVideo.views} views` : 'Loading views...'} | {selectedVideo.likes ? `${selectedVideo.likes} likes` : 'Loading likes...'}</p>
            </div>
            <p>{selectedVideo.description || 'Loading description...'}</p>
          </div>
          <Comments videoId={selectedVideo.id} />
        </div>
        <div className="home-page__right-column">
          <NextVideos 
            videos={videos.filter(video => video.id !== selectedVideo.id)}
            onVideoSelect={(video) => fetchVideoDetails(video.id)}
          />
        </div>
      </div>
    </div>
  );
};


const UploadPage = () => {
  const navigate = useNavigate();

  const handleUpload = () => {
    alert('Video uploaded successfully!');
    navigate('/');
  };

  return (
    <div className="upload-page">
      <h1 className="upload-page__title">Upload Video</h1>
      <form className="upload-form" onSubmit={handleUpload}>
        <div className="upload-form__container">
        <div id="sectionL" className="upload-form__section">
          <label className="upload-page__subheader">VIDEO THUMBNAIL</label>
          <div className="upload-form__thumbnail">
            <img 
              src="./assets/Images/Upload-video-preview.jpg" 
              alt="Video Thumbnail Preview"
              className="upload-form__thumbnail-img"
            />
          </div>
        </div>
        <div id="sectionR" className="upload-form__section">
          <label className="upload-page__subheader" htmlFor="title">TITLE YOUR VIDEO</label>
          <input 
            type="text" 
            name="title" 
            id="title" 
            className="upload-form__input" 
            placeholder="Add a title to your video" 
          />
          <label className="upload-page__subheader" htmlFor="description">ADD A VIDEO DESCRIPTION</label>
          <textarea 
            name="description" 
            id="description" 
            className="upload-form__input" 
            placeholder="Add a description to your video" 
          />
        </div>
        </div>
        <div className="upload-form__buttons">
          <button type="button" className="upload-form__button--cancel" onClick={() => navigate('/')}>CANCEL</button>
          <button type="submit" className="upload-form__button--publish">PUBLISH</button>
        </div>
      </form>
    </div>
  );
};

const App = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage setSelectedVideo={setSelectedVideo} />} />
          <Route path="/videos/:videoId" element={<VideoDetails selectedVideo={selectedVideo} setSelectedVideo={setSelectedVideo} />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
