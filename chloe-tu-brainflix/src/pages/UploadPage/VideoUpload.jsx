import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './VideoUpload.scss';


const VideoUpload = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [posterImage, setPosterImage] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'description') {
      setDescription(value);
    }
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    if (name === 'video') {
      setVideoFile(files[0]);
    } else if (name === 'poster') {
      setPosterImage(files[0]);
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!videoFile) {
      setError('Please upload a video file.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('video', videoFile);

    if (posterImage) {
      formData.append('poster', posterImage);
    }

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
    <div className="upload-page">
      <h2 className="upload-page__title">Upload Video</h2>
      <form className="upload-form" onSubmit={handleUpload}>
        {error && <p className="upload-form__error">{error}</p>}

        <div className="upload-form__section">
          <label className="upload-form__label">VIDEO FILE</label>
          <input
            type="file"
            name="video"
            accept="video/*"
            className="upload-form__input"
            onChange={handleFileChange}
            required
          />
        </div>

        <div className="upload-form__section">
          <label className="upload-form__label">VIDEO POSTER</label>
          <input
            type="file"
            name="poster"
            accept="image/*"
            className="upload-form__input"
            onChange={handleFileChange}
          />
          {!posterImage && (
            <div className="upload-form__placeholder">
              <img
                src="./assets/Images/Upload-video-preview.jpg"
                alt="Default Placeholder"
                className="upload-form__thumbnail-img"
              />
            </div>
          )}
        </div>

        <div className="upload-form__section">
          <label className="upload-form__label" htmlFor="title">TITLE YOUR VIDEO</label>
          <input
            type="text"
            name="title"
            id="title"
            className="upload-form__input"
            placeholder="Add a title to your video"
            value={title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="upload-form__section">
          <label className="upload-form__label" htmlFor="description">ADD A VIDEO DESCRIPTION</label>
          <textarea
            name="description"
            id="description"
            className="upload-form__textarea"
            placeholder="Add a description to your video"
            value={description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="upload-form__buttons">
          <button type="submit" className="upload-form__button upload-form__button--publish">PUBLISH</button>
          <button
            type="button"
            className="upload-form__button upload-form__button--cancel"
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
