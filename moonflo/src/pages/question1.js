import React, { useState } from "react";
import "../App.css";
import "../questions.css";
import { Button, Card, CardBody, Form, FormLabel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const Question1 = () => {
  const [age, setAge] = useState("");

  const handleChange = (e) => {
    setAge(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted age:", age);
    // Redirect to question 2
    window.location.href = "/question2";
  };

  const handleSkip = () => {
    console.log("User chose to skip");
    // Redirect to question 2
    window.location.href = "/question2";
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
                    type="number"
                    id="age"
                    name="age"
                    placeholder="Enter your age"
                    min="0"
                    value={age}
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

export default Question1;
