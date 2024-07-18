// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// function SurveyList() {
//   const [surveys, setSurveys] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchSurveys();
//   }, []);

//   const fetchSurveys = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:5000/surveys');
//       const data = await response.json();
//       setSurveys(data);
//     } catch (error) {
//       console.error('Failed to fetch surveys:', error);
//     }
//   };

//   const handleFormSubmit = async (event, surveyId) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const answers = [];

//     for (let [key, value] of formData.entries()) {
//       answers.push({ question_id: key, content: value });
//     }

//     try {
//       const response = await fetch(`http://127.0.0.1:5000/surveys/${surveyId}/answers`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ answers }),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       console.log('Answers submitted successfully');
//     } catch (error) {
//       console.error('Failed to submit answers:', error);
//     }
//   };

//   return (
//     <div className="survey-list">
//       <h2>Survey List</h2>
//       {surveys.map(survey => (
//         <div key={survey.id}>
//           <h3>{survey.title}</h3>
//           <p>{survey.description}</p>
//           <form onSubmit={(event) => handleFormSubmit(event, survey.id)}>
//             {survey.questions && survey.questions.map((question) => (
//               <div key={question.id}>
//                 <label htmlFor={`answer-${question.id}`}>{question.content}</label>
//                 <input type="text" id={`answer-${question.id}`} name={question.id} required />
//               </div>
//             ))}
//             <button type="submit">Submit Answers</button>
//           </form>
//           <hr />
//         </div>
//       ))}
//     </div>
//   );
// }

// export default SurveyList;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SurveyList() {
  const [surveys, setSurveys] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/surveys');
      const data = await response.json();
      setSurveys(data);
    } catch (error) {
      console.error('Failed to fetch surveys:', error);
    }
  };

  const handleFormSubmit = async (event, surveyId) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const answers = [];

    for (let [key, value] of formData.entries()) {
      answers.push({ question_id: key, content: value });
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/surveys/${surveyId}/answers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Answers submitted successfully');
    } catch (error) {
      console.error('Failed to submit answers:', error);
    }
  };

  const handleDeleteSurvey = async (surveyId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/surveys/${surveyId}`, {
        method: 'DELETE',
      });

      if (response.status === 204) {
        // Survey deleted successfully
        fetchSurveys(); // Refresh the survey list
      } else {
        throw new Error('Failed to delete survey');
      }
    } catch (error) {
      console.error('Failed to delete survey:', error);
    }
  };

  return (
    <div className="survey-list">
      <h2>Survey List</h2>
      {surveys.map(survey => (
        <div key={survey.id}>
          <h3>{survey.title}</h3>
          <p>{survey.description}</p>
          <form onSubmit={(event) => handleFormSubmit(event, survey.id)}>
            {survey.questions && survey.questions.map((question) => (
              <div key={question.id}>
                <label htmlFor={`answer-${question.id}`}>{question.content}</label>
                <input type="text" id={`answer-${question.id}`} name={question.id} required />
              </div>
            ))}
            <button type="submit">Submit Answers</button>
          </form>
          <button onClick={() => handleDeleteSurvey(survey.id)}>Delete Survey</button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default SurveyList;
