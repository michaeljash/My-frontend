import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/surveys');
        if (!response.ok) {
          throw new Error('Failed to fetch surveys');
        }
        const data = await response.json();
        setSurveys(data);
      } catch (error) {
        console.error('Failed to fetch surveys:', error);
      }
    };

    fetchSurveys();
  }, []);

  const handleAnswerChange = (surveyId, questionIndex, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [surveyId]: {
        ...prevAnswers[surveyId],
        [questionIndex]: value,
      },
    }));
  };

  const handleSubmit = async (e, surveyId) => {
    e.preventDefault();
    const response = await fetch(`http://127.0.0.1:5000/surveys/${surveyId}/answers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers: answers[surveyId] }),
    });

    if (response.ok) {
      alert('Answers submitted successfully!');
      navigate('/surveys');
    } else {
      console.error('Failed to submit answers');
    }

  
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

  const handleSurveyClick = (surveyId) => {
    navigate(`/surveys/${surveyId}`);
  };

  return (
    <div>
      <h2>Survey List</h2>
      {surveys.map(survey => (
        <div key={survey.id}>
          <h3>{survey.title}</h3>
          <p>{survey.description}</p>
          <form onSubmit={(e) => handleSubmit(e, survey.id)}>
            {survey.questions.map((question, index) => (
              <div key={index}>
                <label>{question}</label>
                <input
                  type="text"
                  value={answers[survey.id]?.[index] || ''}
                  onChange={(e) => handleAnswerChange(survey.id, index, e.target.value)}
                  required
                />
              </div>
            ))}
            <button type="submit">Submit Answers</button>
          </form>
          <div onClick={() => handleSurveyClick(survey.id)} style={{ cursor: 'pointer' }}>
            <h3>{survey.title}</h3>
            <p>{survey.description}</p>
            <hr />
          </div>
        </div>
      ))}
    </div>
  );
  export default SurveyList;
