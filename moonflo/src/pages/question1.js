import React, { useState } from "react";
import "../App.css";

const Question1 = () => {
  const [age, setAge] = useState("");

  const handleChange = (e) => {
    setAge(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log("Submitted age:", age);

    window.location.href = "/question2"; // redirect to question 2
  };

  const handleSkip = () => {
    console.log("User chose to skip");
    window.location.href = "/question2"; // redirect to question 2
  };

  return (
    <div className="questions_container">
      <h4>To help us better predict your period cycle, please answer the following questions</h4>
      <form onSubmit={handleSubmit}>
        <label htmlFor="age">How old are you?</label>
        <br></br>
        <input
          type="number"
          id="age"
          name="age"
          value={age} // saved user's age
          onChange={handleChange} 
          required // makes age a requirement before user hits next
        />
        <br></br>
        <button type="submit">Next</button>
        <button type="button" onClick={handleSkip}>Skip</button>
      </form>
    </div>
  );
};

export default Question1;
