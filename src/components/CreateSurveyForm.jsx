import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateSurveyForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState(['']);
  const navigate = useNavigate();


  const handleAddQuestion = () => {
    setQuestions([...questions, '']);
  };

  const handleRemoveQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;

  const navigate = useNavigate();

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].question = event.target.value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '' }]);
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);

    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const response = await fetch('http://127.0.0.1:5000/surveys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, questions })
    });

    if (response.ok) {
      navigate('/surveys');
    }

    const surveyData = { title, description, questions };
    console.log(surveyData);

    // Simulate submission success message
    alert('Survey created successfully!');

    // Clear form fields
    setTitle('');
    setDescription('');
    setQuestions([{ question: '' }]);

  };

  return (
    <div>
      <h2>Create Survey</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <br />
        <h3>Questions</h3>
        {questions.map((question, index) => (
          <div key={index}>
            <input
              type="text"
              value={question}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
              required
            />
            <button type="button" onClick={() => handleRemoveQuestion(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={handleAddQuestion}>Add Question</button>
        <br />
        <button type="submit">Create Survey</button>
      </form>
    </div>
  );
}};


export default CreateSurveyForm;
