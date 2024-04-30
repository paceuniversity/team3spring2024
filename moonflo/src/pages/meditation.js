import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import MusicPlayer from '../components/MusicPlayer'; // import MusicPlayer
import Timer from '../components/Timer'; // import Timer
import PeaceMusic from '../components/peaceMusic';// import peace music
import RelaxMusic from '../components/relaxMusic';// import relax music 
import BalanceMusic from '../components/balanceMusic';// import balance music
import ElevateMusic from '../components/elevateMusic';// import elevate music
import './meditation.css';
import { BsArrowLeft } from 'react-icons/bs';
// Importing images
import relaxImg from '../img/relax.png';
import peaceImg from '../img/peace.png';
import balanceImg from '../img/balance.png';
import elevateImg from '../img/elevate.png';

// Define the Meditation component
const Meditation = () => {
  // State variables to manage active component and selected music
  const [activeComponent, setActiveComponent] = useState(null);
  const [selectedMusic, setSelectedMusic] = useState(null);
  
  // Function to handle click event and set active component
  const handleClick = (component) => {
    setActiveComponent(component);
  };

  // Function to handle back button click and reset active component
  const handleBack = () => {
    // Stop the music if it's playing
  if (activeComponent === 'relaxMusic') {
    // Set selectedMusic to null to reset MusicPlayer component
    setSelectedMusic(null);
  }
  setActiveComponent(null);
  };

  // Function to handle music selection and set active component accordingly
  const handleMusicSelection = (music) => {
    setSelectedMusic(music);
    if (music === 'Peace') {
      setActiveComponent('peaceMusic');
    } else if (music === 'Relax') {
      setActiveComponent('relaxMusic');
    } else if (music === 'Balance') {
      setActiveComponent('balanceMusic');
    } else if (music === 'Elevate') {
      setActiveComponent('elevateMusic');
    } else {
      setActiveComponent('music');
    }
  };

  // JSX structure for the Meditation component
  return (
    <div>
      {/* Render back button if activeComponent is set */}
      {activeComponent && (
        <div className="backButton" onClick={handleBack}>
          <BsArrowLeft />
          Back
        </div>
      )}
      {/* Header for the Meditation section */}
      <div className="floatingHeader">Meditation</div>
      {/* Container for information and components */}
      <div className="infoContainer">
        {/* Information for first-time meditators */}
        <p>
          First time meditating? <br></br>
          <Link to="/medInfo">Learn how to meditate here</Link>
        </p>
        {/* Conditional rendering based on activeComponent */}
        {activeComponent === 'music' ? (
          <MusicPlayer selectedMusic={selectedMusic} />
        ) : activeComponent === 'peaceMusic' ? (
          <PeaceMusic onPauseMusic={() => setActiveComponent(null)}  />
        ) : activeComponent === 'relaxMusic' ? (
          <RelaxMusic onPauseMusic={() => setActiveComponent(null)}  />
        ) : activeComponent === 'balanceMusic' ? (
          <BalanceMusic onPauseMusic={() => setActiveComponent(null)} />
        ) : activeComponent === 'elevateMusic' ? (
          <ElevateMusic onPauseMusic={() => setActiveComponent(null)} />
        ) : (
          // Render music selection options if no activeComponent is set
          <div className="music-popup">
            <div className="music-content">
              <h2>Pick a song to start</h2>
              <h2>your meditation session</h2>
              <div className="music-button-container">
                <button onClick={() => handleMusicSelection('Relax')}>
                  <img src={relaxImg} alt="Relax" />
                  Relax
                </button>
                <button  onClick={() => handleMusicSelection('Peace')}>
                  <img src={peaceImg} alt="Peace" />
                  Peace
                </button>
                <button  onClick={() => handleMusicSelection('Balance')}>
                  <img src={balanceImg} alt="Balance" />
                  Balance
                </button>
                <button  onClick={() => handleMusicSelection('Elevate')}>
                  <img src={elevateImg} alt="Elevate" />
                  Elevate
                </button>
              </div>
              <br></br>
            </div>
          </div>
        )}
        {/* Render navigation bar */}
        <NavBar />
      </div>
      {/* Render timer component if activeComponent is 'music' */}
      {activeComponent === 'music' && <Timer />}
    </div>
  );
};


export default Meditation;
