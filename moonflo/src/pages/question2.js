import React, { useState } from "react";
import "../App.css";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const Question2 = () => {
  const [lastPeriod, setLastPeriod] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log("Submitted last period:", lastPeriod);

    window.location.href = "/question3"; // redirects to next question
  };

  const handleSkip = () => {
    console.log("User chose to skip");
    window.location.href = "/question3"; // redirects to next question
  };

  return (
    <div className="questions_container">
      <label htmlFor="lastPeriod">When was your last period?</label>
      <form onSubmit={handleSubmit}>
        <DatePicker // uses date picker so the user can choose the date from a calendar
          selected={lastPeriod} // saves the date of last period
          onChange={date => setLastPeriod(date)}
          required
        />
        <br></br>
        <button type="submit">Next</button>
        <button type="button" onClick={handleSkip}>Skip</button>
      </form>
    </div>
  );
};

export default Question2;
