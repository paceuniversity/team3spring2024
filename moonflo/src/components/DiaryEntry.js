import React, { useState, useEffect } from 'react';
import { Form, Button, Card, CardBody } from 'react-bootstrap';
import './DiaryEntry.css';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { ref, set, get } from 'firebase/database';
import { database, auth, storage } from '../FirebaseConfig';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const DiaryEntry = () => {
  const [mainEntry, setMainEntry] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [submittedEntries, setSubmittedEntries] = useState([]);
  const [editState, setEditState] = useState({});
  const [image, setImage] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [editedEntry, setEditedEntry] = useState('');
  const [editedImage, setEditedImage] = useState(null);

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
  }, [refresh]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!editState.hasOwnProperty('index')) {
      setImage(file);
    } else {
      setEditedImage(file);
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

    const currentUser = auth.currentUser;
    if (currentUser) {
      const userRef = ref(database, `users/${currentUser.uid}/diaryEntries`);
      set(userRef, newEntries);
    }
  };

  const handleEditClick = (event, index) => {
    event.preventDefault();
    const currentEntry = submittedEntries[index];
    setEditedEntry(currentEntry.entry);
    setEditedImage(null); // Reset any previously edited image
    setEditState({ index, image: currentEntry.imageId });
  };

  const handleUpdateEntry = async (index) => {
    const newEntries = [...submittedEntries];
    newEntries[index].entry = editedEntry;

    if (editedImage) {
      const imageName = `${Date.now()}-${editedImage.name}`;
      const imageRef = storageRef(storage, `images/${imageName}`);
      await uploadBytes(imageRef, editedImage);
      const imageUrl = await getDownloadURL(imageRef);
      newEntries[index].imageUrl = imageUrl;
      newEntries[index].imageId = imageName;
    }

    setSubmittedEntries(newEntries);
    setEditState({});
    setEditedImage(null);

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
      let imageUrl = '';
      if (image) {
        const imageName = `${Date.now()}-${image.name}`;
        const imageRef = storageRef(storage, `images/${imageName}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
        imageId = imageName;
      }
      const newEntry = {
        date,
        entry: mainEntry,
        imageId,
        imageUrl
      };
      const updatedEntries = [...submittedEntries, newEntry];
      setSubmittedEntries(updatedEntries);
      setRefresh(!refresh);

      const userRef = ref(database, `users/${currentUser.uid}/diaryEntries`);
      set(userRef, updatedEntries);
    } else {
      console.error('User not authenticated. Please sign in to save entries.');
    }
    setMainEntry('');
    setImage(null);

    const fileInput = document.getElementById('diaryEntryImageUpload');
    if (fileInput) {
      fileInput.value = null;
    }
  };

  return (
    <div>
      <Card className="diary-entry-card">
        <CardBody>
          <h4 className='diary-title'>Tell me about your day!</h4>
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
                <Form.Group controlId={`editEntryImageUpload-${index}`}>
                  <Form.Control
                    type="file"
                    onChange={handleImageChange}
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
                  <img className='submitted-entry-pic' src={submittedEntry.imageUrl} alt="Diary Entry photo" />
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
      <div style={{ padding: '100px 0', textAlign: 'center' }}>
        Temporary space - Scroll down to see more
      </div>
    </div>
  );
};

export default DiaryEntry;
