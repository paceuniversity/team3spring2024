import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Card } from 'react-bootstrap';
import '../Calendar.css';

const PeriodCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [predictedPeriodDates, setPredictedPeriodDates] = useState([]);
  const [lastPeriodDates, setLastPeriodDates] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const lastPeriodDateString = queryParams.get('lastPeriod'); // gets user's last period info
    const cycleLength = parseInt(queryParams.get('cycleLength')); // gets user's cycle length info
    const periodLength = parseInt(queryParams.get('periodLength')); // gets user's period length info

    // checking if we have all of the user's required data
    if (lastPeriodDateString && cycleLength && periodLength) {
      const lastPeriodDate = new Date(lastPeriodDateString);
      // calculating predicted start date for next period
      const predictedStartDate = new Date(lastPeriodDate);
      predictedStartDate.setDate(predictedStartDate.getDate() + cycleLength);

      const predictedDates = []; // stores predicted period dates
      // calculates predicted period dates based on the user's period length
      for (let i = 0; i < periodLength; i++) {
        const predictedDate = new Date(predictedStartDate);
        predictedDate.setDate(predictedStartDate.getDate() + i);
        predictedDates.push(predictedDate);
      }

      setPredictedPeriodDates(predictedDates);

      const lastPeriodDates = []; // stores dates of last period
      for (let j = 0; j < periodLength; j++) {
        const lastPeriodDate = new Date(lastPeriodDateString);
        lastPeriodDate.setDate(lastPeriodDate.getDate() + j);
        lastPeriodDates.push(lastPeriodDate);
      }
      setLastPeriodDates(lastPeriodDates);
    }
  }, [location]);

  const tileClassName = ({ date }) => {
    // Checking if the date is present in predicted period dates
    if (predictedPeriodDates.find((d) => d.toDateString() === date.toDateString())) {
      return 'predicted-period';
    }
    // Checking if the date is present in last period dates
    if (lastPeriodDates.find((d) => d.toDateString() === date.toDateString())) {
      return 'last-period';
    }
    return '';
  };

  return (
    <Card className='calendar'>
      <Card.Title className='title'>Period Calendar</Card.Title>
      <Card.Body>
        <div className="calendar-container">
          <Calendar onChange={setDate} value={date} tileClassName={tileClassName} calendarType='US' />
        </div>
      </Card.Body>
    </Card>
  );
};

export default PeriodCalendar;
