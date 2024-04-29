import React, { useState } from 'react';
import Timer from './Timer'; // Import the Timer component
import Relax from './Relax.mp3'; // import song

const RelaxMusic = () => {
  const [audio, setAudio] = useState(null); // State to control the audio element
  const [isPlaying, setIsPlaying] = useState(false); // State to control the audio playback
  const [timerStarted, setTimerStarted] = useState(false); // State to track if the timer has started

  // Function to start playing the music
  const startMusic = () => {
    const audioElement = new Audio(Relax);
    audioElement.play();
    setAudio(audioElement);
    setIsPlaying(true);
    setTimerStarted(true); // Set timerStarted to true when music starts
  };

  // Function to pause the music
  const pauseMusic = () => {
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  // Function to handle timer status change
  const handleTimerStatusChange = (isActive) => {
    if (isActive) {
      startMusic(); // Start playing the music when timer starts
    } else {
      pauseMusic(); // Pause the music when timer stops
      setTimerStarted(false); // Set timerStarted to false when timer stops
    }
  };

  return (
    <div className="music-player">
      <h2>Now Playing</h2>
      {/* Conditionally render the audio player based on timerStarted */}
      {!timerStarted && (
        <audio controls preload="auto" duration="120">
          <source src={Relax} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
      {/* Render the timer */}
      <Timer onStatusChange={handleTimerStatusChange} />
    </div>
  );
};

export default RelaxMusic;
