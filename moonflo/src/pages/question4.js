import React, { useState } from "react";
import { Button, Card, CardBody, Form, FormLabel } from "react-bootstrap";
import { useLocation, useNavigate } from 'react-router-dom';
import { ref, set } from 'firebase/database';
import { database, auth } from '../FirebaseConfig';
import 'bootstrap/dist/css/bootstrap.min.css';

const Question4 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const age = queryParams.get('age');
  const lastPeriod = queryParams.get('lastPeriod');
  const cycleLength = queryParams.get('cycleLength');
  const [periodLength, setPeriodLength] = useState("");

  const handleChange = (e) => {
    setPeriodLength(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentUser = auth.currentUser;
    if (currentUser) {
      const userRef = ref(database, `users/${currentUser.uid}`);

      set(userRef, {
        age: age,
        lastPeriod: lastPeriod,
        cycleLength: cycleLength,
        periodLength: periodLength
      }).then(() => {
        // Navigation to the Calendar page after successful storage
        navigate('/calendar');
      }).catch((error) => {
        console.error("Error storing data:", error);
        // Handle error here, maybe display a message to the user
      });
    }
  };

  const handleSkip = () => {
    navigate('/calendar');
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
                  <Form.Control
                    className="custom-input"
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
