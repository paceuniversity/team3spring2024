import React, { useState } from 'react';



const Accordion = ({ title, content, isOpen, onClick }) => {
  return (
    <div className="accordion">
      <button onClick={onClick}>{title}</button>
      {isOpen && <div className="accordion-content">{content}</div>}
    </div>
  );
};


export default Accordion;