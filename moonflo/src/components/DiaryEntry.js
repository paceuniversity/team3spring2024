import React, { useState, useEffect } from 'react';
import { Form, Button, Card, CardBody } from 'react-bootstrap';
import './DiaryEntry.css';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { ref, set, get } from 'firebase/database'; // Firebase modules
import { database, auth } from '../FirebaseConfig'; // Import FirebaseConfig
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const DiaryEntry = () => {
  const [mainEntry, setMainEntry] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [selectedDate, setSelectedDate] = useState(null);
  const [submittedEntries, setSubmittedEntries] = useState([]);
  const [editState, setEditState] = useState({});
  const [refresh, setRefresh] = useState(false); // State to force re-render
  const [editedEntry, setEditedEntry] = useState(''); // Track the entry being edited

  useEffect(() => {
    const fetchEntries = async () => {
      const currentDate = new Date().toLocaleDateString();
      setDate(currentDate);
      const currentUser = auth.currentUser;

      if (currentUser) {
        const userRef = ref(database, `users/${currentUser.uid}/diaryEntries`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const entries = Object.values(snapshot.val());
          setSubmittedEntries(entries);
        }
      }
    };
    fetchEntries();
  }, [refresh]); // Trigger useEffect when refresh state changes

  const handleMainEntryChange = (event) => {
    if (!editState.hasOwnProperty('index')) {
      setMainEntry(event.target.value);
    } else {
      setEditedEntry(event.target.value);
    }
  };

  const handleDateClick = (date) => {
    const formattedDate = date.toLocaleDateString();
    setSelectedDate(selectedDate === formattedDate ? null : formattedDate);
  };


  const handleDeleteEntry = (index) => {
    const newEntries = [...submittedEntries];
    newEntries.splice(index, 1);
    setSubmittedEntries(newEntries);

    // Update entries in Firebase
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userRef = ref(database, `users/${currentUser.uid}/diaryEntries`);
      set(userRef, newEntries);
    }
  };

  const handleEditClick = (event, index) => {
    event.preventDefault();
    const currentEntry = submittedEntries[index].entry;
    setEditedEntry(currentEntry);
    setEditState({ index });
  };

  const handleUpdateEntry = async (index) => {
    const newEntries = [...submittedEntries];
    newEntries[index].entry = editedEntry;
    setSubmittedEntries(newEntries);
    setEditState({}); // Reset edit state

    // Update entries in Firebase
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userRef = ref(database, `users/${currentUser.uid}/diaryEntries`);
      set(userRef, newEntries);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const currentUser = auth.currentUser;
    if (currentUser) {
      const newEntry = {
        date: date,
        entry: mainEntry
      };
      const updatedEntries = [...submittedEntries, newEntry];
      setSubmittedEntries(updatedEntries);
      setRefresh(!refresh); // Trigger re-render
      // Update entries in Firebase
      const userRef = ref(database, `users/${currentUser.uid}/diaryEntries`);
      set(userRef, updatedEntries);
      console.log('Diary entry submitted:', mainEntry);
    } else {
      console.error('User not authenticated. Please sign in to save entries.');
    }
    setMainEntry('');
  };
  
  return (
    <div>
      <Card className="diary-entry-card">
        <CardBody>
          <div>
            <h4 className='diary-title'>Tell me about your day!</h4>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="diaryEntryTextarea">
              <Form.Control
                as="textarea"
                value={mainEntry}
                onChange={handleMainEntryChange}
                placeholder="Type here"
                rows={10}
                className="left-aligned"
              />
            </Form.Group>
            <div className='diary-submit'>
              <Button type="submit">Save</Button>
            </div>
          </Form>
        </CardBody>
      </Card>
      <Card className="diary-calendar">
        <CardBody>
          <h4 className='diary-title'>Diary Calendar</h4>
          <Calendar 
            onClickDay={handleDateClick}
            value={selectedDate ? new Date(selectedDate) : null}
            calendarType="US"
            tileClassName={({ date }) => {
              const formattedDate = date.toLocaleDateString();
              return submittedEntries.some(entry => entry.date === formattedDate) ? 'has-entry' : '';
            }}
          />

      </CardBody>
      </Card>
      {submittedEntries.map((submittedEntry, index) => (
        selectedDate === submittedEntry.date && (
        <Card key={index} className='submitted-entry-card'>
          <CardBody>
            <h4>{submittedEntry.date}</h4>
            {editState.hasOwnProperty('index') && editState.index === index ? (
              <Form onSubmit={() => handleUpdateEntry(index)}>
                <Form.Group controlId={`editEntryTextarea-${index}`}>
                  <Form.Control
                    as="textarea"
                    value={editedEntry}
                    onChange={handleMainEntryChange}
                    placeholder="Edit your entry"
                    rows={10}
                    className="left-aligned"
                  />
                </Form.Group>
                <div className='diary-submit'>
                  <Button type="submit">Save Edit</Button>
                </div>
              </Form>
            ) : (
              <div>
                <p className='submitted-entry'>{submittedEntry.entry}</p>
                <br/>
                <a href="#" className="diary-trash-button" onClick={() => handleDeleteEntry(index)}>
                  <BsTrash size={20} />
                </a>
                <a href="#" className="diary-edit-button" onClick={(event) => handleEditClick(event, index)}>
                  <BsPencil size={18} />
                </a>
              </div>
            )}
          </CardBody>
        </Card>
        )
      ))}
      <h1 id='hidden'>.</h1>
      <h1 id='hidden'>..</h1>
    </div>
  );
};

export default DiaryEntry;
