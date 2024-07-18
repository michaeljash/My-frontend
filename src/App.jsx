import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import SurveyList from './components/SurveyList';
import CreateSurveyForm from './components/CreateSurveyForm';
import Login from './components/Login';
import CreateAccountForm from './components/CreateAccountForm';
import './App.css';

const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);

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
            {loggedIn ? (
              <Link to="/" onClick={() => setLoggedIn(false)}>Logout</Link>
            ) : (
              <>
                <Link to="/createaccount">Create Account</Link>
                <Link to="/login">Login</Link>
              </>
            )}
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/surveys" element={<SurveyList />} />
          <Route path="/createsurvey" element={<CreateSurveyForm />} />
          <Route path="/createaccount" element={<CreateAccountForm setLoggedIn={setLoggedIn} />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;