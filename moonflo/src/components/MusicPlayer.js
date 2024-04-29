import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Timer from './Timer'; // Import the Timer component
import Relax from './Relax.mp3'; // import song
import Peace from './Peace.mp3'; // import song
import Balance from './Balance.mp3'; // import song
import Elevate from './Elevate.mp3'; // import song

const MusicPlayer = () => {
  const location = useLocation();
  const selectedMusic = location.state ? location.state.selectedMusic : [];
  const [meditationDuration, setMeditationDuration] = useState(0);
  const [isTimerVisible, setIsTimerVisible] = useState(false);
  const [previewAudio, setPreviewAudio] = useState(null);

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
    // Stop the song preview when timer starts
    if (previewAudio) {
      previewAudio.pause();
      previewAudio.currentTime = 0;
    }
  };

  const playMusic = (song) => {
    try {
      if (!song) {
        console.error('Invalid song:', song);
        return;
      }
  
      let audioPath;
  
      // Hardcoded audio file paths
      switch (song) {
        case 'Relax':
          audioPath = Relax;
          break;
        case 'Peace':
          audioPath = Peace;
          break;
        case 'Balance':
          audioPath = Balance;
          break;
        case 'Elevate':
          audioPath = Elevate;
          break;
        default:
          console.error('Unknown song:', song);
          return;
      }
  
      console.log('Audio Path:', audioPath);
  
      if (previewAudio) { // Check if previewAudio is set
        previewAudio.src = audioPath; // Set the preview audio source
        previewAudio.play(); // Play the preview clip
        previewAudio.currentTime = 0; // Reset playback position
      } else {
        console.error('Preview audio not available');
      }
    } catch (error) {
      console.error('Error playing music:', error);
    }
  };
  
  

  return (
    <div className="music-player">
      <h2>Now Playing</h2>
      <audio src={Balance}>Balance</audio>
      <div className="music-button-container">
      {selectedMusic.map((music, index) => (
        <button 
          key={index} 
          className={`music-button ${music.toLowerCase()}`}
          onClick={() => playMusic(music)} // Pass the song name to playMusic function
        >
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
