import React, { useState, useEffect } from 'react';
import Timer from './Timer'; // Import the Timer component
import Relax from './Relax.mp3'; // Import the song

const RelaxMusic = ({ onPauseMusic }) => {
<<<<<<< HEAD
  const [audio, setAudio] = useState(null);
  const [timerStarted, setTimerStarted] = useState(false);
  const [pausedTime, setPausedTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioPosition, setAudioPosition] = useState(0);
=======
  const [audio, setAudio] = useState(null); // State to manage the audio element
  const [timerStarted, setTimerStarted] = useState(false); // State to track if the timer has started
>>>>>>> main

  // Effect to handle cleanup when component unmounts
  useEffect(() => {
    return () => {
      // Cleanup: Pause audio and notify parent component when unmounting
      if (audio) {
        audio.pause(); // Pause the audio
        onPauseMusic(); // Notify the parent component about pausing music
      }
    };
  }, [audio, onPauseMusic]); // Dependencies include 'audio' and 'onPauseMusic'

  // Function to start playing the music
  const startMusic = () => {
    if (!audio) {
<<<<<<< HEAD
      const audioElement = new Audio(Relax);
      audioElement.currentTime = pausedTime;
      audioElement.play();
      setAudio(audioElement);
      setIsPlaying(true);
      setTimerStarted(true);
    } else {
      audio.play();
      setIsPlaying(true);
=======
      const audioElement = new Audio(Relax); // Create new audio element
      audioElement.play(); // Play the audio
      setAudio(audioElement); // Set the audio state
      setTimerStarted(true); // Set timer started state to true
    } else {
      audio.play(); // If audio exists, resume playing
>>>>>>> main
    }
  };

  // Function to pause the music
  const pauseMusic = () => {
    if (audio) {
      audio.pause(); // Pause the audio
    }
  };

  // Function to handle timer status change
  const handleTimerStatusChange = (isActive) => {
    if (isActive) {
      startMusic(); // If timer is active, start playing music
    } else {
      pauseMusic(); // If timer is inactive, pause the music
      setTimerStarted(false); // Set timer started state to false
    }
  };

  // JSX to render the component
  return (
    <div className="music-player">
      <h2>Now Playing</h2>
      {!timerStarted && ( // Render audio element if timer is not started
        <audio controls preload="auto" duration="120">
          <source src={Relax} type="audio/mpeg" /> {/* Source of the audio */}
          Your browser does not support the audio element. {/* Fallback message */}
        </audio>
      )}
      <Timer onStatusChange={handleTimerStatusChange} onPauseMusic={pauseMusic} /> {/* Timer component */}
    </div>
  );
};

export default RelaxMusic; // Export the RelaxMusic component
