import React, { useState, useEffect } from 'react';
import { Form, Button, Card, CardBody } from 'react-bootstrap';
import './DiaryEntry.css';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { ref, set, get } from 'firebase/database'; // Firebase modules
import { database, auth } from '../FirebaseConfig'; // Import FirebaseConfig

const DiaryEntry = () => {
  const [mainEntry, setMainEntry] = useState('');
  const [editEntry, setEditEntry] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [submittedEntries, setSubmittedEntries] = useState([]);
  const [editState, setEditState] = useState({}); // Track edit state for entries

  useEffect(() => {
    // Get current date for entry
    const currentDate = new Date().toLocaleDateString();
    setDate(currentDate);

    // Retrieve saved entries from Firebase
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userRef = ref(database, `users/${currentUser.uid}/diaryEntries`);
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const retrievedEntries = Object.values(snapshot.val());
            setSubmittedEntries(retrievedEntries); // Update state with retrieved entries
          }
        })
        .catch((error) => {
          console.error('Error fetching entries:', error);
        });
    }
  }, []);

  const handleMainEntryChange = (event) => {
    setMainEntry(event.target.value);
  };

  const handleEditEntryChange = (event) => {
    setEditEntry(event.target.value);
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
    event.preventDefault(); // Prevent default behavior of the anchor element
    const currentEntry = submittedEntries[index].entry;
    setEditEntry(currentEntry); // Set edit entry state with existing content
    setEditState({ ...editState, [index]: true }); // Set edit mode for the entry
  };
  

  const handleUpdateEntry = (index) => {
    const newEntries = [...submittedEntries];
    newEntries[index].entry = editEntry;
    setSubmittedEntries(newEntries);
    setEditState({ ...editState, [index]: false }); // Exit edit mode

    // Update entries in Firebase
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userRef = ref(database, `users/${currentUser.uid}/diaryEntries`);
      set(userRef, newEntries);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const currentUser = auth.currentUser;
    if (currentUser) {
      const newEntry = {
        date: date,
        entry: mainEntry,
      };
      const updatedEntries = [...submittedEntries, newEntry];
      setSubmittedEntries(updatedEntries);

      // Update entries in Firebase
      const userRef = ref(database, `users/${currentUser.uid}/diaryEntries`);
      set(userRef, updatedEntries);
      console.log('Diary entry submitted:', mainEntry);
    } else {
      console.error('User not authenticated. Please sign in to save entries.');
    }
    setMainEntry(''); // Clear for the next entry
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
      {submittedEntries.map((submittedEntry, index) => (
        <Card key={index} className='submitted-entry-card'>
          <CardBody>
            <h4>{submittedEntry.date}</h4>
            {editState[index] ? ( // Check if entry is in edit mode
              <Form onSubmit={() => handleUpdateEntry(index)}>
                <Form.Group controlId={`editEntryTextarea-${index}`}>
                  <Form.Control
                    as="textarea"
                    value={editEntry} // Pre-fill with existing entry
                    onChange={handleEditEntryChange}
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
              <p className='submitted-entry'>{submittedEntry.entry}</p>
            )}
            <a href="#" className="diary-trash-button" onClick={() => handleDeleteEntry(index)}>
              <BsTrash size={20} />
            </a>
            <a href="#" className="diary-edit-button" onClick={(event) => handleEditClick(event, index)}>
              <BsPencil size={18} />
            </a>

          </CardBody>
        </Card>
      ))}
      <h1 id='hidden'>.</h1>
      <h1 id='hidden'>.</h1>
    </div>
  );
};

export default DiaryEntry;
