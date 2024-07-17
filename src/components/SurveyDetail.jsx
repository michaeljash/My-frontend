import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SurveyDetail = () => {
  const { surveyId } = useParams();
  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchSurveyDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/surveys/${surveyId}`);
        if (response.ok) {
          const data = await response.json();
          setSurvey(data);
          initializeAnswers(data.questions);
        } else {
          console.error('Failed to fetch survey details:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching survey details:', error);
      }
    };

    if (surveyId) {
      fetchSurveyDetails();
    }
  }, [surveyId]);

  const initializeAnswers = (questions) => {
    const initialAnswers = {};
    questions.forEach((question) => {
      initialAnswers[question.id] = ''; // Initialize answers with empty strings
    });
    setAnswers(initialAnswers);
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      const response = await fetch(`http://localhost:5000/surveys/${surveyId}/submit-answers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers),
      });
      if (response.ok) {
        console.log('Answers submitted successfully');
        // Optionally, redirect or show success message
      } else {
        console.error('Failed to submit answers:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting answers:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!survey) {
    return <div>Loading survey details...</div>;
  }

  return (
    <div>
      <h2>{survey.title}</h2>
      <p>{survey.description}</p>
      <form onSubmit={handleSubmit}>
        {survey.questions.map((question) => (
          <div key={question.id}>
            <label>{question.text}</label>
            <input
              type="text"
              value={answers[question.id]}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              required
            />
          </div>
        ))}
        <button type="submit" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Answers'}
        </button>
      </form>
    </div>
  );
};

export default SurveyDetail;
