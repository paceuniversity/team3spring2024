// SymptomTracker.js
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { BsDroplet, BsEmojiNeutral, BsEmojiTear, BsHeart, BsLightning } from 'react-icons/bs';
import './Symptoms.css'; 

const SymptomTracker = ({ selectedDate, onClose }) => {
  // State to track selected symptoms
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const iconSize = 40;

  // Function to handle symptom selection
  const handleSymptomSelect = (symptom) => {
    setSelectedSymptoms([...selectedSymptoms, symptom]);
  };

  // Function to handle submission and close popup
  const handleSubmit = () => {
    // You can handle submission logic here, such as saving the symptoms to the database
    onClose();
  };

  return (
    <div className="symptom-tracker-popup">
      <div className="symptom-tracker-content">
        <h2>Track Your Symptoms!</h2>
        <h4>Date Selected: {selectedDate.toDateString()}</h4>
        <br></br>
        <h4>Select the following you are experiencing</h4>
        <div className="button-container">
          <Button className="Period"><BsDroplet size={iconSize} /> <br />Period</Button>
          <Button className="Pain"><BsEmojiTear size={iconSize} /> <br />Pain</Button>
          <Button className="Energy"><BsLightning size={iconSize} /> <br />Energy</Button>
          <Button className="Moody"><BsEmojiNeutral size={iconSize} /> <br />Moody</Button>
          <Button className="Sexual-Activity"><BsHeart size={iconSize} /> <br />Sexual Activity</Button>
        </div>
        <br></br>
        <button onClick={handleSubmit}>Save</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SymptomTracker;
