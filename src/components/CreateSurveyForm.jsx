import React, { useState } from 'react';

const CreateSurveyForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState(''); 
  const [questions, setQuestions] = useState([{ question: '' }]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleUserIdChange = (e) => setUserId(e.target.value); 

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const surveyData = {
        title,
        description,
        user: {
          email: userId  
        },
        questions: questions.map(q => ({
          content: q.question,
          type: 'default'  
        }))
      };
  
      const response = await fetch('http://127.0.0.1:5000/surveys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(surveyData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Survey created successfully:', data);

        setTitle('');
        setDescription('');
        setUserId('');
        setQuestions([{ question: '' }]);
      } else {
        console.error('Failed to create survey');
      }
    } catch (error) {
      console.error('Error creating survey:', error);
    }
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
        <input
          type="text"
          placeholder="User Email"
          value={userId}
          onChange={handleUserIdChange}
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
