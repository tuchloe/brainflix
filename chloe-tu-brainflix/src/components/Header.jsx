import React from 'react';
import '../App.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <img className="header__logo__img" src="./src/assets/Logo/BrainFlix-logo.svg" alt="BrainFlix Logo" />
      </div>
      <div className="header__search-upload">
        <input className="header__search-input" type="text" placeholder="Search" />
        <button className="header__upload-button">UPLOAD</button>
        <img 
            src="./assets/Images/Mohan-muruge.jpg" 
            alt="User Display" 
            className="header__user-image" 
          />
      </div>
    </header>
  );
};

export default Header;