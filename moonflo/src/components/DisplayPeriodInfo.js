import React, { useState, useEffect } from 'react';
import { ref, get, update } from 'firebase/database';
import { database, auth } from '../FirebaseConfig.js';
import './DisplayPeriodInfo.css';
import { Button } from 'react-bootstrap';

const DisplayPeriodInfo = ({ isEdit }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Flag for loading state
  const [editedValues, setEditedValues] = useState({
    age: '',
    cycleLength: '',
    periodLength: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (auth.currentUser) {
          const userRef = ref(database, `users/${auth.currentUser.uid}`);
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setUserInfo(userData);
            setEditedValues(userData);
          } else {
            console.log('No user data found');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchUserData();
  }, [auth.currentUser]);
  
  

  const handleChange = (event) => {
    setEditedValues({
      ...editedValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = () => {
    const updates = {
      age: editedValues.age,
      cycleLength: editedValues.cycleLength,
      periodLength: editedValues.periodLength,
    };

    const userRef = ref(database, `users/${auth.currentUser.uid}`);
    update(userRef, updates)
      .then(() => {
        console.log('Period information saved successfully!');
        setUserInfo(editedValues); // Update displayed data with edited values
      })
      .catch((error) => {
        console.error('Error saving period information:', error);
      });
  };

  return (
    <div className="period-info">
      {
        userInfo && (
          <>
            {isEdit ? (
              <>
                <p>
                  <label htmlFor="age">Age:</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={editedValues.age}
                    onChange={handleChange}
                  />
                </p>
                <p>
                  <label htmlFor="cycleLength">Cycle Length:</label>
                  <input
                    type="number"
                    id="cycleLength"
                    name="cycleLength"
                    value={editedValues.cycleLength}
                    onChange={handleChange}
                  />
                </p>
                <p>
                  <label htmlFor="periodLength">Period Length:</label>
                  <input
                    type="number"
                    id="periodLength"
                    name="periodLength"
                    value={editedValues.periodLength}
                    onChange={handleChange}
                  />
                </p>
                <div className="period-info-save">
                <Button className="period-info-save-btn" onClick={handleSave}>Save</Button>
                </div>
              </>
            ) : (
              <>
                <p>Age: {userInfo.age}</p>
                <p>Cycle Length: {userInfo.cycleLength}</p>
                <p>Period Length: {userInfo.periodLength}</p>
              </>
            )}
          </>
        )
      }
    </div>
  );
};

export default DisplayPeriodInfo;
