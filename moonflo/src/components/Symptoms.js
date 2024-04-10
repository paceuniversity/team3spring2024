import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { BsDroplet, BsEmojiNeutral, BsEmojiTear, BsHeart, BsLightning, BsXCircle } from 'react-icons/bs';
import './Symptoms.css';
import { ref, set, get } from 'firebase/database';
import { database, auth } from '../FirebaseConfig';

const SymptomTracker = ({ selectedDate, onClose }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const iconSize = 40;
  const currentUser = auth.currentUser;

  const handleSymptomSelect = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(item => item !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleSubmit = () => {
    const userRef = ref(database, `users/${currentUser.uid}/symptoms/${selectedDate.toDateString()}`);
    set(userRef, selectedSymptoms);
  };

  useEffect(() => {
    if (currentUser) {
      const userRef = ref(database, `users/${currentUser.uid}/symptoms/${selectedDate.toDateString()}`);
      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          setSelectedSymptoms(snapshot.val());
        }
      }).catch((error) => {
        console.error("Error getting data:", error);
      });
    }
  }, [currentUser, selectedDate]);

  return (
    <div className="symptom-tracker-popup">
      <div className="symptom-tracker-content">
      <a href="#" onClick={onClose} className="x-circle-button">
        <BsXCircle size={30}/>
      </a>
        <h2>Track Your Symptoms!</h2>
        <h4>Date Selected: {selectedDate.toDateString()}</h4>
        <br></br>
        <h4>Select the following you are experiencing</h4>
        <div className="symptoms-button-container">
          <Button 
            className={`Period ${selectedSymptoms.includes('Period') ? 'selected' : ''}`} 
            onClick={() => handleSymptomSelect('Period')}
          >
            <BsDroplet size={iconSize} /> <br />Period
          </Button>
          <Button 
            className={`Pain ${selectedSymptoms.includes('Pain') ? 'selected' : ''}`} 
            onClick={() => handleSymptomSelect('Pain')}
          >
            <BsEmojiTear size={iconSize} /> <br />Pain
          </Button>
          <Button 
            className={`Energy ${selectedSymptoms.includes('Energy') ? 'selected' : ''}`} 
            onClick={() => handleSymptomSelect('Energy')}
          >
            <BsLightning size={iconSize} /> <br />Energy
          </Button>
          <Button 
            className={`Moody ${selectedSymptoms.includes('Moody') ? 'selected' : ''}`} 
            onClick={() => handleSymptomSelect('Moody')}
          >
            <BsEmojiNeutral size={iconSize} /> <br />Moody
          </Button>
          <Button 
            className={`Sexual-Activity ${selectedSymptoms.includes('Sexual-Activity') ? 'selected' : ''}`} 
            onClick={() => handleSymptomSelect('Sexual-Activity')}
          >
            <BsHeart size={iconSize} /> <br />Sexual Activity
          </Button>
        </div>
        <br></br>
        <Button onClick={handleSubmit} className="save-button">Save</Button>
      </div>
    </div>
  );
};

export default SymptomTracker;
