import React, { useState, useEffect } from 'react';
import Timer from './Timer'; // Import the Timer component
import Peace from './Peace.mp3'; // import song
import PeacePreview from "./Previews/PeacePreview.mp3";

const PeaceMusic = ({ onPauseMusic }) => {
  const [audio, setAudio] = useState(null);
  const [timerStarted, setTimerStarted] = useState(false);
  const [pausedTime, setPausedTime] = useState(0);

  useEffect(() => {
    return () => {
      // Cleanup: Pause audio and notify parent component when unmounting
      if (audio) {
        audio.pause();
        onPauseMusic();
      }
    };
  }, [audio, onPauseMusic]);

  useEffect(() => {
    const audioElement = new Audio(Peace);
    setAudio(audioElement);
    return () => {
      audioElement.pause();
    };
  }, []);

  const startMusic = () => {
    if (audio) {
      audio.currentTime = pausedTime;
      audio.play();
      setTimerStarted(true);
    }
  };

  const pauseMusic = () => {
    if (audio) {
      setPausedTime(audio.currentTime);
      audio.pause();
      setTimerStarted(false);
    }
  };

  const handleTimerStatusChange = (isActive) => {
    if (isActive) {
      startMusic();
    } else {
      pauseMusic();
    }
  };

  // Integrated logic from handlePauseMusic
  const handlePauseMusic = (isPaused) => {
    if (audio) {
      if (isPaused) {
        audio.pause();
      } else {
        audio.play();
      }
    }
  };

  // Wrapper function to call both pauseMusic and handlePauseMusic
  const handlePauseWrapper = (isPaused) => {
    pauseMusic();
    handlePauseMusic(isPaused);
  };

  return (
    <div className="music-player">
      <h2 className='music-preview-caption'>Listen to Preview:</h2>
        <audio controls preload="auto" src={PeacePreview}>
          Your browser does not support the audio element.
        </audio>  
      {/* Pass the wrapper function to the Timer component */}
      <Timer onStatusChange={handleTimerStatusChange} onPauseMusic={handlePauseWrapper} />
    </div>
  );
};
export default PeaceMusic;
