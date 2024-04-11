import React, { useState, useEffect } from 'react';
import { Form, Button, Card, CardBody } from 'react-bootstrap';
import './DiaryEntry.css';

const DiaryEntry = () => {
  const [entry, setEntry] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [submittedEntries, setSubmittedEntries] = useState([]);

  useEffect(() => {
    // to get current date for entry
    const currentDate = new Date().toLocaleDateString();
    setDate(currentDate); 
  }, []);

  const handleEntryChange = (event) => {
    setEntry(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmittedEntries([...submittedEntries, { date, entry }]);
    console.log('Diary entry submitted:', entry);
    setEntry(''); // clear for the next entry
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
                value={entry}
                onChange={handleEntryChange}
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
            <p className='submitted-entry'>{submittedEntry.entry}</p>
          </CardBody>
        </Card>
      ))}
      <h1 id="hidden">.</h1>
      <h1 id="hidden">.</h1>
    </div>
  );
};

export default DiaryEntry;