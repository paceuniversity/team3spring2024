import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './music.css';


const Music = () => {
  const [selectedMusic, setSelectedMusic] = useState('');

  const handleMusicSelection = (music) => {
    setSelectedMusic(music);
  };

  return (
    <div className="music-popup">
      <div className="music-content">
        <h2>Pick a song to start your meditation session</h2>
        <div className="music-button-container">
          <Link to={{ pathname: '/MusicPlayer', state: { selectedMusic: 'Relax' } }}>
            <Button
              className={`Relax ${selectedMusic === 'Relax' ? 'selected' : ''}`}
              onClick={() => handleMusicSelection('Relax')}
            >
              Relax
            </Button>
          </Link>
          <Link to={{ pathname: '/MusicPlayer', state: { selectedMusic: 'Peace' } }}>
            <Button
              className={`Peace ${selectedMusic === 'Peace' ? 'selected' : ''}`}
              onClick={() => handleMusicSelection('Peace')}
            >
              Peace
            </Button>
          </Link>
          <Link to={{ pathname: '/MusicPlayer', state: { selectedMusic: 'Balance' } }}>
            <Button
              className={`Balance ${selectedMusic === 'Balance' ? 'selected' : ''}`}
              onClick={() => handleMusicSelection('Balance')}
            >
              Balance
            </Button>
          </Link>
          <Link to={{ pathname: '/MusicPlayer', state: { selectedMusic: 'Elevate' } }}>
            <Button
              className={`Elevate ${selectedMusic === 'Elevate' ? 'selected' : ''}`}
              onClick={() => handleMusicSelection('Elevate')}
            >
              Elevate
            </Button>
          </Link>
        </div>
        <br></br>
      </div>
    </div>
  );
};

export default Music;
