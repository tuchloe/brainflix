import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './VideoUpload.scss';

const VideoUpload = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'description') {
      setDescription(value);
    }
  };

  const handleFileChange = (event) => {
    setVideoFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('video', videoFile);

    try {
      const response = await axios.post('http://localhost:5000/videos', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 201) {
        alert('Video uploaded successfully!');
        navigate('/');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Failed to upload video. Please try again.');
    }
  };

  return (
    <div className="video-upload">
      <h2 className="video-upload__title">Upload Video</h2>
      <form className="video-upload__form" onSubmit={handleUpload}>
        <div className="video-upload__section">
          <label className="video-upload__label">VIDEO FILE</label>
          <input
            type="file"
            name="video"
            accept="video/*"
            onChange={handleFileChange}
          />
        </div>
        <div className="video-upload__section">
          <label className="video-upload__label" htmlFor="title">TITLE YOUR VIDEO</label>
          <input
            type="text"
            name="title"
            id="title"
            className="video-upload__input"
            placeholder="Add a title to your video"
            value={title}
            onChange={handleInputChange}
          />
        </div>
        <div className="video-upload__section">
          <label className="video-upload__label" htmlFor="description">ADD A VIDEO DESCRIPTION</label>
          <textarea
            name="description"
            id="description"
            className="video-upload__textarea"
            placeholder="Add a description to your video"
            value={description}
            onChange={handleInputChange}
          />
        </div>
        <div className="video-upload__buttons">
          <button type="submit" className="video-upload__button video-upload__button--publish">
            PUBLISH
          </button>
          <button
            type="button"
            className="video-upload__button video-upload__button--cancel"
            onClick={() => navigate('/')}
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

export default VideoUpload;
