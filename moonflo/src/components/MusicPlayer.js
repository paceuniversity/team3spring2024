import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Timer from './Timer'; // Import the Timer component

const MusicPlayer = () => {
  const location = useLocation();
  const selectedMusic = location.state ? location.state.selectedMusic : [];
  const [meditationDuration, setMeditationDuration] = useState(0);
  const [isTimerVisible, setIsTimerVisible] = useState(false);

  const handleDurationChange = (event) => {
    const duration = parseInt(event.target.value);
    setMeditationDuration(duration);
  };

  const handleStartMeditation = () => {
    setIsTimerVisible(true); // Show the timer when meditation starts
  };

  return (
    <div className="music-player">
      <h2>Now Playing</h2>
      <div className="music-button-container">
        {selectedMusic.map((music, index) => (
          <button key={index} className={`music-button ${music.toLowerCase()}`}>
            {music}
          </button>
        ))}
      </div>
      <div className="duration-input">
        <label htmlFor="duration">Set Duration (minutes):</label>
        <input 
          type="number" 
          id="duration" 
          value={meditationDuration} 
          onChange={handleDurationChange} 
          min="1" 
          step="1" 
        />
      </div>
      <button onClick={handleStartMeditation}>Start Meditation</button>
      {/* Render Timer component when isTimerVisible is true */}
      {isTimerVisible && <Timer seconds={meditationDuration * 60} />}
    </div>
  );
};

export default MusicPlayer;
