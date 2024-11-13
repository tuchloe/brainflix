import React from 'react';
import { useNavigate } from 'react-router-dom';
import './VideoUpload.scss'; // Updated to reflect correct file naming

const VideoUpload = () => {
  const navigate = useNavigate();

  const handleUpload = () => {
    alert('Video uploaded successfully!');
    navigate('/');
  };

  return (
    <div className="video-upload">
      <h2 className="video-upload__title">Upload Video</h2>
      <form className="video-upload__form" onSubmit={handleUpload}>
        <div className="video-upload__section">
          <label className="video-upload__label">VIDEO THUMBNAIL</label>
          <div className="video-upload__thumbnail">
            <img
              src="./assets/Images/Upload-video-preview.jpg"
              alt="Video Thumbnail Preview"
              className="video-upload__thumbnail-image"
            />
          </div>
        </div>
        <div className="video-upload__section">
          <label className="video-upload__label" htmlFor="title">
            TITLE YOUR VIDEO
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="video-upload__input"
            placeholder="Add a title to your video"
          />
        </div>
        <div className="video-upload__section">
          <label className="video-upload__label" htmlFor="description">
            ADD A VIDEO DESCRIPTION
          </label>
          <textarea
            name="description"
            id="description"
            className="video-upload__textarea"
            placeholder="Add a description to your video"
          />
        </div>
        <div className="video-upload__buttons">
          <button
            type="submit"
            className="video-upload__button video-upload__button--publish"
          >
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
