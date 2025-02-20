import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };
    console.log(userData)
    try {
      // Replace with actual login API endpoint
      const response = await fetch('http://127.0.0.1:5000/login', {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          userData
        )
      })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('loggedIn', 'true');
        navigate('/surveys');
      })
      .catch(error => console.error('Error:', error));


      // Temporary mock login
      // const response = { ok: true }; // Replace with actual response handling
      if (response.ok) {
        // Replace with actual redirection logic after successful login
        // Redirect to surveys page after login
      } else {
        console.error('Failed to login:', response.statusText);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text" value={email} autoComplete='email' onChange={(e) => setEmail(e.target.value)} required />
        <label>Password:</label>
        <input type="password" value={password} autoComplete='password' onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default Login;