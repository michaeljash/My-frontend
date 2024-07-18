// mockData.js

export const surveys = [
    {
      id: 1,
      title: "Customer Satisfaction Survey",
      description: "Help us improve our services by providing your valuable feedback.",
      questions: [
        { id: 1, content: "How satisfied are you with our product?" },
        { id: 2, content: "Would you recommend our service to others?" },
      ],
    },
    {
      id: 2,
      title: "Employee Feedback Survey",
      description: "Tell us how we can make our workplace better for you.",
      questions: [
        { id: 3, content: "Are you satisfied with the work environment?" },
        { id: 4, content: "Do you have any suggestions for improvement?" },
      ],
    },
  ];
  
  export const addSurvey = (survey) => {
    survey.id = surveys.length + 1;
    surveys.push(survey);
  };
  
  export const addQuestionToSurvey = (surveyId, question) => {
    const survey = surveys.find((s) => s.id === surveyId);
    if (survey) {
      question.id = survey.questions.length + 1;
      survey.questions.push(question);
    }
  };
  