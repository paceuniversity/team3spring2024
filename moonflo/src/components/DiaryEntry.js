import React, { useState, useEffect } from 'react';
import { Form, Button, Card, CardBody } from 'react-bootstrap';
import './DiaryEntry.css';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { ref, set, get } from 'firebase/database'; // Firebase modules
import { database, auth, storage } from '../FirebaseConfig'; // Import FirebaseConfig
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const DiaryEntry = () => {
  const [mainEntry, setMainEntry] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [submittedEntries, setSubmittedEntries] = useState([]);
  const [editState, setEditState] = useState({});
  const [image, setImage] = useState(null);
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
          const entriesWithImages = await Promise.all(entries.map(async entry => {
            if (entry.imageId) {
              const url = await getDownloadURL(storageRef(storage, `images/${entry.imageId}`));
              return { ...entry, imageUrl: url };
            }
            return entry;
          }));
          setSubmittedEntries(entriesWithImages);
        }
      }
    };
    fetchEntries();
  }, [refresh]); // Trigger useEffect when refresh state changes

  const handleImageChange = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleMainEntryChange = (event) => {
    if (!editState.hasOwnProperty('index')) {
      setMainEntry(event.target.value);
    } else {
      setEditedEntry(event.target.value);
    }
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
      let imageId = '';
      if (image) {
        const imageName = `${Date.now()}-${image.name}`;
        const imageRef = storageRef(storage, `images/${imageName}`);
        await uploadBytes(imageRef, image);
        const imageUrl = await getDownloadURL(imageRef);
        imageId = imageName; 
      }
      const newEntry = {
        date: date,
        entry: mainEntry,
        imageId
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
    setImage(null);
    // Clear file input field
    const fileInput = document.getElementById('diaryEntryImageUpload');
    if (fileInput) {
      fileInput.value = null;
    }
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
            <Form.Group controlId="diaryEntryImageUpload">
              <Form.Control
                type="file"
                onChange={handleImageChange}
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
                {submittedEntry.imageUrl && (
              <img src={submittedEntry.imageUrl} alt="Diary Entry photo" />
            )}
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
      ))}
      <h1 id='hidden'>.</h1>
      <h1 id='hidden'>.</h1>
    </div>
  );
};

export default DiaryEntry;
