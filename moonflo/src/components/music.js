import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { BsDroplet, BsEmojiNeutral, BsEmojiTear, BsHeart, BsLightning, BsXCircle } from 'react-icons/bs';
import './music.css';
import { ref, set, get } from 'firebase/database';
import { database, auth } from '../FirebaseConfig';

const Music = ({ selectedDate, onClose }) => {
  const [selectedMusic, setSelectedMusic] = useState([]);
  const iconSize = 40;
  const currentUser = auth.currentUser;

  const handleMusicSelect = (music) => {
    if (selectedMusic.includes(music)) {
      setSelectedMusic(selectedMusic.filter(item => item !== music));
    } else {
      setSelectedMusic([...selectedMusic, music]);
    }
  };

  const handleSubmit = () => {
    const userRef = ref(database, `users/${currentUser.uid}/music/${selectedDate.toDateString()}`);
    set(userRef, selectedMusic);
  };

  useEffect(() => {
    if (currentUser) {
      const userRef = ref(database, `users/${currentUser.uid}/music/${selectedDate.toDateString()}`);
      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          setSelectedMusic(snapshot.val());
        }
      }).catch((error) => {
        console.error("Error getting data:", error);
      });
    }
  }, [currentUser, selectedDate]);

  return (
    <div className="music-popup">
      <div className="music-content">
        <h2>Pick a song to start your meditation session</h2>
        <div className="music-button-container">
          <Button 
            className={`Relax ${selectedMusic.includes('Relax') ? 'selected' : ''}`} 
            onClick={() => handleMusicSelect('Relax')}
          >
            <BsDroplet size={iconSize} /> <br />Relax
          </Button>
          <Button 
            className={`Peace ${selectedMusic.includes('Peace') ? 'selected' : ''}`} 
            onClick={() => handleMusicSelect('Peace')}
          >
            <BsEmojiTear size={iconSize} /> <br />Peace
          </Button>
          <Button 
            className={`Balance ${selectedMusic.includes('Balance') ? 'selected' : ''}`} 
            onClick={() => handleMusicSelect('Balance')}
          >
            <BsLightning size={iconSize} /> <br />Balance
          </Button>
          <Button 
            className={`Elevate ${selectedMusic.includes('Elevate') ? 'selected' : ''}`} 
            onClick={() => handleMusicSelect('Elevate')}
          >
            <BsEmojiNeutral size={iconSize} /> <br />Elevate
          </Button>
          <Button 
            className={`Soaring ${selectedMusic.includes('Soaring') ? 'selected' : ''}`} 
            onClick={() => handleMusicSelect('Soaring')}
          >
            <BsHeart size={iconSize} /> <br />Soaring
          </Button>
        </div>
        <br></br>
      </div>
    </div>
  );
};

export default Music;
