import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Card } from 'react-bootstrap';
import '../Calendar.css';
import { ref, set, get } from 'firebase/database';
import { database, auth } from '../FirebaseConfig'; // Import FirebaseConfig

const PeriodCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [predictedPeriodDates, setPredictedPeriodDates] = useState([]);
  const [lastPeriodDates, setLastPeriodDates] = useState([]);
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (currentUser) {
      const userRef = ref(database, `users/${currentUser.uid}`);
      // Fetch user's data from Firebase Realtime Database
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userInfo = snapshot.val();
            const { lastPeriodDate, cycleLength, periodLength } = userInfo;
            const lastPeriodDateObj = new Date(lastPeriodDate);
            const cycleLengthToUse = cycleLength || 28;
            const periodLengthToUse = periodLength || 5;

            const predictedStartDate = new Date(lastPeriodDateObj);
            predictedStartDate.setDate(predictedStartDate.getDate() + cycleLengthToUse);

            const predictedDates = [];
            for (let i = 0; i < periodLengthToUse; i++) {
              const predictedDate = new Date(predictedStartDate);
              predictedDate.setDate(predictedStartDate.getDate() + i);
              predictedDates.push(predictedDate);
            }
            setPredictedPeriodDates(predictedDates);

            const lastPeriodDates = [];
            for (let j = 0; j < periodLengthToUse; j++) {
              const lastPeriodDate = new Date(lastPeriodDateObj);
              lastPeriodDate.setDate(lastPeriodDate.getDate() + j);
              lastPeriodDates.push(lastPeriodDate);
            }
            setLastPeriodDates(lastPeriodDates);
          }
        })
        .catch((error) => {
          console.error("Error getting data:", error);
        });
    }
  }, [currentUser]);

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
    <div className="calendar-container">
      <Calendar onChange={setDate} value={date} tileClassName={tileClassName} calendarType="US" />
    </div>
  );
};

export default PeriodCalendar;
