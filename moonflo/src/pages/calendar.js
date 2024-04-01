import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Card } from 'react-bootstrap';
import '../Calendar.css';
import NavBar from '../components/NavBar';

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

    if (lastPeriodDateString && cycleLength && periodLength) {
      // store user's information in local storage
      localStorage.setItem('lastPeriodDate', lastPeriodDateString);
      localStorage.setItem('cycleLength', cycleLength);
      localStorage.setItem('periodLength', periodLength);
    }

    // retrieve user's information from local storage
    const storedLastPeriodDate = localStorage.getItem('lastPeriodDate');
    const storedCycleLength = parseInt(localStorage.getItem('cycleLength'));
    const storedPeriodLength = parseInt(localStorage.getItem('periodLength'));

    if (
      (lastPeriodDateString && cycleLength && periodLength) || // check if information is available in URL
      (storedLastPeriodDate && storedCycleLength && storedPeriodLength) // check if information is available in local storage
    ) {
      const lastPeriodDate = new Date(lastPeriodDateString || storedLastPeriodDate);
      const cycleLengthToUse = cycleLength || storedCycleLength;
      const periodLengthToUse = periodLength || storedPeriodLength;

      const predictedStartDate = new Date(lastPeriodDate);
      predictedStartDate.setDate(predictedStartDate.getDate() + cycleLengthToUse);

      const predictedDates = []; // store predicted dates
      // calculate predicted dates based on user's info
      for (let i = 0; i < periodLengthToUse; i++) {
        const predictedDate = new Date(predictedStartDate);
        predictedDate.setDate(predictedStartDate.getDate() + i);
        predictedDates.push(predictedDate);
      }

      setPredictedPeriodDates(predictedDates);

      const lastPeriodDates = []; // stores last period dates
      // calculates last period dates based on user's info
      for (let j = 0; j < periodLengthToUse; j++) {
        const lastPeriodDate = new Date(lastPeriodDateString || storedLastPeriodDate);
        lastPeriodDate.setDate(lastPeriodDate.getDate() + j);
        lastPeriodDates.push(lastPeriodDate);
      }
      setLastPeriodDates(lastPeriodDates);
    }
  }, [location]);

  const tileClassName = ({ date }) => {
    if (predictedPeriodDates.find((d) => d.toDateString() === date.toDateString())) {
      return 'predicted-period';
    }
    if (lastPeriodDates.find((d) => d.toDateString() === date.toDateString())) {
      return 'last-period';
    }
    return '';
  };

  return (
    <div>
      <Card className='calendar'>
        <Card.Title className='title'>Period Calendar</Card.Title>
        <Card.Body>
          <div className="calendar-container">
            <Calendar onChange={setDate} value={date} tileClassName={tileClassName} calendarType='US' />
          </div>
        </Card.Body>
      </Card>
      <NavBar /> 
    </div>
  );
};

export default PeriodCalendar;
