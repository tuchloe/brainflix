import './App.css';
import React, { useState} from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from "./components/Header/Header";
import VideoDetails from './pages/VideoDetails/VideoDetails';
import UploadPage from './pages/UploadPage/VideoUpload';
import HomePage from './pages/Home/Home';

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
