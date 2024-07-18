import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SurveyDetail = () => {
  const { id } = useParams();
  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchSurvey();
  }, []);

  const fetchSurvey = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/surveys/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSurvey(data);
      initializeAnswers(data.questions);
    } catch (error) {
      console.error('Failed to fetch survey:', error);
    }
  };

  const initializeAnswers = (questions) => {
    const initialAnswers = {};
    questions.forEach(question => {
      initialAnswers[question.id] = '';
    });
    setAnswers(initialAnswers);
  };

  const handleAnswerChange = (event, questionId) => {
    const updatedAnswers = { ...answers };
    updatedAnswers[questionId] = event.target.value;
    setAnswers(updatedAnswers);
  };

  const handleSubmitAnswers = async (e) => {
    e.preventDefault();

    const answersData = Object.keys(answers).map(key => ({
      question_id: key,
      content: answers[key]
    }));

    try {
      const response = await fetch(`http://127.0.0.1:5000/surveys/${id}/answers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: answersData }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Answers submitted successfully');
      setSubmitted(true);
    } catch (error) {
      console.error('Failed to submit answers:', error);
    }
  };

  if (!survey) {
    return <p>Loading...</p>;
  }

  return (
    <div className="survey-detail">
      <h2>{survey.title}</h2>
      <p>{survey.description}</p>
      <form onSubmit={handleSubmitAnswers}>
        {survey.questions && survey.questions.map((question) => (
          <div key={question.id}>
            <label htmlFor={`answer-${question.id}`}>{question.content}</label>
            <input
              type="text"
              id={`answer-${question.id}`}
              value={answers[question.id]}
              onChange={(e) => handleAnswerChange(e, question.id)}
              required
            />
          </div>
        ))}
        {!submitted && <button type="submit">Submit Answers</button>}
        {submitted && <p>Answers submitted successfully!</p>}
      </form>
    </div>
  );
};

export default SurveyDetail;
