import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './music.css';

const Music = () => {
  const [selectedMusic, setSelectedMusic] = useState([]);

  const handleMusicSelect = (music) => {
    if (selectedMusic.includes(music)) {
      setSelectedMusic(selectedMusic.filter(item => item !== music));
    } else {
      setSelectedMusic([...selectedMusic, music]);
    }
  };

  return (
    <div className="music-popup">
      <div className="music-content">
        <h2>Pick a song to start your meditation session</h2>
        <div className="music-button-container">
          <Link
            to={{ 
              pathname: '/musicplayer', 
              state: { selectedMusic: selectedMusic }
            }}
            className={`Relax ${selectedMusic.includes('Relax') ? 'selected' : ''}`}
            onClick={() => handleMusicSelect('Relax')}
          >
            <Button>Relax</Button>
          </Link>
          <Link
            to={{ 
              pathname: '/musicplayer', 
              state: { selectedMusic: selectedMusic }
            }}
            className={`Peace ${selectedMusic.includes('Peace') ? 'selected' : ''}`}
            onClick={() => handleMusicSelect('Peace')}
          >
            <Button>Peace</Button>
          </Link>
          <Link
            to={{ 
              pathname: '/musicplayer', 
              state: { selectedMusic: selectedMusic }
            }}
            className={`Balance ${selectedMusic.includes('Balance') ? 'selected' : ''}`}
            onClick={() => handleMusicSelect('Balance')}
          >
            <Button>Balance</Button>
          </Link>
          <Link
            to={{ 
              pathname: '/musicplayer', 
              state: { selectedMusic: selectedMusic }
            }}
            className={`Elevate ${selectedMusic.includes('Elevate') ? 'selected' : ''}`}
            onClick={() => handleMusicSelect('Elevate')}
          >
            <Button>Elevate</Button>
          </Link>
        </div>
        <br></br>
      </div>
    </div>
  );
};

export default Music;
