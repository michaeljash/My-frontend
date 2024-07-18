import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateSurveyForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([{ content: '' }]);
  const navigate = useNavigate();

  const handleAddQuestion = () => {
    setQuestions([...questions, { content: '' }]);
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (index, event) => {
    const newQuestions = questions.map((q, i) => (
      i === index ? { content: event.target.value } : q
    ));
    setQuestions(newQuestions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://127.0.0.1:5000/surveys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, questions })
    });
    if (response.ok) {
      navigate('/surveylist');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Survey</h2>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </label>
      {questions.map((question, index) => (
        <div key={index}>
          <label>
            Question {index + 1}:
            <input type="text" value={question.content} onChange={(e) => handleQuestionChange(index, e)} required />
          </label>
          <button type="button" onClick={() => handleRemoveQuestion(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={handleAddQuestion}>Add Question</button>
      <button type="submit">Create Survey</button>
    </form>
  );
}

export default CreateSurveyForm;