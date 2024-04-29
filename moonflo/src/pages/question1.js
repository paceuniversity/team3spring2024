import React, { useState } from "react";
import "../App.css";
import "./questions.css";
import { Button, Card, CardBody, Form, FormLabel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Question1 = () => {
  const navigate = useNavigate(); // used to pass data from one page to another
  const [age, setAge] = useState(""); // save the users age in a state

  const handleChange = (e) => {
    setAge(e.target.value);
  };

  // when user clicks next
  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect to question 2 while passing age data
    navigate(`/question2?age=${age}`);
    
  };

  // when user clicks skip
  const handleSkip = () => {
    console.log("User chose to skip");
    // Redirect to question 2 while passing age data
    navigate(`/question2?age=${age}`);
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
                  <FormLabel className="question">How old are you?</FormLabel>
                  <Form.Control className="custom-input"
                    type="number" // user must enter number
                    id="age"
                    name="age"
                    placeholder="Enter your age"
                    min="0" // value must be larger than 0
                    value={age}
                    onChange={handleChange}
                    required // required to fill out before clicking next
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

export default Question1;
