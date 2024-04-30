import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import BalancePreview from "./Previews/BalancePreview.mp3";
import Balance from './Balance.mp3';

const BalanceMusic = ({ onPauseMusic }) => {
  const [audio, setAudio] = useState(null); // State to manage the audio element
  const [timerStarted, setTimerStarted] = useState(false);  // State to track if the timer has started
  const [pausedTime, setPausedTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioPosition, setAudioPosition] = useState(0);

  // Effect to handle cleanup when component unmounts
  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();  // Pause the audio
        onPauseMusic(); // Notify the parent component about pausing music
      }
    };
  }, [audio, onPauseMusic]); // Dependencies include 'audio' and 'onPauseMusic'

  
  useEffect(() => {
    const audioElement = new Audio(Balance); 
    setAudio(audioElement); 
    return () => {
      audioElement.pause();  
    };
  }, []);

  // Function to start playing the music
  const startMusic = () => {
    if (!audio) return;
    audio.currentTime = pausedTime;
    audio.play(); // Play the audio 
    setTimerStarted(true);// Set the audio state
    setIsPlaying(true); // Set timer started state to true
  };

   // Function to pause the music
  const pauseMusic = () => {
    if (!audio) return;
    setPausedTime(audio.currentTime);
    audio.pause();
    setTimerStarted(false);
    setIsPlaying(false);
  };

  // Function to handle timer status change
  const handleTimerStatusChange = (isActive) => {
    if (isActive) {
      startMusic();
    } else {
      pauseMusic();  // Pause the audio
    }
  };

  const handlePauseMusic = (isPaused) => {
    if (!audio) return;
    if (isPaused) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const handlePauseWrapper = (isPaused) => {
    pauseMusic();
    handlePauseMusic(isPaused);
  };

  return (
    <div className="music-player">
      <h2 className='music-preview-caption'>Listen to Preview:</h2>
      <audio controls preload="auto" src={BalancePreview}>
        Your browser does not support the audio element.
      </audio>
      <Timer onStatusChange={handleTimerStatusChange} onPauseMusic={handlePauseWrapper} />
    </div>
  );
};

export default BalanceMusic;
