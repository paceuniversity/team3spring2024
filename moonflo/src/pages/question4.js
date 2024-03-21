import React, { useState } from "react";
import "../App.css";
import "../questions.css";
import { Button, Card, CardBody, Form, FormLabel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Question4 = () => {
  const navigate = useNavigate(); // used to pass data from one page to another
  const location = useLocation(); // used to get data from previous page
  const queryParams = new URLSearchParams(location.search);
  const age = queryParams.get('age'); // gets user's age info
  const lastPeriod = queryParams.get('lastPeriod'); // gets user's last period info
  const cycleLength = queryParams.get('cycleLength'); // gets user's cycle length info
  const [periodLength, setPeriodLength] = useState("");

  const handleChange = (e) => {
    setPeriodLength(e.target.value);
  };

  // when user clicks on next
  const handleSubmit = (e) => {
    e.preventDefault();
    // printing to the console for now
    console.log("Age from Question 1:", age);
    console.log("Submitted last period:", lastPeriod);
    console.log("Submitted cycle length:", cycleLength);
    console.log("Submitted period length:", periodLength);
    
   // window.location.href = "";  use to redirect to next page
  };

  // when user clicks on skip
  const handleSkip = () => {
    console.log("Age from Question 1:", age);
    console.log("Submitted last period:", lastPeriod);
    console.log("Submitted cycle length:", cycleLength);
    console.log("User chose to skip");
  
   // window.location.href = "";  use to redirect to next page
  };

  return (
    <div className="questions_container">
      <Card className="custom-card">
        <CardBody className="custom-body">
          <h5>To help us better predict your period cycle, please answer the following questions:</h5>
          <Card className="inner-card">
            <CardBody className="custom-body-inner">
            <a className="skip-button" onClick={handleSkip}>Skip</a>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <FormLabel className="question">How long does your period last?</FormLabel>
                  <Form.Control className="custom-input"
                    type="number" // user must enter a number
                    id="periodLength"
                    name="periodLength"
                    placeholder="Enter number of days"
                    min="0" // ensure user doesn't enter a negative number
                    value={periodLength}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Button variant="primary" className="next-button" type="submit">Next</Button>
              </Form>
            </CardBody>
          </Card>
        </CardBody>
      </Card>
    </div>
  );
};

export default Question4;
