import React from 'react';
import { Link } from 'react-router-dom';
import '../Header/Header.css';
import BrainFlixLogo from '../Header/BrainFlix-logo.svg';
import UserDisplayImage from '../../assets/Images/Mohan-muruge.jpg';
import UploadIcon from '../../assets/Icons/upload.svg';  

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">
          <img 
            className="header__logo-img" 
            src={BrainFlixLogo} 
            alt="BrainFlix Logo" 
          />
        </Link>
      </div>
      <div className="header__controls">
        <input 
          className="header__search-input" 
          type="text" 
          placeholder="Search" 
        />
        <Link to="/upload">
          <button className="header__upload-button">
            <img 
              className="header__upload-icon" 
              src={UploadIcon} 
              alt="Upload Icon"
            />
            UPLOAD
          </button>
        </Link>
        <img 
          src={UserDisplayImage}  
          alt="User Display" 
          className="header__user-img" 
        />
      </div>
    </header>
  );
};

export default Header;

