import React, { useState } from "react";
import NavBar from "../components/NavBar";
import './periodInfo.css';
import LearnMedi from "./learnMedi";
import menstruation from "../img/menstruation.jpg";
import meditation from "../img/meditation.jpg";
import CycleInfo from "./cycleinfo";
import { BsArrowLeft } from 'react-icons/bs'; 

const MedInfo = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleClick = (component) => {
    setActiveComponent(component); // Update activeComponent based on clicked image
  };

  const handleBack = () => {
    setActiveComponent(null); // Set activeComponent to null to go back to the content page
  };

  return (
    <div className="medInfoContainer">
      {activeComponent && (
        <div className="backButton" onClick={handleBack}>
          <BsArrowLeft /> {/* Render the arrow left icon */}
          Back
        </div>
      )}
      <div className="floatingHeader">Content</div>
      <div className="infoContainer">
        {/* Render images based on activeComponent */}
        {activeComponent === null && (
          <>
            <a href="#" onClick={() => handleClick('menstruation')}>
              <img src={menstruation} alt="Menstruation" />
              <div className="content-caption">Menstruation</div>
            </a>
            <a href="#" onClick={() => handleClick('meditation')}>
              <img src={meditation} alt="Meditation" />
              <div className="content-caption">Meditation</div>
            </a>
          </>
        )}
        {activeComponent === 'meditation' && <LearnMedi />}
        {activeComponent === 'menstruation' && <CycleInfo />}
        <NavBar />
      </div>
      <h1 className="hidden">..</h1>
    </div>
  );
};

export default MedInfo;
