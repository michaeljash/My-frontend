// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const CreateSurveyForm = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [questions, setQuestions] = useState([{ content: '' }]);
//   const navigate = useNavigate();

//   const handleTitleChange = (e) => setTitle(e.target.value);
//   const handleDescriptionChange = (e) => setDescription(e.target.value);

//   const handleQuestionChange = (index, event) => {
//     const newQuestions = [...questions];
//     newQuestions[index].content = event.target.value;
//     setQuestions(newQuestions);
//   };

//   const handleAddQuestion = () => setQuestions([...questions, { content: '' }]);
//   const handleRemoveQuestion = (index) => {
//     const newQuestions = questions.filter((_, i) => i !== index);
//     setQuestions(newQuestions);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const surveyData = { title, description, questions };

//     try {
//       const response = await fetch('http://127.0.0.1:5000/surveys', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(surveyData),
//       })
//       .then(res=> res.json())
//       .then(data=> {
//         //await response.json();
//         navigate('/surveys');
//       })
//       //if (!response.ok) {
//        // throw new Error('Network response was not ok');
//       //}
      
//     } catch (error) {
//       console.error('Failed to create survey:', error);
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Create Survey</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={handleTitleChange}
//           required
//         />
//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={handleDescriptionChange}
//           required
//         />
//         {questions.map((q, index) => (
//           <div key={index}>
//             <input
//               type="text"
//               placeholder={`Question ${index + 1}`}
//               value={q.content}
//               onChange={(e) => handleQuestionChange(index, e)}
//               required
//             />
//             <button type="button" onClick={() => handleRemoveQuestion(index)}>
//               Remove Question
//             </button>
//           </div>
//         ))}
//         <button type="button" onClick={handleAddQuestion}>
//           Add Question
//         </button>
//         <button type="submit">Create Survey</button>
//       </form>
//     </div>
//   );
// };

// export default CreateSurveyForm;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateSurveyForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([{ content: '' }]);
  const navigate = useNavigate();

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].content = event.target.value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => setQuestions([...questions, { content: '' }]);
  const handleRemoveQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const surveyData = {
      title,
      description,
      user: { email: 'test@example.com', username: 'testuser', password: 'testpassword' }, // Adjust user data as needed
      questions,
    };

    try {
      const response = await fetch('http://localhost:5000/surveys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(surveyData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Survey created successfully:', data);
      navigate('/surveys');

    } catch (error) {
      console.error('Failed to create survey:', error);
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
        {questions.map((q, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={`Question ${index + 1}`}
              value={q.content}
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
