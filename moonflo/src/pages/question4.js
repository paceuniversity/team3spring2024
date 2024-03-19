import React, { useState } from "react";
import "../App.css";
import "../questions.css";
import { Button, Card, CardBody, Form, FormLabel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const Question4 = () => {
  const [periodLength, setPeriodLength] = useState("");

  const handleChange = (e) => {
    setPeriodLength(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted age:", periodLength);
    
   // window.location.href = "";  use to redirect to next page
  };

  const handleSkip = () => {
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
                    type="number"
                    id="periodLength"
                    name="periodLength"
                    placeholder="Enter number of days"
                    min="0"
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
