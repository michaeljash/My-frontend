import React, { useState, useEffect } from 'react';

function SurveyList() {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    fetchSurveys();
  }, []);

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

  const handleFormSubmit = (event, questionId) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const answer = formData.get('answer');
    
    console.log(`Question ID: ${questionId}, Answer: ${answer}`);
    
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
