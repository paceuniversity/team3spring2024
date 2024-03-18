import React, { useState } from "react";
import "../App.css";
import "../questions.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Card, CardBody, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const Question2 = () => {
  const [lastPeriod, setLastPeriod] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log("Submitted last period:", lastPeriod);

    window.location.href = "/question3"; // Redirects to next question
  };

  const handleSkip = () => {
    console.log("User chose to skip");
    window.location.href = "/question3"; // Redirects to next question
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
                <Form.Group controlId="lastPeriod">
                  <Form.Label className="question" >When was your last period?</Form.Label>
                  <br></br>
                  <DatePicker // Date picker component
                    dateFormat="MM-dd-yyyy" // Set the date format and placeholder
                    placeholderText="mm-dd-yyyy"
                    selected={lastPeriod}
                    onChange={date => setLastPeriod(date)}
                    required
                    className="form-control" // Bootstrap class to style the date picker
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

export default Question2;
