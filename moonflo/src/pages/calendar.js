import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Card } from 'react-bootstrap';
import '../Calendar.css';
import NavBar from '../components/NavBar';
import { ref, get, onValue, off } from 'firebase/database';
import { database, auth } from '../FirebaseConfig';
import SymptomTracker from '../components/Symptoms';
import { Link } from 'react-router-dom';

const PeriodCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [predictedPeriodDates, setPredictedPeriodDates] = useState([]);
  const [lastPeriodDates, setLastPeriodDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showSymptomTracker, setShowSymptomTracker] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('');
  const [trackedSymptomDates, setTrackedSymptomDates] = useState([]);
  const currentUser = auth.currentUser;


  useEffect(() => {
    if (currentUser) {
      const userRef = ref(database, `users/${currentUser.uid}`);

      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userInfo = snapshot.val();
            const lastPeriodDateString = userInfo.lastPeriod;
            const cycleLength = parseInt(userInfo.cycleLength);
            const periodLength = parseInt(userInfo.periodLength);

            console.log("Retrieved user info:", userInfo);

            if (lastPeriodDateString && cycleLength > 0 && periodLength > 0) {
              const lastPeriodDate = new Date(lastPeriodDateString);

              const predictedStartDate = new Date(lastPeriodDate);
              predictedStartDate.setDate(predictedStartDate.getDate() + cycleLength);

              const predictedDates = [];
              for (let i = 0; i < periodLength; i++) {
                const predictedDate = new Date(predictedStartDate);
                predictedDate.setDate(predictedStartDate.getDate() + i);
                predictedDates.push(predictedDate);
              }

              setPredictedPeriodDates(predictedDates);

              const lastPeriodDates = [];
              for (let j = 0; j < periodLength; j++) {
                const lastPeriodDate = new Date(lastPeriodDateString);
                lastPeriodDate.setDate(lastPeriodDate.getDate() + j);
                lastPeriodDates.push(lastPeriodDate);
              }
              setLastPeriodDates(lastPeriodDates);

              // cal for period phase 
              const calculateCurrentPhase = (cycleLength) => {
                if (lastPeriodDates.length > 0 && cycleLength > 0) {
                  const today = new Date();
                  const daysSinceLastPeriod = Math.round((today - new Date(lastPeriodDates)) / (1000 * 60 * 60 * 24));
            
                  if (daysSinceLastPeriod <= cycleLength) {
                    setCurrentPhase('Menstruation');
                  } else if (daysSinceLastPeriod <= cycleLength + 4) {
                    setCurrentPhase('Follicular Phase');
                  } else if (daysSinceLastPeriod <= cycleLength + 14) {
                    setCurrentPhase('Ovulation');
                  } else {
                    setCurrentPhase('Luteal Phase');
                  }
                }
              };
              // updates the current phase based on user input from firebase
              calculateCurrentPhase(cycleLength);
            } else {
              console.warn('Missing or invalid data for period calculations');
            }
          }
        })
        .catch((error) => {
          console.error("Error getting data:", error);
        });

      const userSymptomsRef = ref(database, `users/${currentUser.uid}/symptoms`);

      const handleSymptomData = (snapshot) => {
        if (snapshot.exists()) {
          const symptomDates = Object.keys(snapshot.val());
          setTrackedSymptomDates(symptomDates);
        }
      };

      // Listen for changes to symptom data
      onValue(userSymptomsRef, handleSymptomData);

      return () => {
        // Stop listening for changes when the component unmounts
        off(userSymptomsRef, handleSymptomData);
      };
    }
  }, [currentUser]);

  useEffect(() => {
    if (showSymptomTracker) {
      // Fetch symptom data again if the SymptomTracker is shown
      const userSymptomsRef = ref(database, `users/${currentUser.uid}/symptoms`);
      get(userSymptomsRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const symptomDates = Object.keys(snapshot.val());
            setTrackedSymptomDates(symptomDates);
          }
        })
        .catch((error) => {
          console.error("Error getting symptom data:", error);
        });
    }
  }, [showSymptomTracker, currentUser]);

  const tileClassName = ({ date }) => {
    if (trackedSymptomDates.includes(date.toDateString())) {
      return 'tracked-symptom';
    }
    if (predictedPeriodDates.find((d) => d.toDateString() === date.toDateString())) {
      return 'predicted-period';
    }
    if (lastPeriodDates.find((d) => d.toDateString() === date.toDateString())) {
      return 'last-period';
    }
    return '';
  };

  const handleDateClick = (value) => {
    if (value <= new Date()) {
      setSelectedDate(value);
      setShowSymptomTracker(true);
    } else {
      alert('Please select a past or current date.');
    }
  };

  const handleCloseSymptomTracker = () => {
    setShowSymptomTracker(false);
    setSelectedDate(null);
  };

  return (
    <div className="parent-calendar-container">
      <Card className="calendar">
        <Card.Title className="title">Period Calendar</Card.Title>
        <Card.Body>
          <div className="calendar-container">
            <Calendar
              onChange={setDate}
              value={date}
              tileClassName={tileClassName}
              calendarType="US"
              onClickDay={handleDateClick}
            />
          </div>
          <div className="current-phase">
             <p>You're currently in <span style={{ fontWeight: 'bold', color: 'maroon', fontSize: '24px' }}>{currentPhase}</span>. <Link to="/periodInfo">Learn more about your cycle</Link></p> 
          </div>

          <p className="caption">*Select a date to track a symptom</p>
          <h5 className="calendar-key">Calendar Key:</h5>
          <ul className="calendar-key-list">
            <li className="calendar-key-last">Last period</li>
            <li className="calendar-key-next">Predicted next period</li>
            <li className="calendar-key-tracked">Symptoms tracked</li>
          </ul>
        </Card.Body>
      </Card>
      {showSymptomTracker && selectedDate && (
        <SymptomTracker selectedDate={selectedDate} onClose={handleCloseSymptomTracker} />
      )}
      <NavBar />
    </div>
  );
};

export default PeriodCalendar;