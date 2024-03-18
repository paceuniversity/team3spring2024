import React, { useState } from "react";
import "../App.css";
import "../questions.css";
import { Button, Card, CardBody, Form, FormLabel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const Question3 = () => {
  const [cycleLength, setCycleLength] = useState("");

  const handleChange = (e) => {
    setCycleLength(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted age:", cycleLength);
    // Redirect to question 4
    window.location.href = "/question4";
  };

  const handleSkip = () => {
    console.log("User chose to skip");
    // Redirect to question 4
    window.location.href = "/question4";
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
                  <FormLabel className="question">How long is your average cycle length?</FormLabel>
                  <Form.Control className="custom-input"
                    type="number"
                    id="cycleLength"
                    name="cycleLength"
                    placeholder="Enter number of days"
                    min="0"
                    value={cycleLength}
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

export default Question3;
