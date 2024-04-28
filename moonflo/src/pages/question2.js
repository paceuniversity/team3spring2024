import React, { useState } from "react";
import "../App.css";
import "./questions.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Card, CardBody, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';


const Question2 = () => {
  const navigate = useNavigate(); // used to pass data between pages
  const location = useLocation(); // used to access data passed
  const queryParams = new URLSearchParams(location.search);
  const age = queryParams.get('age'); // get the age of user from previous question

  const [lastPeriod, setLastPeriod] = useState(null);

  // when user clicks next
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/question3?age=${age}&lastPeriod=${lastPeriod}`); // navigate to next page with data
  };

  // when user clicks skip
  const handleSkip = () => {
    console.log("User chose to skip");
    navigate(`/question3?age=${age}&lastPeriod=${lastPeriod}`); // navigate to next page with data
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
