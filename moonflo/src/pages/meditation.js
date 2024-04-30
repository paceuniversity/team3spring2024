import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import MusicPlayer from '../components/MusicPlayer';
import Timer from '../components/Timer';
import PeaceMusic from '../components/peaceMusic';
import RelaxMusic from '../components/relaxMusic';
import BalanceMusic from '../components/balanceMusic';
import ElevateMusic from '../components/elevateMusic';
import './meditation.css';
import { BsArrowLeft } from 'react-icons/bs';
// Importing images
import relaxImg from '../img/relax.png';
import peaceImg from '../img/peace.png';
import balanceImg from '../img/balance.png';
import elevateImg from '../img/elevate.png';

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
                  <img src={relaxImg} alt="Relax" />
                  Relax
                </button>
                <button onClick={() => handleMusicSelection('Peace')}>
                  <img src={peaceImg} alt="Peace" />
                  Peace
                </button>
                <button onClick={() => handleMusicSelection('Balance')}>
                  <img src={balanceImg} alt="Balance" />
                  Balance
                </button>
                <button onClick={() => handleMusicSelection('Elevate')}>
                  <img src={elevateImg} alt="Elevate" />
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
