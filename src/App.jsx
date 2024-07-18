import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import SurveyList from './components/SurveyList';
import CreateSurveyForm from './components/CreateSurveyForm';
import Login from './components/Login';
import CreateAccountForm from './components/CreateAccountForm';
import CreateAccountForm from './components/CreateAccountForm';
import Login from './components/Login';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <div className="navbar">
          <div>
            <Link to="/">Home</Link>
            <Link to="/aboutus">About Us</Link>
            <Link to="/contactus">Contact Us</Link>
          </div>
          <div>
            <Link to="/surveys">Surveys</Link>
            <Link to="/createsurvey">Create Survey</Link>
            <Link to="/createaccount">Create Account</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/surveys" element={<SurveyList />} />
          <Route path="/createsurvey" element={<CreateSurveyForm />} />
          <Route path="/createaccount" element={<CreateAccountForm />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

