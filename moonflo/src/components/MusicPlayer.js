import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Timer from './Timer'; // Import the Timer component
import relaxSong from './Relax.mp3'; // import song
import peaceSong from './Peace.mp3'; // import song
import balanceSong from './Balance.mp3'; // import song
import elevateSong from './Elevate.mp3'; // import song

const MusicPlayer = () => {
  const location = useLocation();
  const selectedMusic = location.state ? location.state.selectedMusic : [];
  const [meditationDuration, setMeditationDuration] = useState(0);
  const [isTimerVisible, setIsTimerVisible] = useState(false);

  useEffect(() => {
    // Play the selected song when the component mounts
    playMusic(selectedMusic[0]);
  }, [selectedMusic]);

  const handleDurationChange = (event) => {
    const duration = parseInt(event.target.value);
    setMeditationDuration(duration);
  };

  const handleStartMeditation = () => {
    setIsTimerVisible(true); // Show the timer when meditation starts
  };

  const playMusic = (song) => {
    try {
      const audio = new Audio(getSongPath(song));
      audio.play();
    } catch (error) {
      console.error('Error playing music:', error);
    }
  };

  const getSongPath = (song) => {
    switch (song) {
      case 'Relax':
        return relaxSong;
      case 'Peace':
        return peaceSong;
      case 'Balance':
        return balanceSong;
      case 'Elevate':
        return elevateSong;
      default:
        return '';
    }
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
