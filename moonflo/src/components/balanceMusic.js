import React, { useState } from 'react';
import Timer from './Timer'; // Import the Timer component
import Balance from './Balance.mp3'; // import song

const BalanceMusic = () => {
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  const [audioPosition, setAudioPosition] = useState(0);

  const startMusic = () => {
    if (!audio) {
      const audioElement = new Audio(Balance);
      audioElement.currentTime = audioPosition;
      audioElement.play();
      setAudio(audioElement);
      setIsPlaying(true);
      setTimerStarted(true);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const pauseMusic = () => {
    if (audio) {
      audio.pause();
      setIsPlaying(false);
      setAudioPosition(audio.currentTime);
    }
  };

  const handleTimerStatusChange = (isActive) => {
    if (isActive) {
      startMusic();
    } else {
      pauseMusic();
      setTimerStarted(false);
      if (audio) {
        audio.pause();
        setIsPlaying(false);
      }
    }
  };

  const handlePauseMusic = (isPaused) => {
    if (audio) {
      if (isPaused) {
        audio.pause();
      } else {
        audio.play();
      }
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
      <Timer onStatusChange={handleTimerStatusChange} onPauseMusic={handlePauseMusic} />
    </div>
  );
};

export default BalanceMusic;
