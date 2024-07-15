import React, { useState } from 'react';

const CreateSurveyForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([{ question: '' }]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].question = event.target.value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => setQuestions([...questions, { question: '' }]);

  const handleRemoveQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const surveyData = { title, description, questions };
    // Send surveyData to the backend
    console.log(surveyData);
    // Reset form
    setTitle('');
    setDescription('');
    setQuestions([{ question: '' }]);
  };

  return (
    <div className="container">
      <h2>Create Survey</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={handleDescriptionChange}
          required
        />
        {questions.map((q, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={`Question ${index + 1}`}
              value={q.question}
              onChange={(e) => handleQuestionChange(index, e)}
              required
            />
            <button type="button" onClick={() => handleRemoveQuestion(index)}>
              Remove Question
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddQuestion}>
          Add Question
        </button>
        <button type="submit">Create Survey</button>
      </form>
    </div>
  );
};

export default CreateSurveyForm;
