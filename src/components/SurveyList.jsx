import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SurveyList({ loggedIn }) {
  const [surveys, setSurveys] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate('/login');
    } else {
      fetchSurveys();
    }
  }, [loggedIn, navigate]);

  const fetchSurveys = () => {
    fetch('http://127.0.0.1:5000/surveys')
      .then(response => response.json())
      .then(data => {
        setSurveys(data);
      })
      .catch(error => {
        console.error('Error fetching surveys:', error);
      });
  };

  const handleFormSubmit = (event, surveyId) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const answer = formData.get('answer');

    // Send the answer to the backend
    fetch(`http://127.0.0.1:5000/surveys/${surveyId}/answers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer }),
    })
    .then(response => {
      if (response.ok) {
        console.log('Answer submitted successfully');
      } else {
        console.error('Failed to submit answer');
      }
    })
    .catch(error => {
      console.error('Error submitting answer:', error);
    });
  };

  return (
    <div className="survey-list">
      <h2>Survey List</h2>
      {surveys.map(survey => (
        <div key={survey.id}>
          <h3>{survey.title}</h3>
          <p>{survey.description}</p>
          <form onSubmit={(event) => handleFormSubmit(event, survey.id)}>
            <label htmlFor={`answer-${survey.id}`}>Your Answer:</label>
            <input type="text" id={`answer-${survey.id}`} name="answer" required />
            <button type="submit">Submit</button>
          </form>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default SurveyList;
