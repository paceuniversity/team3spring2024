import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import MusicPlayer from '../components/MusicPlayer'; // Import the MusicPlayer component
import './periodInfo.css';
import { BsArrowLeft } from 'react-icons/bs'; 

const Meditation = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [selectedMusic, setSelectedMusic] = useState('');

  const handleClick = (component) => {
    setActiveComponent(component); // Update activeComponent based on clicked image
  };

  const handleBack = () => {
    setActiveComponent(null); // Set activeComponent to null to go back to the content page
  };

  const handleMusicSelection = (music) => {
    setSelectedMusic(music);
    setActiveComponent('music'); // Set activeComponent to 'music' to render MusicPlayer
  };

  return (
    <div>
      {activeComponent && (
        <div className="backButton" onClick={handleBack}>
          <BsArrowLeft /> {/* Render the arrow left icon */}
          Back
        </div>
      )}
      <div className="floatingHeader">Meditation</div>
      <div className="infoContainer">
        {/* Render MusicPlayer or music options based on activeComponent */}
        {activeComponent === 'music' ? (
          <MusicPlayer selectedMusic={selectedMusic} />
        ) : (
          <div className="music-popup">
            <div className="music-content">
              <h2>Pick a song to start your meditation session</h2>
              <div className="music-button-container">
                <Link to="#" onClick={() => handleMusicSelection('Relax')}>
                  Relax
                </Link>
                <Link to="#" onClick={() => handleMusicSelection('Peace')}>
                  Peace
                </Link>
                <Link to="#" onClick={() => handleMusicSelection('Balance')}>
                  Balance
                </Link>
                <Link to="#" onClick={() => handleMusicSelection('Elevate')}>
                  Elevate
                </Link>
              </div>
              <br></br>
            </div>
          </div>
        )}
        <NavBar />
      </div>
      <h1 className="hidden">..</h1>
    </div>
  );
};

export default Meditation;
