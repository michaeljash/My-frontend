import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await fetch('http://localhost:5000/surveys');
        if (response.ok) {
          const data = await response.json();
          setSurveys(data);
        } else {
          console.error('Failed to fetch surveys:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching surveys:', error);
      }
    };

    fetchSurveys();
  }, []);

  const handleSurveyClick = (surveyId) => {
    navigate(`/surveys/${surveyId}`);
  };

  return (
    <div>
      <h2>Survey List</h2>
      {surveys.map((survey) => (
        <div key={survey.id} onClick={() => handleSurveyClick(survey.id)} style={{ cursor: 'pointer' }}>
          <h3>{survey.title}</h3>
          <p>{survey.description}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default SurveyList;
