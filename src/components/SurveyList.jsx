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

  return (
    <div className="survey-list">
      <h2>Survey List</h2>
      <ul>
        {surveys.map(survey => (
          <li key={survey.id}>
            <strong>{survey.title}</strong> - {survey.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SurveyList;
