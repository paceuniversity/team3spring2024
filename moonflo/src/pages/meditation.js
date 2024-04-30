import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import MusicPlayer from '../components/MusicPlayer';
import Timer from '../components/Timer';
import PeaceMusic from '../components/peaceMusic';
import RelaxMusic from '../components/relaxMusic';
import BalanceMusic from '../components/balanceMusic';
import ElevateMusic from '../components/elevateMusic';
import './periodInfo.css';
import { BsArrowLeft } from 'react-icons/bs';

const Meditation = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [selectedMusic, setSelectedMusic] = useState('');

  const handleClick = (component) => {
    setActiveComponent(component);
  };

  const handleBack = () => {
    setActiveComponent(null);
  };

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

  return (
    <div>
      {activeComponent && (
        <div className="backButton" onClick={handleBack}>
          <BsArrowLeft />
          Back
        </div>
      )}
      <div className="floatingHeader">Meditation</div> 
      <div className="infoContainer">
      <p>First time meditating? <br></br><Link to="/medInfo">Learn how to meditate here</Link></p> 
        {activeComponent === 'music' ? (
          <MusicPlayer selectedMusic={selectedMusic} />
        ) : activeComponent === 'peaceMusic' ? (
          <PeaceMusic />
        ) : activeComponent === 'relaxMusic' ? ( 
        <RelaxMusic />
        ) : activeComponent === 'balanceMusic' ? ( 
        <BalanceMusic />
        ) : activeComponent === 'elevateMusic' ? ( 
        <ElevateMusic />
        ) : (
          <div className="music-popup">
            <div className="music-content">
              <h2>Pick a song to start your meditation session</h2>
              <div className="music-button-container">
                <button onClick={() => handleMusicSelection('Relax')}>
                  Relax
                </button>
                <button onClick={() => handleMusicSelection('Peace')}>
                  Peace
                </button>
                <button onClick={() => handleMusicSelection('Balance')}>
                  Balance
                </button>
                <button onClick={() => handleMusicSelection('Elevate')}>
                  Elevate
                </button>
              </div>
              <br></br>
            </div>
          </div>
        )}
        <NavBar />
      </div>
      {activeComponent === 'music' && <Timer />}
    </div>
  );
};

export default Meditation;
