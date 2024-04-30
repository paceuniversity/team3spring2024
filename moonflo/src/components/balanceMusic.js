import React, { useState, useEffect } from 'react';
import Timer from './Timer'; // Import the Timer component
import Balance from './Balance.mp3'; // import song

const BalanceMusic = ({ onPauseMusic }) => {
  const [audio, setAudio] = useState(null);
  const [timerStarted, setTimerStarted] = useState(false);

  useEffect(() => {
    return () => {
      // Cleanup: Pause audio and notify parent component when unmounting
      if (audio) {
        audio.pause();
        onPauseMusic();
      }
    };
  }, [audio, onPauseMusic]);

  const startMusic = () => {
    if (!audio) {
      const audioElement = new Audio(Balance);
      audioElement.play();
      setAudio(audioElement);
      setTimerStarted(true);
    } else {
      audio.play();
    }
  };

  const pauseMusic = () => {
    if (audio) {
      audio.pause();
    }
  };

  const handleTimerStatusChange = (isActive) => {
    if (isActive) {
      startMusic();
    } else {
      pauseMusic();
      setTimerStarted(false);
    }
  };

  return (
    <div className="music-player">
      <h2>Now Playing</h2>
      {!timerStarted && (
        <audio controls preload="auto" duration="120">
          <source src={Balance} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
      <Timer onStatusChange={handleTimerStatusChange} onPauseMusic={pauseMusic} />
    </div>
  );
};

export default BalanceMusic;
