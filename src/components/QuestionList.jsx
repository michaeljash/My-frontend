import React, { useState, useEffect } from 'react';

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = () => {
    fetch('http://127.0.0.1:5000/questions')
      .then(response => response.json())
      .then(data => {
        setQuestions(data);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
  };

  return (
    <div>
      <h2>Question List</h2>
      <ul>
        {questions.map(question => (
          <li key={question.id}>
            <strong>{question.content}</strong> - Type: {question.type}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionList;

