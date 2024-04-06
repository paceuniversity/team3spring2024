import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Card } from 'react-bootstrap';
import '../Calendar.css';
import NavBar from '../components/NavBar';
import { ref, set, get } from 'firebase/database';
import { database, auth } from '../FirebaseConfig'; // Import FirebaseConfig

const PeriodCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [predictedPeriodDates, setPredictedPeriodDates] = useState([]);
  const [lastPeriodDates, setLastPeriodDates] = useState([]);
  const location = useLocation();
  const currentUser = auth.currentUser; // Get the current authenticated user

  useEffect(() => {
    if (currentUser) {
      const userRef = ref(database, `users/${currentUser.uid}`); // Reference to the current user's node

      const queryParams = new URLSearchParams(location.search);
      const lastPeriodDateString = queryParams.get('lastPeriod');
      const cycleLength = parseInt(queryParams.get('cycleLength'));
      const periodLength = parseInt(queryParams.get('periodLength'));

      if (lastPeriodDateString && cycleLength && periodLength) {
        // Store user's information under their UID node in Firebase Realtime Database
        set(userRef, {
          lastPeriodDate: lastPeriodDateString,
          cycleLength: cycleLength,
          periodLength: periodLength
        });
      }

      // Retrieve user's information from Firebase Realtime Database
      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          const userInfo = snapshot.val();
          const storedLastPeriodDate = userInfo.lastPeriodDate;
          const storedCycleLength = userInfo.cycleLength;
          const storedPeriodLength = userInfo.periodLength;

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
        }
      }).catch((error) => {
        console.error("Error getting data:", error);
      });
    }
  }, [location, currentUser]);

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
    <div className='parent-calender-container'>
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
