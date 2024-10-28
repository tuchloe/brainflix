import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 

const UploadPage = () => {
  const navigate = useNavigate();

  const handleUpload = () => {
    alert('Video uploaded successfully!');
    navigate('/');
  };

  return (
    <div className="upload-page">
      <h2 className="upload-page__title">Upload Video</h2>
      <form className="upload-form" onSubmit={handleUpload}>
        <div className="upload-form__section">
          <label className="upload-form__label">VIDEO THUMBNAIL</label>
          <div className="upload-form__thumbnail">
            <img 
              src="./assets/Images/Upload-video-preview.jpg" 
              alt="Video Thumbnail Preview"
              className="upload-form__thumbnail-img"
            />
          </div>
        </div>
        <div className="upload-form__section">
          <label className="upload-form__label" htmlFor="title">TITLE YOUR VIDEO</label>
          <input 
            type="text" 
            name="title" 
            id="title" 
            className="upload-form__input" 
            placeholder="Add a title to your video" 
          />
        </div>
        <div className="upload-form__section">
          <label className="upload-form__label" htmlFor="description">ADD A VIDEO DESCRIPTION</label>
          <textarea 
            name="description" 
            id="description" 
            className="upload-form__textarea" 
            placeholder="Add a description to your video" 
          />
        </div>
        <div className="upload-form__buttons">
          <button type="submit" className="upload-form__button upload-form__button--publish">PUBLISH</button>
          <button type="button" className="upload-form__button upload-form__button--cancel" onClick={() => navigate('/')}>CANCEL</button>
        </div>
      </form>
    </div>
  );
};

export default VideoUpload;
