import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import "../App.css";

const Question1 = () => {
  const [age, setAge] = useState("");

  const handleChange = (e) => {
    setAge(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can perform any actions with the entered age, such as validation or submission
    console.log("Submitted age:", age);

    // Navigate to the next question
    // You can use useHistory hook here if you're using functional components
    // Or you can use this.props.history.push('/question2') if you're using class components

    // Here we use the Link component to navigate to '/question2'
    window.location.href = "/question2";
  };

  const handleSkip = () => {
    // Here you can define the action when the user chooses to skip
    console.log("User chose to skip");
    window.location.href = "/question2";
  };

  return (
    <div className="questions_container">
      <h4>To help us better predict your period cycle, please answer the following questions</h4>
      <form onSubmit={handleSubmit}>
        <label htmlFor="age">How old are you?</label>
        <input
          type="number"
          id="age"
          name="age"
          value={age}
          onChange={handleChange}
          placeholder="Enter your age"
          required
        />
        {/* Use Link component to navigate */}
        <button type="submit">Next</button>
        <button type="button" onClick={handleSkip}>Skip</button>
      </form>
    </div>
  );
};

export default Question1;
