import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Music from '../components/music';
import Timer from '../components/Timer';
import './periodInfo.css';

const Meditation = () => {
  const [selectedMusic, setSelectedMusic] = useState(null);

  const handleMusicSelect = (music) => {
    setSelectedMusic(music); // Update selectedMusic state with the selected song
  };

  const handleBack = () => {
    setSelectedMusic(null); // Reset selectedMusic state when going back
  };

  return (
    <div>
      <div className="floatingHeader">Meditation</div>
      <div className="infoContainer">
        {/* Render Music component if no song is selected */}
        {!selectedMusic && (
          <Music onSelect={handleMusicSelect} />
        )}
        <NavBar />
      </div>
    </div>
  );
};

export default Meditation;
