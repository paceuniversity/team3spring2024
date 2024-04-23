import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Card, Button } from 'react-bootstrap'; // Import Button from react-bootstrap
import '../Calendar.css';
import NavBar from '../components/NavBar';
import { ref, get, onValue, off, update } from 'firebase/database';
import { database, auth } from '../FirebaseConfig';
import SymptomTracker from '../components/Symptoms';
import { Link } from 'react-router-dom';
import ReactDatePicker from 'react-datepicker';

const PeriodCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [predictedPeriodDates, setPredictedPeriodDates] = useState([]);
  const [lastPeriodDates, setLastPeriodDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showSymptomTracker, setShowSymptomTracker] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('');
  const [trackedSymptomDates, setTrackedSymptomDates] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [lastPeriodStartDate, setLastPeriodStartDate] = useState(new Date());
  const [userInfo, setUserInfo] = useState(null);
  const [saving, setSaving] = useState(false); // State to manage saving state

  useEffect(() => {
    const user = auth.currentUser;
    setCurrentUser(user);
  }, []);

  useEffect(() => {
    if (currentUser) {
      const userRef = ref(database, `users/${currentUser.uid}`);

      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userInfo = snapshot.val();
            setUserInfo(userInfo);
            const lastPeriodDateString = userInfo.lastPeriod;
            setLastPeriodStartDate(new Date(lastPeriodDateString));
            const cycleLength = parseInt(userInfo.cycleLength);
            const periodLength = parseInt(userInfo.periodLength);

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

              const calculateCurrentPhase = (cycleLength) => {
                if (lastPeriodDates.length > 0 && cycleLength > 0) {
                  const today = new Date();
                  const lastPeriodDate = lastPeriodDates[lastPeriodDates.length - 1];
                  const daysSinceLastPeriod = Math.round((today - lastPeriodDate) / (1000 * 60 * 60 * 24));
                  const dayWithinCycle = (daysSinceLastPeriod % cycleLength) + 1;
            
                  if (dayWithinCycle <= periodLength) {
                    setCurrentPhase('Menstruation');
                  } else if (dayWithinCycle <= cycleLength - 14) {
                    setCurrentPhase('Ovulation');
                  } else if (dayWithinCycle <= cycleLength - 4) {
                    setCurrentPhase('Luteal Phase');
                  } else {
                    setCurrentPhase('Follicular Phase');
                  }
                }
              };
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

      onValue(userSymptomsRef, handleSymptomData);

      return () => {
        off(userSymptomsRef, handleSymptomData);
      };
    }
  }, [currentUser]);

  useEffect(() => {
    if (showSymptomTracker) {
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
    const dateString = date.toDateString();
    
    if (trackedSymptomDates.includes(dateString) && lastPeriodDates.find((d) => d.toDateString() === dateString)) {
      return 'last-period';
    }
    if (trackedSymptomDates.includes(dateString)) {
      return 'tracked-symptom';
    }
    if (predictedPeriodDates.find((d) => d.toDateString() === dateString)) {
      return 'predicted-period';
    }
    if (lastPeriodDates.find((d) => d.toDateString() === dateString)) {
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

  const handleSave = () => {
    setSaving(true);
  
    const selectedDateCopy = new Date(selectedDate); // Create a copy of selectedDate
  
    const userRef = ref(database, `users/${currentUser.uid}`);
    const updates = { lastPeriod: selectedDateCopy.toDateString() };
    update(userRef, updates)
      .then(() => {
        console.log('Last period start date updated successfully!');
        // Manually update lastPeriodDates state
        const updatedLastPeriodDates = [];
        for (let j = 0; j < parseInt(userInfo.periodLength); j++) {
          const lastPeriodDate = new Date(selectedDateCopy);
          lastPeriodDate.setDate(lastPeriodDate.getDate() + j);
          updatedLastPeriodDates.push(lastPeriodDate);
        }
        setLastPeriodDates(updatedLastPeriodDates);
        // Update predicted dates if needed
        updatePredictedDates(selectedDateCopy, parseInt(userInfo.cycleLength), parseInt(userInfo.periodLength));
        setSaving(false);
      })
      .catch((error) => {
        console.error('Error updating last period:', error);
        setSaving(false);
      });
  };

  const updatePredictedDates = (lastPeriodDate, cycleLength, periodLength) => {
    const predictedStartDate = new Date(lastPeriodDate);
    predictedStartDate.setDate(predictedStartDate.getDate() + cycleLength);

    const predictedDates = [];
    for (let i = 0; i < periodLength; i++) {
      const predictedDate = new Date(predictedStartDate);
      predictedDate.setDate(predictedStartDate.getDate() + i);
      predictedDates.push(predictedDate);
    }

    setPredictedPeriodDates(predictedDates);
  };

  const handleCloseSymptomTracker = () => {
    setShowSymptomTracker(false);
    setSelectedDate(null);
  };

  return (
    <div className="parent-calendar-container">
      <Card className="current-phase">
        <Card.Body>
          <div >
             <p>You're currently in <span style={{ fontWeight: 'bold', color: 'maroon', fontSize: '18px' }}>{currentPhase}</span>. <br></br><Link to="/periodInfo">Learn more about your cycle</Link></p> 
          </div>
          </Card.Body>
      </Card>
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
          
          <div className="last-period-date">
          <label>Update the start date of your last period: </label>
          <ReactDatePicker
            selected={selectedDate || lastPeriodStartDate}
            onChange={(date) => setSelectedDate(date)}
            maxDate={new Date()} // Set maxDate to the current date
            className="custom-datepicker"
          />

          <Button className="last-period-btn" onClick={handleSave} disabled={!selectedDate || saving}>
            {saving ? 'Saving...' : 'Save'} 
          </Button>
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
       <h1 id='hidden'>.</h1>
      <h1 id='hidden'>.</h1>
      <NavBar />
    </div>
  );
};

export default PeriodCalendar;
