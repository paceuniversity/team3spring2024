import React, { useState } from 'react';


const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion">
      <button onClick={() => setIsOpen(!isOpen)}>{title}</button>
      {isOpen && <div>{content}</div>}
    </div>
  );
};

export default Accordion;