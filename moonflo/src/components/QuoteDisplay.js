import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './QuoteDisplay.css';
import { Card, CardBody } from 'react-bootstrap';

const QuoteDisplay = ({ apiUrl, className }) => {
  const [quote, setQuote] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch quote');
        }
        const data = await response.json();
        setQuote(data[Math.floor(Math.random() * data.length)]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quote:', error);
        setError('Unable to load quote.');
        setLoading(false);
      }
    };

    fetchQuote();
  }, [apiUrl]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={className}>
      <Card className="diary-entry-card">
       <CardBody> 
       <h4 className='quote-caption'>Quote of the Day</h4>
      {quote.text && (
        <div className="card text-center">
          <div className="quote-card-body">
            <p className="card-text">{quote.text}</p>
            {quote.author && <p className="card-text text-muted"> - {quote.author}</p>}
          </div>
        </div>
      )}
      </CardBody>
      </Card>
    </div>
  );
};

export default QuoteDisplay;

