import axios from 'axios';
import React, { useState } from 'react';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const summarizeText = async () => {
    if (!inputText.trim()) {
      setErrorMessage('Please enter text to summarize.');
      return;
    }

    setLoading(true); // Start loading
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/summarize`,
        { text: inputText }
      );
      setSummary(response.data.summary);
      setErrorMessage('');
    } catch (error) {
      console.error('Error calling backend API:', error);
      setErrorMessage('Failed to summarize text. Please try again later.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Text Summarizer</h1>
      <textarea
        rows="10"
        cols="50"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        style={{ padding: '10px', fontSize: '16px' }}
      ></textarea>
      <br />
      <button
        onClick={summarizeText}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          marginTop: '10px',
          cursor: 'pointer',
        }}
        disabled={loading}
      >
        Summarize
      </button>
      {loading && <p>Loading...</p>}
      <h2>Summary:</h2>
      <p>{summary}</p>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default App;
