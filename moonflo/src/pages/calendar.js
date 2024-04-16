import React, { useState, useEffect } from 'react';
import { useLocation, Link} from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Card } from 'react-bootstrap';
import '../Calendar.css';
import NavBar from '../components/NavBar';
import { ref, set, get } from 'firebase/database';
import { database, auth } from '../FirebaseConfig'; // Import FirebaseConfig
import SymptomTracker from '../components/Symptoms';


const PeriodCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [predictedPeriodDates, setPredictedPeriodDates] = useState([]);
  const [lastPeriodDates, setLastPeriodDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // Track the selected date
  const [showSymptomTracker, setShowSymptomTracker] = useState(false); // Track whether to show symptom tracker
  const [currentPhase, setCurrentPhase] = useState('');
  const [trackedSymptomDates, setTrackedSymptomDates] = useState([]); // Store dates where symptoms are tracked
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(4); // Default cycle length
  const location = useLocation();
  const currentUser = auth.currentUser; // Get the current authenticated user

  
  useEffect(() => {
    if (currentUser) {
      const userRef = ref(database, `users/${currentUser.uid}`); // Reference to the current user's node

      const queryParams = new URLSearchParams(location.search);
      const lastPeriodDateString = queryParams.get('lastPeriod');
      const cycleLengthParam = queryParams.get('cycleLength');
      const periodLengthParam = queryParams.get('periodLength');
     
      // Parse cycleLengthParam into an integer if it's a valid number
    let cycleLength = parseInt(cycleLengthParam);
    cycleLength = isNaN(cycleLength) ? 28 : cycleLength; // Default to 28 if not a number

    let periodLength = parseInt(periodLengthParam);
    periodLength = isNaN(periodLength) ? 4 : periodLength; // Default to 5 if not a number


      console.log("lastPeriodDates:", lastPeriodDates);
      console.log("cycleLength:", cycleLength);
      console.log("periodLength:", periodLength);

      setCycleLength(cycleLength);
      setPeriodLength(periodLength); 
    
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

            // Calculate the current phase
            const today = new Date();
            const daysSinceLastPeriod = Math.round((today - lastPeriodDates[lastPeriodDates.length - 1]) / (1000 * 60 * 60 * 24));
             
             if (daysSinceLastPeriod <= cycleLengthToUse) {
              setCurrentPhase('Menstruation');
            } else if (daysSinceLastPeriod <= cycleLengthToUse + 4) {
              setCurrentPhase('Follicular Phase');
            } else if (daysSinceLastPeriod <= cycleLengthToUse + periodLengthToUse) {
              setCurrentPhase('Ovulation');
            } else {
              setCurrentPhase('Luteal Phase');
            }
          }
        }
      }).catch((error) => {
        console.error("Error getting data:", error);
      });

      const symptomDatesRef = ref(database, `users/${currentUser.uid}/symptoms`);
      get(symptomDatesRef).then((snapshot) => {
        if (snapshot.exists()) {
          const symptomDates = Object.keys(snapshot.val());
          setTrackedSymptomDates(symptomDates);
        }
      }).catch((error) => {
        console.error("Error getting symptom dates:", error);
      });
    }
    
  }, [location, currentUser]);

  // Define tileClassName function
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

  // Function to handle date selection
  const handleDateClick = (value) => {
    if (value <= new Date()) {
      setSelectedDate(value);
      setShowSymptomTracker(true);
    } else {
      alert("Please select a past or current date.");
    }
  };

  // Function to close symptom tracker
  const handleCloseSymptomTracker = () => {
    setShowSymptomTracker(false);
    setSelectedDate(null);
  };

  return (
    <div className='parent-calendar-container'>
      <Card className='calendar'>
        <Card.Title className='title'>Period Calendar</Card.Title>
        <Card.Body>
          <div className="calendar-container">
            <Calendar
              onChange={setDate}
              value={date}
              tileClassName={tileClassName}
              calendarType='US'
              onClickDay={handleDateClick}
            />
          </div>
          <div className="current-phase">
             <p>You're currently in <span className="current-phase-word">{setCurrentPhase}</span>. <Link to="/periodInfo">Learn more about your cycle</Link></p>
          </div>
          <p className="caption">*Select a date to track a symptom</p>
          <h5 className='calendar-key'>Calendar Key:</h5>
          <ul className='calendar-key-list'>
            <li className='calendar-key-last'>Last period</li>
            <li className='calendar-key-next'>Perdicted next period</li>
            <li className='calendar-key-tracked'>Symptoms tracked</li>
          </ul>
        </Card.Body>
      </Card>
      {showSymptomTracker && selectedDate && <SymptomTracker selectedDate={selectedDate} onClose={handleCloseSymptomTracker} />}
      <NavBar /> 
    </div>
  );
};

export default PeriodCalendar;